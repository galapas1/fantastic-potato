using GoPaveServer.Models;
using Microsoft.EntityFrameworkCore;

namespace GoPaveServer.Data
{
    public class ProjectContext : DbContext
    {
        public ProjectContext(DbContextOptions<ProjectContext> options) : base(options)
        {}

        public void Initialize()
        {
            ProjectInitializer.Initialize(this);
        }

        public DbSet<Project> Projects { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }
    }
}
