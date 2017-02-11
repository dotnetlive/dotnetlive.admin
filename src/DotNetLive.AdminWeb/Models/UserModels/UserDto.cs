using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DotNetLive.AdminWeb.Models.UserModels
{
    public class UserDto
    {
        public Guid UserId { get; set; }
        public string Name { get; set; }
        public DateTime Creation { get; set; }
        public DateTime Modification { get; set; }
    }
}
