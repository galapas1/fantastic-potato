using Microsoft.AspNetCore.Authorization;

namespace GoPaveServer.Models
{
    public class ApiKeyRequirement : IAuthorizationRequirement
    {
        public ApiKeyRequirement() {
        }
    }
}
