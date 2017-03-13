using DotNetLive.Framework.Models;
using DotNetLive.Framework.Mvc.UserIdentity;
using DotNetLive.Framework.Mvc.WebFramework.Controllers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;

namespace DotNetLive.AdminWeb.Controllers
{
    [Authorize]
    public class AccountController : BaseAccountController
    {
        public AccountController(IOptions<SecuritySettings> securitySetting) : base(securitySetting)
        {
        }

        [AllowAnonymous]
        public IActionResult SpaLogin(string username, string passwordHash, string token)
        {
            return Json(new { username, passwordHash, token });
        }
    }
}