using GoPaveServer.Data;
using GoPaveServer.Interfaces;
using GoPaveServer.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System;
using Newtonsoft.Json.Linq;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Primitives;

namespace GoPaveServer.Controllers
{
    [RouteAttribute("/api/projects/")]
    public class ProjectController : BaseController
    {
        private String baseUrl = "https://www.pavementdesigner.org";

        private readonly ProjectContext projectContext;
        private readonly IEmailSender   emailSender;

        public ProjectController(UserContext                  userContext,
                                 ProjectContext               projectContext,
                                 ILoggerFactory               loggerFactory,
                                 IEmailSender                 emailSender) : base(userContext,
                                                                                  loggerFactory)
        {
            this.projectContext = projectContext;
            this.emailSender    = emailSender;
        }

        [HttpPost]
        [EnableCors("CorsPolicy")]
        [Authorize(Policy="ValidateJwtToken")]
        public async Task<object> Save([FromBody]Project model)
        {
            User user = GetCurrentUser();
            validate(model, user);

            model.UserID       = user.ID.Value;
            model.LastModified = DateTime.Now;

            if(model.folderId == 0)
            {
                model.folderId = 1;
            }

            try
            {
                if(model.ID != null)
                {
                    var entity = projectContext.Projects.AsNoTracking().Where(p =>
                        p.ID.Value == model.ID.Value &&
                        user.ID.Value == p.UserID
                    );
                    Project _p = entity.FirstOrDefault();
                    if(null != _p)
                    {
                       model.DateCreated = _p.DateCreated;
                    }
                    projectContext.Projects.Update(model);
                }
                else
                {
                    Project _p = projectContext.Projects.Where(p_ =>
                        p_.Name.Equals(model.Name) && user.ID.Value == p_.UserID
                    ).FirstOrDefault();

                    if (null != _p)
                    {
                        throw new ArgumentException("Project Name must be unique");
                    }

                    model.ID = null;
                    model.DateCreated = DateTime.Now;
                    var p = await projectContext.AddAsync(model);
                    model.ID = p.Entity.ID;
                }
                await projectContext.SaveChangesAsync();
                if (model.ID == null)
                {
                    throw new Exception("unknown error");
                }
            }
            catch(Exception ex)
            {
                throw new ArgumentException(ex.Message);
            }
            return Load(model.ID.Value);
        }

        [HttpGet("{id}")]
        [Authorize(Policy="ValidateJwtToken")]
        public Task<Project> Load(int id)
        {
            User user = GetCurrentUser();
            return Task.FromResult(
                projectContext.Projects.Where(p =>
                    p.ID.Value == id && user.ID.Value == p.UserID
                ).Single()
            );
        }
/** Not needed
        [HttpGet("{token}")]
        [Authorize(Policy="ValidateJwtToken")]
        public Task<object> LoadShared(string token)
        {
            User user = GetCurrentUser();
            // Place holder pending redirect to the GoWebWeb UI
            return null;
        }
**/
        [HttpDelete("{id}")]
        [Authorize(Policy="ValidateJwtToken")]
        public async Task<object> Remove(int id)
        {
            User user = GetCurrentUser();
            var project = projectContext.Projects.Where(p =>
                p.ID.Value == id && user.ID.Value == p.UserID
            ).FirstOrDefault();

            if(project != null)
            {
                projectContext.Projects.Remove(project);
                await projectContext.SaveChangesAsync();
            }
            return List();
        }

        [HttpGet]
        [Authorize(Policy="ValidateJwtToken")]
        public Task<Dictionary<int, Project>> List()
        {
            User user = GetCurrentUser();
            Project[] projectArray = projectContext.Projects.Where(p => user.ID.Value == p.UserID).ToArray();
            Dictionary<int, Project> projects = new Dictionary<int, Project>();
            for(int i = 0; i < projectArray.Length; i++)
            {
                Project p = projectArray[i];
                projects.Add(p.ID.Value, p);
            }
            return Task.FromResult(projects);
        }

        [HttpPost("share/")]
        [EnableCors("CorsPolicy")]
        [Authorize(Policy="ValidateJwtToken")]
        public async Task ShareProject([FromBody]ProjectShare model)
        {
//            StringValues baseUrl;
//            HttpContext.Request.Headers.TryGetValue("Origin", out baseUrl);

            User user = GetCurrentUser();

            var projects = projectContext.Projects.Where(p => user.ID.Value == p.UserID &&
                                                         model.Id == p.ID.Value);
            if (projects == null)
            {
                throw new ArgumentException("project not found");
            }
            Project project = projects.SingleOrDefault();

            User recipient = GetCurrentUser(model.SendToEmailAddress);
            var tmpPassword = CreatePassword(8);

            string callbackUrl = "";
            string messageBody = "";

            if(null == recipient)
            {
                throw new ArgumentException("A PavementDesigner user does not exist with this email address.  Projects can only be shared with existing users.");
/*
                messageBody = System.IO.File.ReadAllText("Resources/project-share-tmpl.html");

                var newUser = new User { ID = null, UserName = model.SendToEmailAddress, Email = model.SendToEmailAddress };
                userContext.Add(newUser);
                userContext.SaveChanges();

                recipient = GetCurrentUser(model.SendToEmailAddress);
*/
            }
            else
            {
                messageBody = System.IO.File.ReadAllText("Resources/project-share-info-tmpl.html");
                callbackUrl = baseUrl;
            }

            Project sharableProject = new Project() {
                ID           = null,
                UserID       = recipient.ID.Value,
                DateCreated  = project.DateCreated,
                LastModified = DateTime.Now,
                folderId     = 1,
                Type         = project.Type,
                Name         = project.Name + " (shared)",
                Description  = project.Description,
                Body         = project.Body
            };

            var newProject = await projectContext.AddAsync(sharableProject);
            await projectContext.SaveChangesAsync();
/** TODO: support non-registered user project sharing
            if(string.IsNullOrEmpty(callbackUrl))
            {
                callbackUrl = baseUrl + "/shareProject" + "?projId=" + newProject.Entity.ID.Value
                                                        + "&userId=" + recipient.Email
                                                        + "&tmpPwd=" + tmpPassword;
            }
**/
            try
            {
                if (!string.IsNullOrEmpty(messageBody))
                {
                    messageBody = messageBody.Replace("#callbackUrl#",       callbackUrl)
                                             .Replace("#goPaveUrl",          baseUrl)
                                             .Replace("#sharedProjectName#", newProject.Entity.Name)
                                             .Replace("#userEmailAddress#",  user.Email);
                }
                await emailSender.SendEmailAsync(model.SendToEmailAddress, "PavementDesigner Shared Project Notice", messageBody);
            }
            catch (Exception ex)
            {
                logger.LogError("failed to send email '{0}'", ex.Message);
            }
        }

        private void validate(Project model, User user)
        {
            if(model == null)
            {
                throw new ArgumentException("malformed request, unable to parse request");
            }

            if(string.IsNullOrEmpty(model.Name))
            {
                throw new ArgumentException("Missing Project Name");
            }

            if(model.Type == null)
            {
                throw new ArgumentException("Missing Project Type");
            }

            if(string.IsNullOrEmpty(model.Body))
            {
                throw new ArgumentException("Missing Project Body");
            }

            try
            {
                JObject.Parse(model.Body);
            }
            catch (Exception ex)
            {
                throw new ArgumentException("Project Body must be valid JSON: " + ex.Message);
            }
//            logger.LogDebug("BODY\n"+model.Body);
        }

        private string CreatePassword(int length)
        {
            const string valid1 = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            const string valid2 = "abcdefghijklmnopqrstuvwxyz";
            const string valid3 = ",.@!-=%";
            const string valid4 = "1234567890";
            StringBuilder res = new StringBuilder();
            Random rnd = new Random();
            while (0 < length)
            {
                res.Append(valid1[rnd.Next(valid1.Length)]); --length;
                res.Append(valid2[rnd.Next(valid2.Length)]); --length;
                res.Append(valid3[rnd.Next(valid3.Length)]); --length;
                res.Append(valid4[rnd.Next(valid4.Length)]); --length;
            }
            return res.ToString();
        }
    }
}
