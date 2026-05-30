using MongoDB.Driver;
using Server.db;
using Server.Models;

namespace Server.Services;

public class JobApplicationService : IJobApplicationService
{
    private readonly IMongoCollection<JobApplication> _col;
    private readonly IMongoCollection<Job> _jobsCol;

    public JobApplicationService(MongoDbContext dbContext)
    {
        _col = dbContext.GetCollection<JobApplication>("Applications");
        _jobsCol = dbContext.GetCollection<Job>("Jobs");
    }

    public async Task<JobApplication> Apply(JobApplication application)
    {
        application.AppliedAt = DateTime.UtcNow;
        application.Status    = "Applied";
        await _col.InsertOneAsync(application);
        return application;
    }

    public async Task<List<JobApplication>> GetByUserId(string userId)
    {
        return await _col
            .Find(a => a.UserId == userId)
            .SortByDescending(a => a.AppliedAt)
            .ToListAsync();
    }

    public async Task<List<JobApplication>> GetByJobId(string jobId)
    {
        return await _col
            .Find(a => a.JobId == jobId)
            .SortByDescending(a => a.AppliedAt)
            .ToListAsync();
    }

    public async Task<bool> HasApplied(string jobId, string userId)
    {
        return await _col
            .Find(a => a.JobId == jobId && a.UserId == userId)
            .AnyAsync();
    }

    public async Task<bool> UpdateStatus(string id, string status)
    {
        var update = Builders<JobApplication>.Update.Set(a => a.Status, status);
        var result = await _col.UpdateOneAsync(a => a.Id == id, update);
        return result.ModifiedCount > 0;
    }

    public async Task<List<JobApplication>> GetByCompanyId(string companyId)
    {
        var jobs = await _jobsCol.Find(j => j.CompanyId == companyId).ToListAsync();
        var jobIds = jobs.Select(j => j.Id).ToList();
        
        return await _col
            .Find(a => jobIds.Contains(a.JobId))
            .SortByDescending(a => a.AppliedAt)
            .ToListAsync();
    }
}
