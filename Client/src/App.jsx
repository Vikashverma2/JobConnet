import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import AuthPage from './pages/auth/AuthPage';
import Home from './pages/homepage/home';
import JobDetails from './pages/homepage/JobDetails';
import JobApply from './pages/homepage/JobApply';
import FindJobs from './pages/homepage/FindJobs';
import AppliedJobs from './pages/homepage/AppliedJobs';
import CompanyDashboard from './pages/company/CompanyDashboard';
import RoleGuard from './components/RoleGuard';

import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RoleGuard allowedRole="seeker"><Home /></RoleGuard>} />
        <Route path="/login" element={<AuthPage mode="login" />} />
        <Route path="/signup" element={<AuthPage mode="signup" />} />
        <Route path="/jobs" element={<RoleGuard allowedRole="seeker"><FindJobs /></RoleGuard>} />
        <Route path="/job/:id" element={<RoleGuard allowedRole="seeker"><JobDetails /></RoleGuard>} />
        <Route path="/job/:id/apply" element={<RoleGuard allowedRole="seeker"><JobApply /></RoleGuard>} />
        <Route path="/applied-jobs" element={<RoleGuard allowedRole="seeker"><AppliedJobs /></RoleGuard>} />
        <Route path="/company/dashboard" element={<RoleGuard allowedRole="company"><CompanyDashboard /></RoleGuard>} />
      </Routes>
    </Router>
  );
}

export default App;
