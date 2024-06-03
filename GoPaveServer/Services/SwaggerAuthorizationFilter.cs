using GoPaveServer.Data;
using GoPaveServer.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Swashbuckle.AspNetCore.Swagger;
using Swashbuckle.AspNetCore.SwaggerGen;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace GoPaveServer.Services
{
    public class SwaggerAuthorizationFilter : IDocumentFilter
    {
        private IServiceProvider provider;
        private readonly ISecureTokenService tokenService;
        private readonly UserContext userContext;
        public SwaggerAuthorizationFilter(IServiceProvider    provider,
                                          ISecureTokenService tokenService,
                                          UserContext         userContext)
        {
            if (provider == null) throw new ArgumentNullException(nameof(provider));

            this.provider     = provider;
            this.tokenService = tokenService;
            this.userContext  = userContext;
        }

        public void Apply(SwaggerDocument swaggerDoc, DocumentFilterContext context)
        {
            var http = this.provider.GetRequiredService<IHttpContextAccessor>();
            var auth = this.provider.GetRequiredService<IAuthorizationService>();

            var descriptions = context.ApiDescriptionsGroups.Items.SelectMany(group => group.Items);

            foreach (var description in descriptions)
            {

                var authAttributes = description.ControllerAttributes()
                    .OfType<AuthorizeAttribute>()
                    .Union(description.ActionAttributes()
                        .OfType<AuthorizeAttribute>());

                var route = "/" + description.RelativePath.TrimEnd('/');
                var path = swaggerDoc.Paths[route];

                // if forbad due to policy....
                if(isForbiddenDuePolicy(http, auth, authAttributes))
                {
                    // ...override if user is known
                    if(isForbiddenDueAnonymous(http, authAttributes))
                    {
                        // remove method or entire path (if there are no more methods in this path)
                        switch (description.HttpMethod)
                        {
                            case "DELETE":  path.Delete  = null; break;
                            case "GET":     path.Get     = null; break;
                            case "HEAD":    path.Head    = null; break;
                            case "OPTIONS": path.Options = null; break;
                            case "PATCH":   path.Patch   = null; break;
                            case "POST":    path.Post    = null; break;
                            case "PUT":     path.Put     = null; break;
                            default: throw new ArgumentOutOfRangeException("Method name not mapped to operation");
                        }

                        if (path.Delete == null && path.Get     == null &&
                            path.Head   == null && path.Options == null &&
                            path.Patch  == null && path.Post    == null &&
                            path.Put    == null)
                        {
                            swaggerDoc.Paths.Remove(route);
                        }
                    }
                }
            }
        }

        private static bool isForbiddenDuePolicy(
            IHttpContextAccessor http,
            IAuthorizationService auth,
            IEnumerable<AuthorizeAttribute> attributes)
        {
            var policies = attributes
                .Where(p => !String.IsNullOrEmpty(p.Policy))
                .Select(a => a.Policy)
                .Distinct();
            return policies.Any(p => Task.Run(async () => await auth.AuthorizeAsync(http.HttpContext.User, p)).Result == false);
        }

        private bool isForbiddenDueAnonymous(
            IHttpContextAccessor http,
            IEnumerable<AuthorizeAttribute> attributes)
        {
            string emailAddr;
            tokenService.GetEmailAddrFromHeader(http.HttpContext.Request.Headers, out emailAddr);
            return attributes.Any() && !userContext.IsUserValid(emailAddr);
        }
    }
}
