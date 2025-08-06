import React from 'react';
import { Link } from 'react-router-dom';

function AppliedJobs() {
  const applied = JSON.parse(localStorage.getItem('appliedJobs')) || [];

  return (
    <div className="container">
      <h2>My Applied Jobs</h2>
      {applied.length === 0 ? (
        <p>You haven't applied for any jobs yet.</p>
      ) : (
        <div className="job-listings-grid">
          {applied.map(job => (
            <div key={job.id} className="job-card">
              <h3>{job.title}</h3>
              <p>{job.company}</p>
              <Link to={`/job/${job.id}`} className="btn btn-primary">View</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AppliedJobs;