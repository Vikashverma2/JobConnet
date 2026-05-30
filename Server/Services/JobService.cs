using MongoDB.Driver;
using Server.db;
using Server.Models;

namespace Server.Services;

public class JobService : IJobService
{
    private readonly IMongoCollection<Job> _jobsCollection;

    public JobService(MongoDbContext dbContext)
    {
        _jobsCollection = dbContext.GetCollection<Job>("Jobs");
    }

    public async Task<List<Job>> GetAllJobs()
    {
        return await _jobsCollection
            .Find(_ => true)
            .SortByDescending(j => j.CreatedAt)
            .ToListAsync();
    }

    public async Task<Job?> GetJobById(string id)
    {
        return await _jobsCollection.Find(j => j.Id == id).FirstOrDefaultAsync();
    }

    public async Task<Job> CreateJob(Job job)
    {
        job.CreatedAt = DateTime.UtcNow;
        job.IsNew     = true;
        await _jobsCollection.InsertOneAsync(job);
        return job;
    }

    public async Task<List<Job>> GetJobsByCompany(string companyId)
    {
        return await _jobsCollection
            .Find(j => j.CompanyId == companyId)
            .SortByDescending(j => j.CreatedAt)
            .ToListAsync();
    }

    public async Task<bool> DeleteJob(string id, string companyId)
    {
        var result = await _jobsCollection
            .DeleteOneAsync(j => j.Id == id && j.CompanyId == companyId);
        return result.DeletedCount > 0;
    }
}
