using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using MongoDB.Driver;
using Server.db;
using Server.Models;

namespace Server.Services;

public class UserService : IUserService
{
    private readonly IMongoCollection<User> _usersCollection;
    private readonly IConfiguration _config;

    public UserService(MongoDbContext dbContext, IConfiguration config)
    {
        _usersCollection = dbContext.GetCollection<User>("Users");
        _config = config;
    }

    // ── Register ─────────────────────────────────────────────────────────
    public async Task<AuthResponse> Register(RegisterRequest request)
    {
        // Check duplicate email
        var existing = await _usersCollection
            .Find(u => u.Email == request.Email.ToLower())
            .FirstOrDefaultAsync();

        if (existing != null)
            throw new InvalidOperationException("This email is already registered.");

        var user = new User
        {
            Name     = request.Name.Trim(),
            Email    = request.Email.ToLower().Trim(),
            Password = HashPassword(request.Password),
            Role     = request.Role
        };

        await _usersCollection.InsertOneAsync(user);

        return new AuthResponse
        {
            Token   = GenerateJwtToken(user),
            Id      = user.Id ?? string.Empty,
            Name    = user.Name,
            Email   = user.Email,
            Role    = user.Role,
            Message = "Registration successful."
        };
    }

    // ── Login ─────────────────────────────────────────────────────────────
    public async Task<AuthResponse?> Login(LoginRequest request)
    {
        var user = await _usersCollection
            .Find(u => u.Email == request.Email.ToLower().Trim())
            .FirstOrDefaultAsync();

        if (user == null || user.Password != HashPassword(request.Password))
            return null;

        // If a role hint is provided, validate it matches stored role
        if (!string.IsNullOrEmpty(request.Role) && user.Role != request.Role)
            return null;

        return new AuthResponse
        {
            Token   = GenerateJwtToken(user),
            Id      = user.Id ?? string.Empty,
            Name    = user.Name,
            Email   = user.Email,
            Role    = user.Role,
            Message = "Login successful."
        };
    }

    // ── GetById ───────────────────────────────────────────────────────────
    public async Task<User?> GetById(string id)
    {
        return await _usersCollection.Find(u => u.Id == id).FirstOrDefaultAsync();
    }

    // ── Helpers ───────────────────────────────────────────────────────────
    private static string HashPassword(string password)
    {
        using var sha256 = SHA256.Create();
        var bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
        return Convert.ToBase64String(bytes);
    }

    private string GenerateJwtToken(User user)
    {
        var key        = _config["Jwt:Key"]      ?? "JobConnectDefaultSecretKey2024XYZ!_FALLBACK";
        var issuer     = _config["Jwt:Issuer"]   ?? "JobConnect";
        var audience   = _config["Jwt:Audience"] ?? "JobConnectUsers";
        var expiryDays = int.TryParse(_config["Jwt:ExpiryDays"], out var d) ? d : 7;

        var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key));
        var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub,   user.Id    ?? ""),
            new Claim(JwtRegisteredClaimNames.Email, user.Email),
            new Claim(JwtRegisteredClaimNames.Name,  user.Name),
            new Claim(ClaimTypes.Role,               user.Role),
            new Claim(JwtRegisteredClaimNames.Jti,   Guid.NewGuid().ToString()),
        };

        var token = new JwtSecurityToken(
            issuer:             issuer,
            audience:           audience,
            claims:             claims,
            expires:            DateTime.UtcNow.AddDays(expiryDays),
            signingCredentials: credentials
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}
