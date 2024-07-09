using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace api.Data
{
    public class ApplicationDBContext : IdentityDbContext<AppUser>
    {
        public ApplicationDBContext(DbContextOptions dbContextOptions) : base(dbContextOptions)
        {

        }

        public DbSet<Stock> Stocks { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Portfolio> portfolios{ get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Portfolio>(p => p.HasKey(item => new { item.CommentId, item.AppUserId }));

            modelBuilder.Entity<Portfolio>().HasOne(p => p.AppUser).WithMany(p => p.Portfolios).HasForeignKey(p => p.AppUserId);

            modelBuilder.Entity<Portfolio>().HasOne(p => p.Comment).WithMany(c => c.Portfolios).HasForeignKey(p => p.CommentId);

            List<IdentityRole> roles = new List<IdentityRole>() {
                new IdentityRole() {
                    Name = "Admin",
                    NormalizedName = "ADMIN",
                },
                new IdentityRole() {
                    Name = "User",
                    NormalizedName = "USER",
                },

            };

            modelBuilder.Entity<IdentityRole>().HasData(roles);
        }
    }
}