import React from 'react';
import { Link } from 'react-router-dom';

function Signup() {
  return (
    <div className="container">
      <h2>Signup</h2>
      <p>Signup functionality can be added here.</p>
      <Link to="/login">Already have an account? Login</Link>
    </div>
  );
}

export default Signup;