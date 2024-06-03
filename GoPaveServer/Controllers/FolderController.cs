using GoPaveServer.Data;
using GoPaveServer.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Linq;
using System.Threading.Tasks;
using System;
using System.Collections.Generic;

namespace GoPaveServer.Controllers
{
    [RouteAttribute("/api/folders/")]
    public class FolderController : BaseController
    {
        private readonly FolderContext folderContext;

        public FolderController(UserContext     userContext,
                                 FolderContext  folderContext,
                                 ILoggerFactory loggerFactory) : base(userContext,
                                                                      loggerFactory)
        {
            this.folderContext = folderContext;
        }

        [HttpPost]
        [EnableCors("CorsPolicy")]
        [Authorize(Policy="ValidateJwtToken")]
        public async Task<object> Save([FromBody]Folder model)
        {
            User user = GetCurrentUser();
            validate(model, user);

            model.UserID = user.ID.Value;

            try
            {
                if(model.ID != null)
                {
                    var entity = folderContext.Folders.Where(p => p.ID.Value == model.ID.Value &&
                                                             user.ID.Value == p.UserID);
                    folderContext.Folders.Update(model);
                }
                else
                {
                    model.ID = null;
                    var p = await folderContext.AddAsync(model);
                    model.ID = p.Entity.ID;
                }
                await folderContext.SaveChangesAsync();
                if(model.ID == null)
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
        public Task<Folder> Load(int id)
        {
            User user = GetCurrentUser();
            return Task.FromResult(
                folderContext.Folders.Where(p =>
                    p.ID.Value == id && user.ID.Value == p.UserID
                ).Single()
            );
        }

        [HttpDelete("{id}")]
        [Authorize(Policy="ValidateJwtToken")]
        public async Task<object> Remove(int id)
        {
            User user = GetCurrentUser();
            var folder = folderContext.Folders.Where(p =>
                p.ID.Value == id && user.ID.Value == p.UserID
            ).FirstOrDefault();

            if(folder != null)
            {
                folderContext.Folders.Remove(folder);
                await folderContext.SaveChangesAsync();
            }
            return List();
        }

        [HttpGet]
        [Authorize(Policy="ValidateJwtToken")]
        public Task<Dictionary<int, Folder>> List()
        {
            User user = GetCurrentUser();
            Folder[] folderArray = folderContext.Folders.Where(p => user.ID.Value == p.UserID ||
                                                               p.UserID == 0).ToArray();
            Dictionary<int, Folder> folders = new Dictionary<int, Folder>();
            for(int i = 0; i < folderArray.Length; i++)
            {
                Folder p = folderArray[i];
                folders.Add(p.ID.Value, p);
            }
            return Task.FromResult(folders);
        }


        private void validate(Folder model, User user)
        {
            if(model == null)
            {
                throw new ArgumentException("malformed request");
            }

            if(string.IsNullOrEmpty(model.Name))
            {
                throw new ArgumentException("Missing Folder Name");
            }

            Folder _p = folderContext.Folders.Where(p =>
                p.Name.Equals(model.Name) && user.ID.Value == p.UserID
            ).FirstOrDefault();

            if(null != _p)
            {
                throw new ArgumentException("Folder Name must be unique");
            }
        }
    }
}
