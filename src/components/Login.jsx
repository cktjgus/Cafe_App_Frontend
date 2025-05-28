import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css';

function Login() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({});
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = e => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const { username, password } = formData;
    const newErrors = {};

    if (!username) newErrors.username = 'Username is required';
    if (!password) newErrors.password = 'Password is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      login(); // 로그인 상태 변경
      navigate('/'); // 홈으로 이동
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form">
        <h2>Login</h2>
        <div className={`form-control ${errors.username ? 'error' : ''}`}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter username"
          />
          <small>{errors.username}</small>
        </div>
        <div className={`form-control ${errors.password ? 'error' : ''}`}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
          />
          <small>{errors.password}</small>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
