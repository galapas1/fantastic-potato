using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using GoPaveServer.Data;

namespace GoPaveServer.Migrations.Folder
{
    [DbContext(typeof(FolderContext))]
    [Migration("20170728130629_Folders")]
    partial class Folders
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
            modelBuilder
                .HasAnnotation("ProductVersion", "1.1.1")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("GoPaveServer.Models.Folder", b =>
                {
                    b.Property<int?>("ID")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name");

                    b.Property<int>("UserID");

                    b.Property<int>("parentFolderId");

                    b.HasKey("ID");

                    b.ToTable("Folders");
                });
        }
    }
}
