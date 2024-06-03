using GoPaveServer.Models;
using System.Linq;

namespace GoPaveServer.Data
{
    public static class FolderInitializer
    {
        public static void Initialize(FolderContext context)
        {
            context.Database.EnsureCreated();
            if(context.Folders.Any()) {
                return;
            }

            var folders = new Folder[]
            {
                new Folder{UserID = 0,
                           Name   = "root"
                }
            };

            foreach (Folder f in folders)
            {
                context.Folders.Add(f);
            }
            context.SaveChanges();
        }
    }
}
