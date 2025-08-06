import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import { useAuth } from '../context/AuthContext';

function Login() {
  const [name, setName] = useState('');
  const [role, setRole] = useState('seeker');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    login({ name, role });
    navigate('/');
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input type="text" placeholder="Your Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="seeker">Job Seeker</option>
          <option value="hirer">Job Hirer</option>
        </select>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;