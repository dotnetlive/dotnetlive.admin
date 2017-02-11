using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DotNetLive.AdminWeb.ApiControllers
{
    [Produces("application/json")]
    [Route("api/account")]
    public class AccountController : Controller
    {
        //     /account/login[POST] data:{username:string,passwordHash:string[48]
        //}
        //header:[[token:string[64]]]
        public void Login([NotNullAndWhiteSpace]string username, string passwordHash)
        {

        }
    }
}