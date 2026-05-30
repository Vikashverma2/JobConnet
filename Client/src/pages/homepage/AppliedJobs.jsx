import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { apiGetMyApplications } from '../../api/api';
import Navbar from '../../components/Navbar';
import './AppliedJobs.css';

function AppliedJobs() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const stored = localStorage.getItem("jc_user");
        if (!stored) {
          setError("You must be logged in to view your applied jobs.");
          setLoading(false);
          return;
        }
        
        const user = JSON.parse(stored);
        const data = await apiGetMyApplications(user.id);
        setApplications(data);
      } catch (err) {
        setError(err.message || "Failed to load applied jobs.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchApplications();
  }, []);

  const getStatusBadgeClass = (status) => {
    switch (status?.toLowerCase()) {
      case 'reviewed': return 'status-reviewed';
      case 'shortlisted': return 'status-shortlisted';
      case 'rejected': return 'status-rejected';
      default: return 'status-applied';
    }
  };

  return (
    <div className="applied-jobs-page">
      <Navbar />
      <div className="container applied-jobs-container">
        <div className="applied-jobs-header">
          <h2>My Applications</h2>
          <p>Track the progress of your job applications</p>
        </div>

        {loading ? (
          <div className="loading-spinner"></div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : applications.length === 0 ? (
          <div className="no-applications">
            <div className="no-app-icon">📁</div>
            <h3>No Applications Yet</h3>
            <p>You haven't applied for any jobs yet. Start exploring and take the next step in your career!</p>
            <Link to="/jobs" className="btn btn-primary">Find Jobs</Link>
          </div>
        ) : (
          <div className="applied-jobs-grid">
            {applications.map(app => (
              <div key={app.id} className="applied-job-card">
                <div className="app-card-header">
                  <div className="app-company-info">
                    <h3>{app.jobTitle}</h3>
                    <p className="app-company">{app.jobCompany}</p>
                  </div>
                  <span className={`status-badge ${getStatusBadgeClass(app.status)}`}>
                    {app.status || 'Applied'}
                  </span>
                </div>
                
                <div className="app-card-body">
                  <div className="app-detail">
                    <span className="app-detail-icon">📅</span>
                    <span className="app-detail-text">Applied on {new Date(app.appliedAt).toLocaleDateString()}</span>
                  </div>
                  {/* Progress Bar Visual */}
                  <div className="app-progress-container">
                    <div className="app-progress-labels">
                      <span className={['Applied', 'Reviewed', 'Shortlisted'].includes(app.status) || app.status === 'Rejected' ? 'active-step' : ''}>Applied</span>
                      <span className={['Reviewed', 'Shortlisted'].includes(app.status) || app.status === 'Rejected' ? 'active-step' : ''}>Reviewed</span>
                      <span className={app.status === 'Shortlisted' ? 'active-step' : ''}>Shortlisted</span>
                    </div>
                    <div className="app-progress-bar">
                      <div className={`app-progress-fill step-${app.status?.toLowerCase() || 'applied'}`}></div>
                    </div>
                  </div>
                </div>
                
                <div className="app-card-footer">
                  <Link to={`/job/${app.jobId}`} className="app-view-job-btn">View Job Details</Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AppliedJobs;