using System;
using Server.Models;

namespace Server.Services;

public interface IUserService
{
    Task<User> CreateUser(User user);
}
