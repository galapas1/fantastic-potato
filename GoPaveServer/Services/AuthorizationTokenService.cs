using GoPaveServer.Data;
using GoPaveServer.Interfaces;
using GoPaveServer.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Filters;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Linq;
using System.Security.Authentication;
using System;

namespace GoPaveServer.Services
{
    public class AuthorizationTokenService : AuthorizationHandler<AuthorizationTokenRequirement>
    {
        private readonly UserContext  userContext;
        public static string AuthorizationToken = "Authorization";
        private readonly ISecureTokenService tokenService;

        public AuthorizationTokenService(UserContext         userContext,
                                         ISecureTokenService tokenService)
        {
            this.userContext  = userContext;
            this.tokenService = tokenService;
        }

        protected override Task HandleRequirementAsync(AuthorizationHandlerContext   context,
                                                       AuthorizationTokenRequirement requirement)
        {
            AuthorizationFilterContext mvcContext = context.Resource as AuthorizationFilterContext;
            if(mvcContext == null)
            {
                return Task.FromResult(0);
            }
            if (!mvcContext.HttpContext.Request.Headers.Keys.Contains(AuthorizationToken))
            {
                throw new UnauthorizedAccessException();
            }
            else
            {
                string emailAddr;
                tokenService.GetEmailAddrFromHeader(mvcContext.HttpContext.Request.Headers, out emailAddr);
                if(string.IsNullOrEmpty(emailAddr))
                {
                    throw new UnauthorizedAccessException();
                }
                User user = userContext.GoPaveUsers.Where(u => u.Email.Equals(emailAddr)).FirstOrDefault();
                if(!(user == null || user.LockoutEnabled))
                {
                    ClaimsIdentity identity = new ClaimsIdentity("Token Auth");
                    identity.AddClaim(new Claim(ClaimTypes.NameIdentifier, user.UserName));
                    mvcContext.HttpContext.User = new ClaimsPrincipal(identity);
                    context.Succeed(requirement);
                }
                else
                {
                    throw new UnauthorizedAccessException();
                }
            }
            return Task.FromResult(0);
        }
    }
}
