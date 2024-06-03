using Microsoft.AspNetCore.Http;
using System.Diagnostics;
using System.Threading.Tasks;

namespace GoPaveServer.Services
{
    public class ProcessingTime
    {
        private readonly RequestDelegate _next;

        public ProcessingTime(RequestDelegate next)
        {
            _next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            var watch = new Stopwatch();

            context.Response.OnStarting(() =>
            {
                watch.Stop();
                context.Response
                       .Headers
                       .Add("X-Processing-Time-Milliseconds",
                            new[] { watch.ElapsedMilliseconds.ToString() });

                return Task.CompletedTask;
            });

            watch.Start();

            await _next(context);
        }
    }
}
