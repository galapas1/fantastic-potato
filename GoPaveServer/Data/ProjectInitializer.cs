using GoPaveServer.Models;
using System.Linq;

namespace GoPaveServer.Data
{
    public static class ProjectInitializer
    {
        public static void Initialize(ProjectContext context)
        {
            context.Database.EnsureCreated();
            context.SaveChanges();
        }
    }
}
