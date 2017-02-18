using DotNetLive.AdminWeb.Models.TodoModels;
using DotNetLive.Framework.Data;
using DotNetLive.Framework.Data.Repositories;
using DotNetLive.Framework.DependencyManagement;
using DotNetLive.Framework.Models;
using DotNetLive.Framework.UserIdentity;
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
        public void Register(IServiceCollection services, IConfigurationRoot configuration, IServiceProvider serviceProvider)
        {
            services.AddSingleton<ITodoRepository, TodoRepository>();
        }
    }
}
