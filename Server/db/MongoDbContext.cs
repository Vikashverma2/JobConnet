using MongoDB.Driver;
using Microsoft.Extensions.Configuration;

namespace Server.db;

public class MongoDbContext
{
    private readonly IMongoDatabase _database;

    public MongoDbContext(IConfiguration configuration)
    {
        var connectionString = configuration["MongoDB:ConnectionString"] ?? "mongodb://localhost:27017/";
        var databaseName     = configuration["MongoDB:DatabaseName"]     ?? "JobsPortal";

        var client    = new MongoClient(connectionString);
        _database = client.GetDatabase(databaseName);
    }

    public IMongoCollection<T> GetCollection<T>(string collectionName)
    {
        return _database.GetCollection<T>(collectionName);
    }
}
