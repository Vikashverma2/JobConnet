using Server.Models;

namespace Server.Services;

public interface IJobService
{
    Task<List<Job>> GetAllJobs();
    Task<Job?> GetJobById(string id);
    Task<Job> CreateJob(Job job);
    Task<List<Job>> GetJobsByCompany(string companyId);
    Task<bool> DeleteJob(string id, string companyId);
}
