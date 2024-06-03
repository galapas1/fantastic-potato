using Microsoft.AspNetCore.Http;

namespace GoPaveServer.Interfaces
{
    public interface ISecureTokenService
    {
        string GenerateToken(string username, int tokenTTLinHours);
        string GetEmailAddrFromToken(string encToken, out string emailAddr);
        string GetEmailAddrFromHeader(IHeaderDictionary headers, out string emailAddr);
    }
}
