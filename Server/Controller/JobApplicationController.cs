using Microsoft.AspNetCore.Mvc;
using Server.Models;
using Server.Services;

namespace Server.Controller;

[Route("api/applications")]
[ApiController]
public class JobApplicationController : ControllerBase
{
    private readonly IJobApplicationService _appService;

    public JobApplicationController(IJobApplicationService appService)
    {
        _appService = appService;
    }

    // POST api/applications
    [HttpPost]
    public async Task<IActionResult> Apply([FromBody] JobApplication application)
    {
        if (string.IsNullOrWhiteSpace(application.JobId) ||
            string.IsNullOrWhiteSpace(application.UserId))
            return BadRequest(new { message = "JobId and UserId are required." });

        var alreadyApplied = await _appService.HasApplied(application.JobId, application.UserId);
        if (alreadyApplied)
            return Conflict(new { message = "You have already applied for this job." });

        var created = await _appService.Apply(application);
        return Ok(created);
    }

    // GET api/applications/user/{userId}
    [HttpGet("user/{userId}")]
    public async Task<IActionResult> GetByUserId(string userId)
    {
        var apps = await _appService.GetByUserId(userId);
        return Ok(apps);
    }

    // GET api/applications/job/{jobId}
    [HttpGet("job/{jobId}")]
    public async Task<IActionResult> GetByJobId(string jobId)
    {
        var apps = await _appService.GetByJobId(jobId);
        return Ok(apps);
    }

    // GET api/applications/company/{companyId}
    [HttpGet("company/{companyId}")]
    public async Task<IActionResult> GetByCompanyId(string companyId)
    {
        var apps = await _appService.GetByCompanyId(companyId);
        return Ok(apps);
    }

    // GET api/applications/check?jobId=...&userId=...
    [HttpGet("check")]
    public async Task<IActionResult> HasApplied([FromQuery] string jobId, [FromQuery] string userId)
    {
        var hasApplied = await _appService.HasApplied(jobId, userId);
        return Ok(new { hasApplied });
    }

    // PATCH api/applications/{id}/status
    [HttpPatch("{id}/status")]
    public async Task<IActionResult> UpdateStatus(string id, [FromBody] StatusUpdateRequest req)
    {
        var updated = await _appService.UpdateStatus(id, req.Status);
        if (!updated) return NotFound(new { message = "Application not found." });
        return Ok(new { message = "Status updated." });
    }
}

public class StatusUpdateRequest
{
    public string Status { get; set; } = string.Empty;
}
