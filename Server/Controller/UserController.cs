using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Server.Models;
using Server.Services;

namespace Server.Controller
{
    [Route("api/[controller]")]
    // ✅ Base URL will be "api/User" because class name is UserController

    [ApiController]
    // ✅ Enables automatic request validation, model binding, etc.

    public class UserController : ControllerBase
    {
        private readonly IUserService userService;

        public UserController(IUserService _userService)
        {
            userService = _userService;
            // ✅ Dependency Injection: ASP.NET will give you a UserService instance
        }

        [HttpPost]
        // ✅ This method responds to POST requests at "api/User"

        public async Task<IActionResult> CreateUser([FromBody] User user)
        {
            var createdUser = await userService.CreateUser(user);
            // ✅ Calls service to save user into MongoDB

            return Ok(createdUser);
            // ✅ Returns HTTP 200 with the created user data
        }
    }
}
