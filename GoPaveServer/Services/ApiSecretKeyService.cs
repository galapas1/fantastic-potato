using GoPaveServer.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Options;
using Microsoft.Extensions.Primitives;
using System.Security.Authentication;
using System.Threading.Tasks;

namespace GoPaveServer.Services
{
    public class ApiSecretKeyService : AuthorizationHandler<ApiKeyRequirement>
    {
        public static string ApiSecretKey = "GoPave-Api-Secret-Key";
        private string apiSecretKey;

        public ApiSecretKeyService(IOptions<SecurityOptions> securityOptions)
        {
            apiSecretKey = securityOptions.Value.ApiSecretKey;
        }

        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context,
                                                       ApiKeyRequirement requirement)
        {
            if (string.IsNullOrEmpty(this.apiSecretKey))
            {
                context.Succeed(requirement);
            }
            else
            {
                AuthorizationFilterContext mvcContext = context.Resource as AuthorizationFilterContext;
                if (!mvcContext.HttpContext.Request.Headers.Keys.Contains(ApiSecretKey))
                {
                    context.Fail();
                    return Task.FromException(new System.UnauthorizedAccessException("Forbidden"));
                }
                else
                {
                    StringValues apiSecretKey;
                    mvcContext.HttpContext.Request.Headers.TryGetValue(ApiSecretKey, out apiSecretKey);

                    if (this.apiSecretKey.Equals(apiSecretKey))
                    {
                        context.Succeed(requirement);
                    }
                    else
                    {
                        context.Fail();
                        return Task.FromException(new AuthenticationException("Unauthorized"));
                    }
                }
            }
            return Task.FromResult(0);
        }
    }
}
