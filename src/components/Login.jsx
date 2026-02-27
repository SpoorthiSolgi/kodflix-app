import React, { useState } from 'react';
import { login } from '../services/auth';
import './Auth.css';

const Login = ({ onSwitchToSignup, onLoginSuccess }) => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!formData.username || !formData.password) {
      setError('Username and password are required.');
      return;
    }

    setLoading(true);

    const result = await login({
      username: formData.username,
      password: formData.password
    });

    setLoading(false);

    if (result.success) {
      onLoginSuccess();
    } else {
      setError(result.error);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-background">
        <img
          src="https://assets.nflxext.com/ffe/siteui/vlv3/9c5457b8-9ab0-4a04-9fc1-e608d5670f1a/710d74e0-1bc5-4ce1-843b-6205227d90b6/IN-en-20210719-popsignuptwoweeks-perspective_alpha_website_small.jpg"
          alt="Background"
        />
        <div className="auth-overlay"></div>
      </div>

      <div className="auth-content">
        <div className="auth-logo">
          <div className="auth-logo-text">KODFLIX</div>
        </div>

        <div className="auth-form-container">
          <h1>Sign In</h1>

          {error && <div className="auth-error">{error}</div>}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="auth-input-group">
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>

            <div className="auth-input-group">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className="auth-button"
              disabled={loading}
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>

            <div className="auth-help">
              <label className="auth-remember">
                <input type="checkbox" defaultChecked />
                <span>Remember me</span>
              </label>
              <span className="auth-help-link">Need help?</span>
            </div>
          </form>

          <div className="auth-footer">
            <p>
              New to Kodflix?{' '}
              <span className="auth-link" onClick={onSwitchToSignup}>
                Sign up now
              </span>
            </p>
            <p className="auth-recaptcha">
              This page is protected by Google reCAPTCHA to ensure you're not a bot.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
