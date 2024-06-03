using GoPaveServer.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Primitives;
using System.Collections.Concurrent;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System;

namespace GoPaveServer.Services
{
    public class SecureTokenService : ISecureTokenService
    {
        public static string AuthorizationToken = "Authorization";

        public string GenerateToken(string emailAddr, int tokenTTLinHours)
        {
            ClaimsIdentity identity = new ClaimsIdentity("Token Auth");
            identity.AddClaim(new Claim(ClaimTypes.Email, emailAddr));

            DateTime expires = DateTime.UtcNow.AddHours(tokenTTLinHours);
            var jwt = new JwtSecurityToken(
                claims: identity.Claims,
                expires: expires
            );
            return new JwtSecurityTokenHandler().WriteToken(jwt);
        }

        public string GetEmailAddrFromToken(string encToken, out string emailAddr)
        {
            emailAddr = null;

            JwtSecurityTokenHandler tokenHandler = new JwtSecurityTokenHandler();
            JwtSecurityToken securityToken;

            try {
                securityToken = tokenHandler.ReadToken(encToken) as JwtSecurityToken;
            } catch(Exception) {
                return null;
            }

            if (securityToken.ValidTo.CompareTo(DateTime.UtcNow) > 0) {
                foreach(Claim claim in securityToken.Claims)
                {
                    switch( claim.Type ) {
                        case ClaimTypes.Email:
                            emailAddr = claim.Value;
                            return claim.Value;

                        default:
                            break;
                    }
                }
            }
            return null;
        }

        public string GetEmailAddrFromHeader(IHeaderDictionary headers, out string emailAddr)
        {
            emailAddr = null;

            StringValues authHeader;
            headers.TryGetValue(AuthorizationToken, out authHeader);

            GetEmailAddrFromToken(authHeader, out emailAddr);
            return emailAddr;
        }
    }
}
