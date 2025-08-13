using System;
using System.Security.Authentication;
using MongoDB.Driver;

namespace Server.db;

public class MongoDbContext
{

    private readonly IMongoDatabase _database;
    public MongoDbContext()
    {
        var connectionString = "mongodb://localhost:27017/";
        var databaseName = "JobsPortal";
        var clientSettings = MongoClientSettings.FromConnectionString(connectionString);
        clientSettings.SslSettings = new SslSettings { EnabledSslProtocols = SslProtocols.Tls12 };
        var client = new MongoClient(clientSettings);
        _database = client.GetDatabase(databaseName);
    }
    public IMongoCollection<T> GetCollection<T>(string collectionName)
    {
        return _database.GetCollection<T>(collectionName);
    }
}
