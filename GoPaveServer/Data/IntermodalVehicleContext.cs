using GoPaveServer.Models;
using Microsoft.EntityFrameworkCore;

namespace GoPaveServer.Data
{
    public class IntermodalVehicleContext : DbContext
    {
        public IntermodalVehicleContext(DbContextOptions<IntermodalVehicleContext> options) : base(options)
        {}

        public void Initialize()
        {
            IntermodalVehicleInitializer.Initialize(this);
            IntermodalVehicleMetricInitializer.Initialize(this);
        }

        public DbSet<IntermodalVehicle> IntermodalVehicles { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }
    }
}
