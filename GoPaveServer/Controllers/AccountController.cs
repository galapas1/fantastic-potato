using GoPaveServer.Data;
using GoPaveServer.Interfaces;
using GoPaveServer.Models;
using GoPaveServer.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using System;
using Microsoft.Extensions.Primitives;

namespace GoPaveServer.Controllers
{
    public class AccountController : BaseController
    {
        private String baseUrl = "https://www.pavementdesigner.org";

        private readonly IEmailSender emailSender;
        private readonly ISmsSender   smsSender;

        private SecurityOptions securityOptions;

        private readonly ISecureTokenService secureTokenService;

        public AccountController(UserContext               userContext,
                                 IEmailSender              emailSender,
                                 ISmsSender                smsSender,
                                 ILoggerFactory            loggerFactory,
                                 IOptions<SecurityOptions> securityOptions,
                                 ISecureTokenService       secureTokenService) : base(userContext,
                                                                                      loggerFactory)
        {
            this.emailSender        = emailSender;
            this.smsSender          = smsSender;
            this.securityOptions    = securityOptions.Value;
            this.secureTokenService = secureTokenService;
        }

        [HttpPost]
        [EnableCors("CorsPolicy")]
        [Route("/api/Login")]
        [AllowAnonymous]
        public object Login([FromBody]Login model)
        {
            if(model == null)
            {
                throw new ArgumentException("malfored request");
            }
            if(string.IsNullOrEmpty(model.Email))
            {
                throw new ArgumentException("BadRequest");
            }

            try
            {
                if (userContext.IsLoginValid(model.Email, model.Password))
                {
                    User user = GetCurrentUser(model.Email);
                    return UserState(ManageMessageId.LogonSuccess, "", user);
                }
                throw new UnauthorizedAccessException("Unauthorized");
            }
            catch(Exception ex)
            {
                throw new UnauthorizedAccessException(ex.Message);
            }
        }

        [HttpPost]
        [EnableCors("CorsPolicy")]
        [Route("/api/Register")]
        [AllowAnonymous]
        public async Task<object> Register([FromBody]Register model)
        {
            if(model == null)
            {
                throw new ArgumentException("malfored request");
            }
            if(string.IsNullOrEmpty(model.Email) || string.IsNullOrEmpty(model.Password))
            {
                throw new ArgumentException("BadRequest");
            }

            var user = new User() { UserName = model.Email, Email = model.Email, Password = model.Password };
            if(UserExists(user)) {
                return UserState(ManageMessageId.RegisterFailure);
            }

            userContext.CreateUser(user);

            if (securityOptions.RequireConfirmationEmail)
            {
                var code = secureTokenService.GenerateToken(user.Email, securityOptions.TokenTTL);
                var callbackUrl = Url.Action("ConfirmEmail", "Account", new { userId = user.ID, code = code }, protocol: HttpContext.Request.Scheme);

                try
                {
                    string messageBody = System.IO.File.ReadAllText("Resources/registration-tmpl.html");
                    if (!string.IsNullOrEmpty(messageBody))
                    {
                        //StringValues baseUrl;
                        //HttpContext.Request.Headers.TryGetValue("Origin", out baseUrl);
                        messageBody = messageBody.Replace("#callbackUrl#", callbackUrl)
                                                 .Replace("#goPaveUrl#", baseUrl);
                    }
                    await emailSender.SendEmailAsync(model.Email, "Confirm PavementDesigner Account", messageBody);
                    return UserState(ManageMessageId.RegisterSuccess);
                }
                catch (Exception ex)
                {
                    logger.LogError("failed to send email '{0}'", ex.Message);
                    userContext.Remove(user);
                    userContext.SaveChanges();
                    return UserState(ManageMessageId.Error, ex.Message, null);
                }
            }
            user = GetCurrentUser(user.Email);
            return UserState(ManageMessageId.LogonSuccess, "", user);
        }

        [HttpGet]
        [Route("/api/Logout")]
        [Authorize(Policy="ValidateJwtToken")]
        public object Logout()
        {
            return UserState(ManageMessageId.LogoffSuccess);
        }

        [HttpDelete("/api/accounts")]
        [AllowAnonymous]
        public object Remove([FromQuery]string emailAddress)
        {
            var user = GetCurrentUser(emailAddress);
            Logout();
            if(user != null)
            {
                userContext.Remove(user);
                userContext.SaveChanges();
                return UserState(ManageMessageId.RemoveSuccess);
            }
            return UserState(ManageMessageId.Error, "Email not found", null);
        }

        [HttpGet]
        [Route("/api/ConfirmEmail")]
        [AllowAnonymous]
        public Task<ContentResult> ConfirmEmail([FromQuery]string userId, [FromQuery]string code)
        {
            if (string.IsNullOrEmpty(userId) || string.IsNullOrEmpty(code))
            {
                throw new ArgumentException("malformed request");
            }

            string emailAddr;
            secureTokenService.GetEmailAddrFromToken(code, out emailAddr);
            User user = GetCurrentUser(emailAddr);
            if (user == null)
            {
                return Task.FromResult(Content(@"Whoops, something went wrong with your user token. Please try again."));
            }

            user.EmailConfirmed = true;
            userContext.Update(user);
            userContext.SaveChanges();

            string welcomeBody = System.IO.File.ReadAllText("Resources/welcome-tmpl.html");
            if(!string.IsNullOrEmpty(welcomeBody))
            {
                //StringValues baseUrl;
                //HttpContext.Request.Headers.TryGetValue("Origin", out baseUrl);
                welcomeBody = welcomeBody.Replace("#goPaveUrl#", baseUrl);
            }
            return Task.FromResult(Content(welcomeBody, "text/html"));

        }

        [HttpPost]
        [EnableCors("CorsPolicy")]
        [Route("/api/ForgotPassword")]
        [AllowAnonymous]
        public async Task<object> ForgotPassword([FromBody]ForgotPassword model)
        {
            if(model == null)
            {
                throw new ArgumentException("malfored request");
            }

            User user = GetCurrentUser(model.Email);
            if (user == null)
            {
                return UserState(ManageMessageId.Error, "Email not found", null);
            }
            if(!user.EmailConfirmed)
            {
                return UserState(ManageMessageId.Error, "Email address is unconfirmed", null);
            }

            var code = secureTokenService.GenerateToken(model.Email, securityOptions.TokenTTL);
//            var callbackUrl = Url.Action("ResetPassword", "Account", new { userId = user.ID, code = code }, protocol: HttpContext.Request.Scheme);
//            String callbackUrl = "https://pavementdesigner.org/reset?"
            String callbackUrl = baseUrl + "/reset?"
                               + "userId=" + user.ID + "code=" + code;
            string messageBody = System.IO.File.ReadAllText("Resources/reset-password-tmpl.html");
            if (!string.IsNullOrEmpty(messageBody))
            {
                messageBody = messageBody.Replace("#callbackUrl#", callbackUrl);
            }
            else {
                messageBody = $"Please reset your PavementDesigner password by clicking here: <a href='{callbackUrl}'>link</a>";
            }
            try
            {
                await emailSender.SendEmailAsync(model.Email, "Reset PavementDesigner Password", messageBody);
                return UserState(ManageMessageId.EmailSentSuccess);
            }
            catch (Exception ex)
            {
                logger.LogCritical($"Email send failed in Forgot Password post back - {ex.Message}");
            }
            return UserState(ManageMessageId.Error, "Email send failed", null);
        }

        [HttpPost]
        [EnableCors("CorsPolicy")]
        [Route("/api/ResetPassword")]
        [AllowAnonymous]
        public object ResetPassword([FromBody]ResetPassword model)
        {
            if(model == null)
            {
                throw new ArgumentException("malfored request");
            }

            User user = GetCurrentUser(model.Email);
            if (user == null)
            {
                return UserState(ManageMessageId.Error, "Email not found", null);
            }

            user.Password = model.Password;
            userContext.UpdateUser(user);

            return UserState(ManageMessageId.ResetPasswordSuccess);
        }

        [HttpPost]
        [EnableCors("CorsPolicy")]
        [Route("/api/ChangePassword")]
        [Authorize(Policy="ValidateJwtToken")]
        public object ChangePassword([FromBody]ChangePassword model)
        {
            if(model == null)
            {
                throw new ArgumentException("malfored request");
            }

            var user = GetCurrentUser();
            if (user != null)
            {
                if (userContext.IsLoginValid(user.Email, model.OldPassword))
                {
                    user.Password = model.NewPassword;
                    userContext.UpdateUser(user);

                    logger.LogInformation("User changed their password successfully.");
                    return UserState(ManageMessageId.ChangePasswordSuccess);
                }
            }
            return UserState(ManageMessageId.Error);
        }

        [HttpPost]
        [EnableCors("CorsPolicy")]
        [Route("/api/SetPassword")]
        [Authorize(Policy="ValidateJwtToken")]
        public object SetPassword([FromBody]SetPassword model)
        {
            if(model == null)
            {
                throw new ArgumentException("malfored request");
            }

            var user = GetCurrentUser();
            if (user != null)
            {
                    user.Password = model.NewPassword;
                    userContext.UpdateUser(user);

                    return UserState(ManageMessageId.SetPasswordSuccess);
            }
            return UserState(ManageMessageId.Error);
        }

        private enum ManageMessageId
        {
            LogonSuccess,
            LogoffSuccess,
            ChangePasswordSuccess,
            SetPasswordSuccess,
            ResetPasswordSuccess,
            RegisterSuccess,
            RegisterFailure,
            EmailSentSuccess,
            ConfirmEmailSuccess,
            RemoveSuccess,
            Error
        }

        private object UserState(ManageMessageId? message = null, string errorDetails = "", User user = null)
        {
            var statusDetails = new {
                Text = message == ManageMessageId.LogonSuccess          ? "Successfully logged on"
                     : message == ManageMessageId.LogoffSuccess         ? "Successfully logged off"
                     : message == ManageMessageId.ChangePasswordSuccess ? "Password has been changed"
                     : message == ManageMessageId.SetPasswordSuccess    ? "Successfully set password"
                     : message == ManageMessageId.ResetPasswordSuccess  ? "Reset password success"
                     : message == ManageMessageId.RegisterSuccess       ? "New account with password created, email confirmation request sent"
                     : message == ManageMessageId.RegisterFailure       ? "User already exists"
                     : message == ManageMessageId.EmailSentSuccess      ? "Successfully sent email"
                     : message == ManageMessageId.ConfirmEmailSuccess   ? "Email confirmed"
                     : message == ManageMessageId.RemoveSuccess         ? "Account successfully deleted"
                     : message == ManageMessageId.Error                 ? "An error has occurred "
                    : "",
                ErrorDetails = errorDetails
            };

            if(user == null)
            {
                try {
                    user = GetCurrentUser();
                } catch(Exception ex) {logger.LogDebug("failed to get current user, {0}", ex.Message);}
            }

            var model = new
            {
                Message   = statusDetails,
                HasError  = message == ManageMessageId.Error,
                token     = user == null ? "" : secureTokenService.GenerateToken(user.Email, securityOptions.TokenTTL)
            };
            return model;
        }
    }
}
