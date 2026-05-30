import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CompanyDashboard.css';

const CompanyDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('jobs');
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [loading, setLoading] = useState(true);

  // In a real app, you'd get the companyId from your auth context
  // For this demo, let's assume we have it or get it from localStorage
  const companyId = localStorage.getItem('userId') || 'dummy-company-id';

  useEffect(() => {
    fetchDashboardData();
  }, [companyId]);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // 1. Fetch company's jobs
      const jobsRes = await fetch(`http://localhost:5190/api/jobs/company/${companyId}`);
      if (jobsRes.ok) {
        const jobsData = await jobsRes.json();
        setJobs(jobsData);
      }

      // 2. Fetch all applications for the company
      const appsRes = await fetch(`http://localhost:5190/api/applications/company/${companyId}`);
      if (appsRes.ok) {
        const appsData = await appsRes.json();
        setApplications(appsData);
      }
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateApplicationStatus = async (appId, newStatus) => {
    try {
      const res = await fetch(`http://localhost:5190/api/applications/${appId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        // Update local state
        setApplications(applications.map(app => 
          app.id === appId ? { ...app, status: newStatus } : app
        ));
      }
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const getApplicationsForJob = (jobId) => {
    return applications.filter(app => app.jobId === jobId);
  };

  if (loading) {
    return <div className="company-dashboard-container"><div className="empty-state">Loading dashboard...</div></div>;
  }

  return (
    <div className="company-dashboard-container">
      {/* SIDEBAR */}
      <aside className="dashboard-sidebar">
        <div className="dashboard-logo">JobConnect</div>
        <nav className="sidebar-nav">
          <button 
            className={`nav-item ${activeTab === 'jobs' && !selectedJob ? 'active' : ''}`}
            onClick={() => { setActiveTab('jobs'); setSelectedJob(null); }}
          >
            <span className="icon">💼</span> My Jobs
          </button>
          <button 
            className={`nav-item ${activeTab === 'candidates' || selectedJob ? 'active' : ''}`}
            onClick={() => setActiveTab('candidates')}
          >
            <span className="icon">👥</span> Candidates
          </button>
          <button 
            className="nav-item"
            onClick={() => navigate('/')}
          >
            <span className="icon">🏠</span> Back to Home
          </button>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="dashboard-content">
        <header className="dashboard-header">
          <h1>Company Dashboard</h1>
          <p>Manage your job postings and review candidates seamlessly.</p>
        </header>

        {/* JOBS VIEW */}
        {activeTab === 'jobs' && !selectedJob && (
          <div className="jobs-grid">
            {jobs.length === 0 ? (
              <div className="empty-state" style={{ gridColumn: '1 / -1' }}>
                <h3>No jobs posted yet.</h3>
                <p>Post a job to start receiving applications.</p>
                <button 
                  className="btn btn-primary" 
                  style={{ marginTop: '1rem' }}
                  onClick={() => navigate('/post-job')}
                >
                  Post a Job
                </button>
              </div>
            ) : (
              jobs.map(job => {
                const appCount = getApplicationsForJob(job.id).length;
                return (
                  <div 
                    key={job.id} 
                    className="job-card"
                    onClick={() => {
                      setSelectedJob(job);
                      setActiveTab('candidates');
                    }}
                  >
                    <div className="job-card-title">{job.title}</div>
                    <div className="job-card-meta">
                      <span>📍 {job.location}</span>
                      <span>💼 {job.type}</span>
                    </div>
                    <div className="job-card-footer">
                      <span className="stat-pill">{appCount} Applicants</span>
                      <span style={{ color: 'var(--color-text-subtle)', fontSize: 'var(--font-size-xs)' }}>
                        Posted {new Date(job.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* CANDIDATES VIEW (All or for specific job) */}
        {(activeTab === 'candidates' || selectedJob) && (
          <div className="applications-view">
            <div className="applications-header">
              <h2>{selectedJob ? `Candidates for ${selectedJob.title}` : 'All Candidates'}</h2>
              {selectedJob && (
                <button 
                  className="back-btn" 
                  onClick={() => { setSelectedJob(null); setActiveTab('jobs'); }}
                >
                  ← Back to Jobs
                </button>
              )}
            </div>
            
            <table className="applications-table">
              <thead>
                <tr>
                  <th>Applicant</th>
                  <th>Experience</th>
                  <th>Applied On</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {applications
                  .filter(app => selectedJob ? app.jobId === selectedJob.id : true)
                  .map(app => (
                  <tr key={app.id}>
                    <td>
                      <div className="applicant-info">
                        <span className="applicant-name">{app.firstName} {app.lastName}</span>
                        <span className="applicant-email">{app.email}</span>
                      </div>
                    </td>
                    <td style={{ color: 'var(--color-text-muted)' }}>{app.experience}</td>
                    <td style={{ color: 'var(--color-text-muted)' }}>
                      {new Date(app.appliedAt).toLocaleDateString()}
                    </td>
                    <td>
                      <span className={`status-badge status-${app.status.toLowerCase()}`}>
                        {app.status}
                      </span>
                    </td>
                    <td>
                      <select 
                        className="action-select"
                        value={app.status}
                        onChange={(e) => updateApplicationStatus(app.id, e.target.value)}
                      >
                        <option value="Applied">Applied</option>
                        <option value="Reviewed">Reviewed</option>
                        <option value="Shortlisted">Shortlisted</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </td>
                  </tr>
                ))}
                
                {applications.filter(app => selectedJob ? app.jobId === selectedJob.id : true).length === 0 && (
                  <tr>
                    <td colSpan="5">
                      <div className="empty-state">
                        <p>No candidates found.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
};

export default CompanyDashboard;
