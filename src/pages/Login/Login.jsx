import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import './Login.css';

const Login = () => {
  const { login, error } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate network delay
    await new Promise(r => setTimeout(r, 600));
    login(email, password);
    setIsLoading(false);
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <div className="ms-logo">
            <svg viewBox="0 0 23 23" width="21" height="21">
              <rect x="1" y="1" width="10" height="10" fill="#f25022" />
              <rect x="12" y="1" width="10" height="10" fill="#7fba00" />
              <rect x="1" y="12" width="10" height="10" fill="#00a4ef" />
              <rect x="12" y="12" width="10" height="10" fill="#ffb900" />
            </svg>
          </div>
          <h1 className="login-title">Microsoft</h1>
        </div>

        <h2 className="login-subtitle">Sign in</h2>
        <p className="login-hint">Use a demo account to sign in</p>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="input-group">
            <FiMail className="input-icon" />
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              aria-label="Email address"
            />
          </div>

          <div className="input-group">
            <FiLock className="input-icon" />
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              aria-label="Password"
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>

          {error && <div className="login-error" role="alert">{error}</div>}

          <button
            type="submit"
            className="login-btn"
            disabled={isLoading || !email || !password}
          >
            {isLoading ? (
              <span className="login-spinner" />
            ) : (
              'Sign in'
            )}
          </button>
        </form>

        <div className="login-demo-accounts">
          <p className="demo-label">Demo accounts:</p>
          <div className="demo-chips">
            <button
              type="button"
              className="demo-chip"
              onClick={() => { setEmail('alex@outlook.com'); setPassword('123456'); }}
            >
              alex@outlook.com
            </button>
            <button
              type="button"
              className="demo-chip"
              onClick={() => { setEmail('sarah@outlook.com'); setPassword('123456'); }}
            >
              sarah@outlook.com
            </button>
            <button
              type="button"
              className="demo-chip"
              onClick={() => { setEmail('admin@outlook.com'); setPassword('admin'); }}
            >
              admin@outlook.com
            </button>
          </div>
        </div>

        <div className="login-footer">
          <a href="#" onClick={(e) => e.preventDefault()}>Can&apos;t access your account?</a>
          <a href="#" onClick={(e) => e.preventDefault()}>Sign-in options</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
