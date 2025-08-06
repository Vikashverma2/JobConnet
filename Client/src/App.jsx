import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Navbar from './components/Navbar';
import Login from './pages/auth/LoginPage';
import Signup from './pages/auth/SignUP';
import Home from './pages/homepage/home';
import JobDetails from './pages/homepage/JobDetails';
import AppliedJobs from './pages/homepage/AppliedJobs';
import PostJob from './pages/homepage/JobList';
// import { AuthProvider } from './context/AuthContext';
import './App.css'

function App() {
  return (
    <Router>
      {/* <Navbar /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/job/:id" element={<JobDetails />} />
        <Route path="/applied-jobs" element={<AppliedJobs />} />
        <Route path="/post-job" element={<PostJob />} />
      </Routes>
    </Router>
  );
}

export default App;
