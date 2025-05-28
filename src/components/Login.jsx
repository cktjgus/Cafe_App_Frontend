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
      login();
      navigate('/');
    }
  };

  return (
    <div className="login-wrapper">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>로그인</h2>

        <div className="input-box">
          <input
            type="text"
            id="username"
            placeholder="아이디를 입력하세요..."
            value={formData.username}
            onChange={handleChange}
          />
        </div>

        <div className="input-box">
          <input
            type="password"
            id="password"
            placeholder="비밀번호를 입력하세요..."
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <button className="login-button" type="submit">로그인</button>

        <div className="login-links">
          <span onClick={() => navigate('/Signup')}>회원가입</span>
        </div>
      </form>
    </div>
  );
}

export default Login;