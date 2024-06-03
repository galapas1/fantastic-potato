using Microsoft.AspNetCore.Http;

namespace GoPaveServer.Services
{
    public class HttpContextAccessor : IHttpContextAccessor
    {
        private HttpContext ctx;

        public HttpContext HttpContext
        {
            get
            {
                return ctx;
            }

            set
            {
                ctx = value;
            }
        }
    }
}
