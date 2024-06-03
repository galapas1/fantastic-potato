using GoPaveServer.Data;
using GoPaveServer.Models;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Logging;
using System;
using System.Text.RegularExpressions;

namespace GoPaveServer.Services
{
    public class AuditFilter : ActionFilterAttribute
    {
        private readonly AuditEntryContext context;
        private readonly ILogger logger;
        public AuditFilter(AuditEntryContext context,
                           ILoggerFactory    loggerFactory)
        {
            this.context = context;
            this.logger  = loggerFactory.CreateLogger(this.ToString());
        }

        public override void OnActionExecuted(ActionExecutedContext actionContext)
        {
            string userName    = actionContext.HttpContext.User.Identity.Name;
            string time        = DateTime.Now.ToString();
            string actionName  = actionContext.ActionDescriptor.DisplayName;

            bool   errorFlag   = (actionContext.Exception == null ? false : true);
            string errorMsg    = (errorFlag ? actionContext.Exception.Message : "");

            actionName  = Regex.Replace(actionName, "\\(GoPaveServer\\)", "("+actionContext.HttpContext.Request.Path+")");

            if(string.IsNullOrEmpty(userName))
            {
                userName = "{anonymous}";
            }

            AuditEntry audit = new AuditEntry() {
                UserName     = userName,
                Time         = time,
                Action       = actionName,
                HasError     = errorFlag,
                ErrorMessage = errorMsg
            };

            context.AuditEntries.Add(audit);
            context.SaveChanges();

            logger.LogDebug(string.Format("{0}: {1}, {2}, {3}, {4}",
                time, userName, actionName, (errorFlag ? "failed" : "success"), errorMsg));
        }
    }
}
