import React from 'react';
import { useParams } from 'react-router-dom';
import jobsData from '../../data/JobsData';
// import { useAuth } from '../context/AuthContext';

function JobDetails() {
  const { id } = useParams();
  const job = jobsData.find(j => j.id === id);
  const { user } = useAuth();

  if (!job) return <p>Job not found.</p>;

  const handleApply = () => {
    const applied = JSON.parse(localStorage.getItem('appliedJobs')) || [];
    const updated = [...applied, job];
    localStorage.setItem('appliedJobs', JSON.stringify(updated));
    alert('Application submitted!');
  };

  return (
    <div className="container">
      <h2>{job.title}</h2>
      <p>{job.description}</p>
      <ul>
        {job.requirements.map((req, i) => <li key={i}>{req}</li>)}
      </ul>
      {user?.role === 'seeker' && (
        <button className="btn btn-primary" onClick={handleApply}>Apply Now</button>
      )}
    </div>
  );
}

export default JobDetails;