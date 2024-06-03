using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using System.Net;
using System.Security.Authentication;
using System.Threading.Tasks;
using System;

namespace GoPaveServer.Services
{
    public class ErrorHandlingMiddleware
    {
        private readonly RequestDelegate next;

        public ErrorHandlingMiddleware(RequestDelegate next)
        {
            this.next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await next(context);
            }
            catch (Exception ex)
            {
                await HandleExceptionAsync(context, ex);
            }
        }

        private static async Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            if (exception == null) return;

            var code = HttpStatusCode.InternalServerError;

            if (exception is AuthenticationException)
            {
                code = HttpStatusCode.Unauthorized;
            }
            else if(exception is UnauthorizedAccessException)
            {
                code = HttpStatusCode.Unauthorized;
            }
            else if (exception is ArgumentException ||
                     exception is ArgumentNullException)
            {
                code = HttpStatusCode.BadRequest;
            }
            else if (exception is InvalidOperationException)
            {
                code = HttpStatusCode.Unauthorized;
            }
            else if (exception is SystemException)
            {
                code = HttpStatusCode.BadRequest;
            }
            else if(exception is DivideByZeroException)
            {
                code = HttpStatusCode.BadRequest;
            }
            else if(exception is NullReferenceException)
            {
                code = HttpStatusCode.InternalServerError;
            }
            else
            {
                code = HttpStatusCode.BadRequest;
                Program.Trace("No mapping for " + exception.ToString() + "\n" + exception.StackTrace);
            }

            await WriteExceptionAsync(context, exception, code).ConfigureAwait(false);
        }

        private static async Task WriteExceptionAsync(HttpContext context, Exception exception, HttpStatusCode code)
        {
            var response = context.Response;

            response.ContentType = "application/json";
            response.StatusCode  = (int)code;

            await response.WriteAsync(JsonConvert.SerializeObject(new
                {
                    error = new
                    {
                        message = exception.Message
                    }
                }
            )).ConfigureAwait(false);
        }
    }
}
