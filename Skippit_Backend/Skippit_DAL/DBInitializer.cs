using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace Skippit_DAL
{
    public class DBInitializer
    {
        public static void Initialize(DbContext context)
        {
            context.Database.EnsureCreated();
            context.SaveChanges(); 
        }
    }
}
