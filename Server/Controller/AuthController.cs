using Microsoft.AspNetCore.Mvc;
using Server.Models;
using Server.Services;

namespace Server.Controller;

[Route("api/auth")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly IUserService _userService;

    public AuthController(IUserService userService)
    {
        _userService = userService;
    }

    // POST api/auth/register
    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] RegisterRequest request)
    {
        try
        {
            var response = await _userService.Register(request);
            return Ok(response);
        }
        catch (InvalidOperationException ex)
        {
            return BadRequest(new { message = ex.Message });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Registration failed: " + ex.Message });
        }
    }

    // POST api/auth/login
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequest request)
    {
        try
        {
            var response = await _userService.Login(request);
            if (response == null)
                return Unauthorized(new { message = "Invalid email, password, or role." });
            return Ok(response);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Login failed: " + ex.Message });
        }
    }

    // GET api/auth/user/{id}
    [HttpGet("user/{id}")]
    public async Task<IActionResult> GetUser(string id)
    {
        var user = await _userService.GetById(id);
        if (user == null)
            return NotFound(new { message = "User not found." });

        return Ok(new
        {
            id    = user.Id,
            name  = user.Name,
            email = user.Email,
            role  = user.Role
        });
    }
}
