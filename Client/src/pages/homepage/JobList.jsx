import React from 'react';
import { useNavigate } from 'react-router-dom';

const jobsData = [
  {
    id: '1',
    title: 'Frontend Developer',
    company: 'TCS',
    location: 'Bengaluru, Karnataka',
    type: 'Full-time',
    salary: '₹8,00,000 - ₹12,00,000',
    description: 'Develop interactive user interfaces using React.js...',
  },
  {
    id: '2',
    title: 'Backend Developer',
    company: 'Infosys',
    location: 'Hyderabad, Telangana',
    type: 'Full-time',
    salary: '₹10,00,000 - ₹14,00,000',
    description: 'Create scalable backend services using Node.js and Express...',
  },
  {
    id: '3',
    title: 'UI/UX Designer',
    company: 'Zoho Corp',
    location: 'Chennai, Tamil Nadu',
    type: 'Full-time',
    salary: '₹6,00,000 - ₹9,00,000',
    description: 'Design intuitive UI layouts and conduct user testing...',
  },
  {
    id: '4',
    title: 'Software Tester',
    company: 'Wipro',
    location: 'Pune, Maharashtra',
    type: 'Contract',
    salary: '₹4,00,000 - ₹7,00,000',
    description: 'Test and ensure the quality of enterprise web applications...',
  },
  {
    id: '5',
    title: 'Data Analyst',
    company: 'Mu Sigma',
    location: 'Bengaluru, Karnataka',
    type: 'Full-time',
    salary: '₹5,00,000 - ₹8,00,000',
    description: 'Analyze business data and generate actionable insights...',
  },
  {
    id: '6',
    title: 'DevOps Engineer',
    company: 'Tech Mahindra',
    location: 'Noida, Uttar Pradesh',
    type: 'Full-time',
    salary: '₹10,00,000 - ₹15,00,000',
    description: 'Manage CI/CD pipelines and cloud infrastructure...',
  },
  {
    id: '7',
    title: 'Cloud Architect',
    company: 'Amazon AWS India',
    location: 'Hyderabad, Telangana',
    type: 'Full-time',
    salary: '₹20,00,000 - ₹30,00,000',
    description: 'Architect scalable cloud solutions using AWS services...',
  },
  {
    id: '8',
    title: 'Machine Learning Engineer',
    company: 'Google India',
    location: 'Bengaluru, Karnataka',
    type: 'Full-time',
    salary: '₹18,00,000 - ₹28,00,000',
    description: 'Build and deploy ML models for real-world applications...',
  },
  {
    id: '9',
    title: 'Support Engineer',
    company: 'Freshworks',
    location: 'Chennai, Tamil Nadu',
    type: 'Part-time',
    salary: '₹20,000 - ₹30,000/month',
    description: 'Provide technical support for SaaS products...',
  },
  {
    id: '10',
    title: 'Digital Marketing Executive',
    company: 'DigiMark Agency',
    location: 'Mumbai, Maharashtra',
    type: 'Full-time',
    salary: '₹4,00,000 - ₹6,00,000',
    description: 'Plan and execute digital campaigns across platforms...',
  }
];

function JobList() {
  const navigate = useNavigate();

  const handleApply = (id) => {
    const applied = JSON.parse(localStorage.getItem('appliedJobs')) || [];
    if (!applied.includes(id)) {
      applied.push(id);
      localStorage.setItem('appliedJobs', JSON.stringify(applied));
    }
    navigate('/applied-jobs');
  };

  return (
    <section className="job-list-section">
      <h2 className="job-list-title">Featured Job Listings</h2>
      <div className="job-list-grid">
        {jobsData.map((job) => (
          <div className="job-card" key={job.id}>
            <h3>{job.title}</h3>
            <p className="company-name">{job.company}</p>
            <div className="job-tags">
              <span>📍 {job.location}</span>
              <span>🕒 {job.type}</span>
              <span>💰 {job.salary}</span>
            </div>
            <p className="job-description">{job.description}</p>
            <div className="job-actions">
              <button onClick={() => navigate(`/job/${job.id}`)} className="btn-details">View Details</button>
              <button onClick={() => handleApply(job.id)} className="btn-apply">Apply Now</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default JobList;
