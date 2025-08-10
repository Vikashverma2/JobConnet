import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import AuthPage from './pages/auth/AuthPage';
import Home from './pages/homepage/home';
import JobDetails from './pages/homepage/JobDetails';
// import AppliedJobs from './pages/homepage/AppliedJobs';
import PostJob from './pages/homepage/JobList';

import './App.css'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<AuthPage mode="login" />} />
        <Route path="/signup" element={<AuthPage mode="signup" />} />
        <Route path="/job/:id" element={<JobDetails />} />
        {/* <Route path="/applied-jobs" element={<AppliedJobs />} /> */}
        <Route path="/post-job" element={<PostJob />} />
      </Routes>
    </Router>
  );
}

export default App;
