import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import AuthPage from './pages/auth/AuthPage';
import Home from './pages/homepage/home';
import JobDetails from './pages/homepage/JobDetails';
import JobApply from './pages/homepage/JobApply';
import FindJobs from './pages/homepage/FindJobs';
import AppliedJobs from './pages/homepage/AppliedJobs';
import PostJob from './pages/homepage/PostJob';
import CompanyDashboard from './pages/company/CompanyDashboard';

import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<AuthPage mode="login" />} />
        <Route path="/signup" element={<AuthPage mode="signup" />} />
        <Route path="/jobs" element={<FindJobs />} />
        <Route path="/post-job" element={<PostJob />} />
        <Route path="/job/:id" element={<JobDetails />} />
        <Route path="/job/:id/apply" element={<JobApply />} />
        <Route path="/applied-jobs" element={<AppliedJobs />} />
        <Route path="/company/dashboard" element={<CompanyDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
