import React, { useState } from 'react';
import './Login.css'; // 기존 style 그대로 사용 가능

function SignUpForm() {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [errors, setErrors] = useState({});

  const handleChange = e => {
    const { id, value } = e.target;
    setFormData({ ...formData, [id]: value });
  };

  const showError = (field, message) => {
    setErrors(prev => ({ ...prev, [field]: message }));
  };

  const showSuccess = (field) => {
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const isValidEmail = (email) => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const { username, email, password, password2 } = formData;
    let hasError = false;

    const newErrors = {};

    const checkRequired = (field, value) => {
      if (!value.trim()) {
        newErrors[field] = `${field} is required`;
        hasError = true;
      }
    };

    checkRequired('username', username);
    checkRequired('password', password);

    if (username && (username.length < 6 || username.length > 15)) {
      newErrors.username = 'Username must be 6–15 characters';
      hasError = true;
    }

    if (password && (password.length < 8 || password.length > 20)) {
      newErrors.password = 'Password must be 8–20 characters';
      hasError = true;
    }

    setErrors(newErrors);

    if (!hasError) {
      alert('로그인 성공!');
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form">
        <h2>Login</h2>

        {['username', 'password'].map(field => (
          <div key={field} className={`form-control ${errors[field] ? 'error' : formData[field] ? 'success' : ''}`}>
            <label htmlFor={field}>
              {field === 'password2' ? 'Confirm Password' : field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <input
              type={field.includes('password') ? 'password' : 'text'}
              id={field}
              placeholder={`Enter ${field === 'password2' ? 'password again' : field}`}
              value={formData[field]}
              onChange={handleChange}
            />
            <small>{errors[field]}</small>
          </div>
        ))}
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default SignUpForm;
