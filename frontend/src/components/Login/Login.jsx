import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = ({ onLogin }) => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(); 
    navigate('/home');
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          className='username'
          required
          aria-label="Username"
        />
        <input
          type="password"
          placeholder="Password"
          className='password'
          required
          aria-label="Password"
        />
        <button type="submit" className='login'>Login</button>
      </form>
      <div className='signup'>
        <span>Don't have an account? </span>
        <a onClick={() => navigate('/signup')}>Sign up</a>
      </div>
    </div>
  );
};

export default Login;
