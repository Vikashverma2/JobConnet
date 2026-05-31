import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CompanyDashboard.css';

const CompanyDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [loading, setLoading] = useState(true);

  const userStr = localStorage.getItem('jc_user');
  const user = userStr ? JSON.parse(userStr) : null;
  const companyId = user ? user.id : 'dummy-company-id';
  const companyName = user ? user.name : 'Your Company';

  const [profile, setProfile] = useState({
    companyName: companyName,
    website: 'https://',
    industry: 'Technology',
    description: 'We are a fast growing company.'
  });

  useEffect(() => {
    fetchDashboardData();
  }, [companyId]);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      const jobsRes = await fetch(`http://localhost:5190/api/jobs/company/${companyId}`);
      if (jobsRes.ok) {
        const jobsData = await jobsRes.json();
        setJobs(jobsData);
      }

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
        setApplications(applications.map(app => 
          app.id === appId ? { ...app, status: newStatus } : app
        ));
      }
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("jc_user");
    window.dispatchEvent(new Event("jc_auth_change"));
    navigate('/login', { replace: true });
  };

  const getApplicationsForJob = (jobId) => applications.filter(app => app.jobId === jobId);

  if (loading) {
    return <div className="company-dashboard-container"><div className="empty-state"><h3>Loading your ATS...</h3></div></div>;
  }

  return (
    <div className="company-dashboard-container">
      {/* SIDEBAR */}
      <aside className="dashboard-sidebar">
        <div className="dashboard-logo">JobConnect</div>
        <nav className="sidebar-nav">
          <button 
            className={`nav-item ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <span className="icon">📊</span> Overview
          </button>
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
            className={`nav-item ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
          >
            <span className="icon">🏢</span> Company Profile
          </button>
        </nav>
      </aside>

      {/* MAIN CONTENT */}
      <main className="dashboard-content">
        <header className="dashboard-header">
          <div>
            <h1>Welcome, {companyName}</h1>
            <p>Here is what's happening with your job postings today.</p>
          </div>
          <button className="logout-btn" onClick={handleLogout}>Log Out</button>
        </header>

        {/* OVERVIEW TAB */}
        {activeTab === 'overview' && (
          <div>
            <div className="analytics-grid">
              <div className="stat-card">
                <div className="stat-icon">💼</div>
                <div className="stat-info">
                  <h3>Active Jobs</h3>
                  <p>{jobs.length}</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">👥</div>
                <div className="stat-info">
                  <h3>Total Candidates</h3>
                  <p>{applications.length}</p>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">✨</div>
                <div className="stat-info">
                  <h3>Shortlisted</h3>
                  <p>{applications.filter(a => a.status === 'Shortlisted').length}</p>
                </div>
              </div>
            </div>
            
            <div className="applications-view" style={{ padding: '2rem' }}>
              <h2>Recent Activity</h2>
              {applications.length > 0 ? (
                <p style={{ marginTop: '1rem', color: 'var(--color-text-subtle)' }}>
                  You recently received an application from <strong>{applications[0].firstName} {applications[0].lastName}</strong> for <strong>{applications[0].jobTitle}</strong>.
                </p>
              ) : (
                <p style={{ marginTop: '1rem', color: 'var(--color-text-subtle)' }}>No recent activity to show.</p>
              )}
            </div>
          </div>
        )}

        {/* JOBS VIEW */}
        {activeTab === 'jobs' && !selectedJob && (
          <div className="jobs-grid">
            {jobs.length === 0 ? (
              <div className="empty-state" style={{ gridColumn: '1 / -1' }}>
                <h3>No jobs posted yet.</h3>
                <p>Use the API to post your first job to start receiving candidates!</p>
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
                        {new Date(job.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

        {/* CANDIDATES VIEW */}
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
                  <th>Role / Job</th>
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
                    <td>
                      <div className="applicant-info">
                        <span className="applicant-name">{app.jobTitle}</span>
                        <span className="applicant-email">{app.experience} exp</span>
                      </div>
                    </td>
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
                        <p>No candidates found yet.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* COMPANY PROFILE */}
        {activeTab === 'profile' && (
          <div className="profile-view">
            <h2>Company Profile Settings</h2>
            <p style={{ color: 'var(--color-text-subtle)', marginBottom: '2rem' }}>Update your company details visible to job seekers.</p>
            
            <form onSubmit={(e) => { e.preventDefault(); alert('Profile updated successfully!'); }}>
              <div className="profile-group">
                <label>Company Name</label>
                <input 
                  type="text" 
                  value={profile.companyName} 
                  onChange={(e) => setProfile({...profile, companyName: e.target.value})} 
                />
              </div>
              <div className="profile-group">
                <label>Website</label>
                <input 
                  type="url" 
                  value={profile.website} 
                  onChange={(e) => setProfile({...profile, website: e.target.value})} 
                />
              </div>
              <div className="profile-group">
                <label>Industry</label>
                <input 
                  type="text" 
                  value={profile.industry} 
                  onChange={(e) => setProfile({...profile, industry: e.target.value})} 
                />
              </div>
              <div className="profile-group">
                <label>About Company</label>
                <textarea 
                  rows="4"
                  value={profile.description} 
                  onChange={(e) => setProfile({...profile, description: e.target.value})} 
                ></textarea>
              </div>
              <button type="submit" className="btn-save">Save Profile</button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
};

export default CompanyDashboard;
