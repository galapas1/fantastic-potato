using GoPaveServer.Models;
using Microsoft.EntityFrameworkCore;

namespace GoPaveServer.Data
{
    public class AuditEntryContext : DbContext
    {
        public AuditEntryContext(DbContextOptions<AuditEntryContext> options) : base(options)
        {}

        public DbSet<AuditEntry> AuditEntries { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }
    }
}
