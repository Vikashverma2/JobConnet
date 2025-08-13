using System;
using MongoDB.Driver;
using Server.db;
using Server.Models;

namespace Server.Services;

public class UserService : IUserService
{
    private readonly MongoDbContext _dbContext;
    private readonly IMongoCollection<User> _usersCollection;

    public UserService()
    {
        _dbContext = new MongoDbContext();
        _usersCollection = _dbContext.GetCollection<User>("Users");
    }


    public async Task<User> CreateUser(User user)
    {
        await _usersCollection.InsertOneAsync(user);
        return user;
    }
}
