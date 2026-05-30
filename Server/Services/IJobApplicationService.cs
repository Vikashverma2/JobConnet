using Server.Models;

namespace Server.Services;

public interface IJobApplicationService
{
    Task<JobApplication> Apply(JobApplication application);
    Task<List<JobApplication>> GetByUserId(string userId);
    Task<List<JobApplication>> GetByJobId(string jobId);
    Task<bool> HasApplied(string jobId, string userId);
    Task<bool> UpdateStatus(string id, string status);
    Task<List<JobApplication>> GetByCompanyId(string companyId);
}
