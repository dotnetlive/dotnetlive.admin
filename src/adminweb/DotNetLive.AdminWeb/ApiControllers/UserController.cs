using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using DotNetLive.AdminWeb.Models.UserModels;

namespace DotNetLive.AdminWeb.ApiControllers
{
    [Produces("application/json")]
    [Route("api/users")]
    public class UserController : Controller
    {
        //  /users[POST] {name:string,itemCount:number,pageIndex:number
        //    }-->{username:string
        //}
        //[] header:{token:string[48]}
        [HttpGet]
        public IList<UserDto> GetUserList(string name, int itemCount = 10, int pageIndex = 20)
        {
            return new List<UserDto>();
        }
    }
}