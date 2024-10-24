import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css'

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    // Here, handle your signup logic (e.g., API call)
    
    // For demonstration, we'll just log the data and redirect
    console.log('Signup:', { username, email, password });
    
    // Redirect to login page after signup
    navigate('/');
  };

  return (
    <div className="signup-container">
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.v1alue)}
          required
        />
        <button type="submit" className='signup'>Sign Up</button>
      </form>
      <div className='login'>
        <span>Already have an account? </span>
        <a onClick={() => navigate('/')}>Log in</a>
      </div>
    </div>
  );
};

export default Signup;
