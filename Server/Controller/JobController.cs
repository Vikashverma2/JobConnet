using Microsoft.AspNetCore.Mvc;
using Server.Models;
using Server.Services;

namespace Server.Controller;

[Route("api/jobs")]
[ApiController]
public class JobController : ControllerBase
{
    private readonly IJobService _jobService;

    public JobController(IJobService jobService)
    {
        _jobService = jobService;
    }

    // GET api/jobs
    [HttpGet]
    public async Task<IActionResult> GetAllJobs()
    {
        var jobs = await _jobService.GetAllJobs();
        return Ok(jobs);
    }

    // GET api/jobs/{id}
    [HttpGet("{id}")]
    public async Task<IActionResult> GetJobById(string id)
    {
        var job = await _jobService.GetJobById(id);
        if (job == null) return NotFound(new { message = "Job not found." });
        return Ok(job);
    }

    // GET api/jobs/company/{companyId}
    [HttpGet("company/{companyId}")]
    public async Task<IActionResult> GetJobsByCompany(string companyId)
    {
        var jobs = await _jobService.GetJobsByCompany(companyId);
        return Ok(jobs);
    }

    // POST api/jobs
    [HttpPost]
    public async Task<IActionResult> CreateJob([FromBody] Job job)
    {
        if (string.IsNullOrWhiteSpace(job.Title) || string.IsNullOrWhiteSpace(job.Company))
            return BadRequest(new { message = "Title and Company are required." });

        var created = await _jobService.CreateJob(job);
        return CreatedAtAction(nameof(GetJobById), new { id = created.Id }, created);
    }

    // DELETE api/jobs/{id}?companyId=xxx
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteJob(string id, [FromQuery] string companyId)
    {
        if (string.IsNullOrWhiteSpace(companyId))
            return BadRequest(new { message = "companyId query param is required." });

        var deleted = await _jobService.DeleteJob(id, companyId);
        if (!deleted) return NotFound(new { message = "Job not found or not owned by this company." });

        return Ok(new { message = "Job deleted successfully." });
    }
}
