using DotNetLive.AdminWeb.Models.TodoModels;
using DotNetLive.Framework.DependencyManagement;
using DotNetLive.Framework.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using System;

namespace DotNetLive.AdminWeb.DependencyRegister
{
    public class ServiceDependencyRegister : IDependencyRegister
    {
        public ExecuteOrderType ExecuteOrder => ExecuteOrderType.Normal;

        public void Register(IServiceCollection services, IConfigurationRoot configuration, IServiceProvider serviceProvider)
        {
            services.AddSingleton<ITodoRepository, TodoRepository>();
        }
    }
}
