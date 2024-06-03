using GoPaveServer.Models;
using System.Linq;

namespace GoPaveServer.Data
{
    public static class UserInitializer
    {
        public static void Initialize(UserContext context)
        {
            context.Database.EnsureCreated();

            if(context.GoPaveUsers.Any()) {
                return;
            }

            var users = new User[]
            {
                new User{Email = "info@gopave.com",
                         EmailConfirmed = true
                }
            };

            foreach (User u in users)
            {
                context.GoPaveUsers.Add(u);
            }
            context.SaveChanges();
        }
    }
}
