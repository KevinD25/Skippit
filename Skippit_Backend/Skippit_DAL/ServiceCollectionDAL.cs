using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.Extensions.DependencyInjection;
using Skippit_DAL.Helpers;

namespace Skippit_DAL
{
    public static class ServiceCollectionDAL
    {
        public static void AddServiceCollectionDAL(this IServiceCollection services)
        {
            services.AddScoped<ICrud_DAL, Test_DAL>();
            SkippitContext context;
            DBInitializer.Initialize(context = new SkippitContext()); 
        }
    }
}
