using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using GoPaveServer.Data;

namespace GoPaveServer.Migrations.Project
{
    [DbContext(typeof(ProjectContext))]
    partial class ProjectContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.1.1")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("GoPaveServer.Models.Project", b =>
                {
                    b.Property<int?>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Body");

                    b.Property<DateTime>("DateCreated");

                    b.Property<string>("Description");

                    b.Property<string>("Designer");

                    b.Property<DateTime>("LastModified");

                    b.Property<string>("Name");

                    b.Property<string>("OwnersAgency");

                    b.Property<string>("Route");

                    b.Property<int?>("Type");

                    b.Property<string>("UnitType");

                    b.Property<int>("UserID");

                    b.Property<string>("ZipCode");

                    b.Property<int>("folderId");

                    b.HasKey("ID");

                    b.ToTable("Projects");
                });
        }
    }
}
