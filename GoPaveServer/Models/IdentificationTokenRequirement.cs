using Microsoft.AspNetCore.Authorization;

namespace GoPaveServer.Models
{
    public class IdentificationTokenRequirement : IAuthorizationRequirement
    {
        public IdentificationTokenRequirement() {
        }
    }
}
