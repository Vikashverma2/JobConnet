using Server.Models;

namespace Server.Services;

public interface IUserService
{
    Task<AuthResponse> Register(RegisterRequest request);
    Task<AuthResponse?> Login(LoginRequest request);
    Task<User?> GetById(string id);
}
