using GoPaveServer.Models;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace GoPaveServer.Data
{
    public class UserContext : DbContext
    {
        public UserContext(DbContextOptions<UserContext> options) : base(options)
        {}

        public void Initialize()
        {
            UserInitializer.Initialize(this);
        }

        public bool IsUserValid(string email)
        {
            if(string.IsNullOrEmpty(email)) return false;

            User user = this.GoPaveUsers.Where(u => u.Email.Equals(email)).FirstOrDefault();
            if(user == null)
            {
                return false;
            }
            return true;
        }

        public bool IsLoginValid(string email, string password)
        {
            if(string.IsNullOrEmpty(email) || string.IsNullOrEmpty(password)) return false;
            User user = this.GoPaveUsers.Where(u => u.Email.Equals(email)).FirstOrDefault();
            if(user == null)
            {
                return false;
            }
            return BCrypt.Net.BCrypt.Verify(password, user.PasswordHash);
        }

        public void CreateUser(User user)
        {
            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(user.Password);
            user.Password     = null;
            this.AddAsync(user);
            this.SaveChanges();
        }

        public void UpdateUser(User user)
        {
            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(user.Password);
            user.Password     = null;

            this.Update(user);
            this.SaveChanges();
        }

        public DbSet<User> GoPaveUsers { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }
    }
}
