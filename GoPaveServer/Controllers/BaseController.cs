using GoPaveServer.Data;
using GoPaveServer.Models;
using GoPaveServer.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Security.Claims;
using System.Linq;
using Microsoft.AspNetCore.Cors;

namespace GoPaveServer.Controllers
{
    [EnableCors("CorsPolicy")]
    [ServiceFilter(typeof(AuditFilter))]
    public class BaseController : Controller
    {
        protected readonly UserContext userContext;
        protected readonly ILogger logger;

        public BaseController(UserContext    userContext,
                              ILoggerFactory loggerFactory)
        {
            this.logger = loggerFactory.CreateLogger(this.ToString());
            this.userContext = userContext;
        }

        protected User GetCurrentUser()
        {
            string emailAddr = null, username = null;
            ClaimsPrincipal principal = HttpContext.User;
            foreach(ClaimsIdentity identity in principal.Identities)
            {
                foreach( Claim claim in identity.Claims)
                {
                   switch( claim.Type ) {
                        case ClaimTypes.Email:
                            emailAddr = claim.Value;
                            break;

                        case ClaimTypes.Name:
                        case ClaimTypes.NameIdentifier:
                            username = claim.Value;
                            break;

                        default:
                            logger.LogDebug(claim.Type.ToString() + " " + claim.Value);
                            break;
                    }
                }
            }
            if(string.IsNullOrEmpty(emailAddr))
            {
                emailAddr = username;
            }
            if(string.IsNullOrEmpty(emailAddr))
            {
                return null;
            }
            User user = userContext.GoPaveUsers.Where(u => u.Email.Equals(emailAddr)).FirstOrDefault();
            if(user == null)
            {
                logger.LogInformation("No user for {0}", emailAddr);
            }
            return user;
        }

        protected User GetCurrentUser(string emailAddr)
        {
            User user = userContext.GoPaveUsers.Where(u => u.Email.Equals(emailAddr)).FirstOrDefault();
            if(user == null)
            {
                logger.LogInformation("No user for {0}", emailAddr);
            }
            return user;
        }

        protected bool UserExists(User _user)
        {
            User user = userContext.GoPaveUsers.Where(u => u.Email.Equals(_user.Email)).FirstOrDefault();
            if(user == null)
            {
                return false;
            }
            return true;
        }
    }
}
