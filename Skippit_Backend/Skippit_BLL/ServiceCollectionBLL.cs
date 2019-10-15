using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.Extensions.DependencyInjection;
using Skippit_BLL.Helpers;
using Skippit_DAL; 

namespace Skippit_BLL
{
    public static class ServiceCollectionBLL
    {
        public static void AddServiceCollectionBLL(this IServiceCollection services)
        {
            services.AddScoped<ICrud_BLL, Test_BLL>();

            services.AddServiceCollectionDAL(); 
        }
    }
}
