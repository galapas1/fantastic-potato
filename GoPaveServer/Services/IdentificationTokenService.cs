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
    public class IdentificationTokenService : AuthorizationHandler<IdentificationTokenRequirement>
    {
        private readonly UserContext  userContext;
        public static string AuthorizationToken = "Authorization";
        private readonly ISecureTokenService tokenService;

        public IdentificationTokenService(UserContext         userContext,
                                          ISecureTokenService tokenService)
        {
            this.userContext  = userContext;
            this.tokenService = tokenService;
        }

        protected override Task HandleRequirementAsync(AuthorizationHandlerContext    context,
                                                       IdentificationTokenRequirement requirement)
        {
            AuthorizationFilterContext mvcContext = context.Resource as AuthorizationFilterContext;
            if(mvcContext != null)
            {
                if (mvcContext.HttpContext.Request.Headers.Keys.Contains(AuthorizationToken))
                {
                    string emailAddr;
                    tokenService.GetEmailAddrFromHeader(mvcContext.HttpContext.Request.Headers, out emailAddr);
                    if(!string.IsNullOrEmpty(emailAddr))
                    {
                        User user = userContext.GoPaveUsers.Where(u => u.Email.Equals(emailAddr)).FirstOrDefault();
                        if(!(user == null || user.LockoutEnabled))
                        {
                            ClaimsIdentity identity = new ClaimsIdentity("Token Auth");
                            identity.AddClaim(new Claim(ClaimTypes.NameIdentifier, user.UserName));
                            mvcContext.HttpContext.User = new ClaimsPrincipal(identity);
                        }
                    }
                }
            }
            context.Succeed(requirement);
            return Task.FromResult(0);
        }
    }
}
