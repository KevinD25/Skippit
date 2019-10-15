using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Configuration.Json;
using Skippit_DAL.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;

namespace Skippit_DAL
{
    public class SkippitContext : DbContext
    {
        public SkippitContext() { }
        public SkippitContext(DbContextOptions<SkippitContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>();
            modelBuilder.Entity<Establishment>();
            modelBuilder.Entity<Item>();
            modelBuilder.Entity<Order>(); 
        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var connstring = ConnectionString;
            optionsBuilder.UseSqlServer(connstring); 
        }
        private static string ConnectionString
        {
            get
            {
                string path = Directory.GetCurrentDirectory();
                string newPath = Path.GetFullPath(Path.Combine(path, @"../Skippit_DAL/"));
                var builder = new ConfigurationBuilder()
                    .SetBasePath(newPath)
                    .AddJsonFile("Config.json");
                var config = builder.Build();

                string connstr = config.GetConnectionString("DefaultConnection");
                return connstr; 
            }
        }
    }
}
