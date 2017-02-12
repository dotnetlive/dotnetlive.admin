using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using DotNetLive.AdminWeb.Models.UserModels;

namespace DotNetLive.AdminWeb.Controllers
{
    public class UserController : Controller
    {
        [HttpGet]
        public IList<UserDto> GetUserList()
        {
            var result = new List<UserDto>();
            for (int i = 0; i < 10; i++)
            {
                result.Add(new UserDto() { UserId = Guid.NewGuid(), Name = $"Name-{i}", Creation = DateTime.Now });
            }
            return result;
        }

        [HttpGet]
        public UserDto GetUserInfo([FromQuery]Guid userId)
        {
            return new UserDto() { UserId = userId, Name = $"Name-X", Creation = DateTime.Now };
        }
    }
}