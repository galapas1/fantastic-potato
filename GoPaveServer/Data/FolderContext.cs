using GoPaveServer.Models;
using Microsoft.EntityFrameworkCore;

namespace GoPaveServer.Data
{
    public class FolderContext : DbContext
    {
        public FolderContext(DbContextOptions<FolderContext> options) : base(options)
        {}

        public void Initialize()
        {
            FolderInitializer.Initialize(this);
        }

        public DbSet<Folder> Folders { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }
    }
}
