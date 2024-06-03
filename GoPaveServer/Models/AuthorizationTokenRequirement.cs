using Microsoft.AspNetCore.Authorization;

namespace GoPaveServer.Models
{
    public class AuthorizationTokenRequirement : IAuthorizationRequirement
    {
        public AuthorizationTokenRequirement() {
        }
    }
}
