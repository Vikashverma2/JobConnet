using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Server.db;
using Server.Services;

var builder = WebApplication.CreateBuilder(args);

// ── MongoDB Context (Singleton – one connection pool) ────────────────────
builder.Services.AddSingleton<MongoDbContext>();

// ── Application Services ─────────────────────────────────────────────────
builder.Services.AddScoped<IUserService,           UserService>();
builder.Services.AddScoped<IJobService,            JobService>();
builder.Services.AddScoped<IJobApplicationService, JobApplicationService>();

// ── Controllers + Swagger ────────────────────────────────────────────────
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new() { Title = "JobConnect API", Version = "v1" });
});

// ── CORS – allow React dev server ────────────────────────────────────────
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy
            .AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader();
    });
});

// ── JWT Authentication ───────────────────────────────────────────────────
var jwtKey = builder.Configuration["Jwt:Key"]
             ?? "JobConnectDefaultSecretKey2024XYZ!_FALLBACK";

builder.Services
    .AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer           = true,
            ValidateAudience         = true,
            ValidateLifetime         = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer              = builder.Configuration["Jwt:Issuer"]   ?? "JobConnect",
            ValidAudience            = builder.Configuration["Jwt:Audience"] ?? "JobConnectUsers",
            IssuerSigningKey         = new SymmetricSecurityKey(
                                          Encoding.UTF8.GetBytes(jwtKey))
        };
    });

// ─────────────────────────────────────────────────────────────────────────
var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAll");    
app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();
app.Run();
