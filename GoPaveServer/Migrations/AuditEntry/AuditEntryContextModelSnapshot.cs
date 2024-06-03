using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using GoPaveServer.Data;

namespace GoPaveServer.Migrations.AuditEntry
{
    [DbContext(typeof(AuditEntryContext))]
    partial class AuditEntryContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.1.1")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("GoPaveServer.Models.AuditEntry", b =>
                {
                    b.Property<int?>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Action");

                    b.Property<string>("ErrorMessage");

                    b.Property<bool>("HasError");

                    b.Property<string>("Time");

                    b.Property<string>("UserName");

                    b.HasKey("ID");

                    b.ToTable("AuditEntries");
                });
        }
    }
}
