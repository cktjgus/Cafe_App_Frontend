import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Login.css';

function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password2: '',
  });

  const [errors, setErrors] = useState({});
  const { login } = useAuth();
  const navigate = useNavigate();
  
  const isValidPhone = (phone) => /^010\d{8}$/.test(phone.trim());

  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validateField = (id, value, allData = formData) => {
    const error = {};
    switch (id) {
      case 'username':
        if (!value.trim()) error.username = '전화번호를 입력하세요';
        else if (!isValidPhone(value)) error.username = '올바른 전화번호 형식이 아닙니다';
        break;
      case 'email':
        if (!value.trim()) error.email = '이메일을 입력하세요';
        else if (!isValidEmail(value)) error.email = '올바른 이메일 형식이 아닙니다';
        break;
      case 'password':
        if (!value) error.password = '비밀번호를 입력하세요';
        else if (value.length < 8) error.password = '비밀번호는 최소 8자 이상이어야 합니다';
        if (allData.password2 && value !== allData.password2)
          error.password2 = '비밀번호가 일치하지 않습니다';
        break;
      case 'password2':
        if (!value) error.password2 = '비밀번호 확인이 필요합니다';
        else if (value !== allData.password)
          error.password2 = '비밀번호가 일치하지 않습니다';
        break;
      default:
        break;
    }
    return error;
  };

  const validateAll = (data) => {
    const allErrors = {};
    Object.keys(data).forEach((key) => {
      const fieldErrors = validateField(key, data[key], data);
      Object.assign(allErrors, fieldErrors);
    });
    return allErrors;
  };

  const handleChange = (e) => {
  const { id, value } = e.target;
  const newData = { ...formData, [id]: value };
  setFormData(newData);

  const newFieldErrors = validateField(id, value, newData);

  const updatedErrors = { ...errors };
  delete updatedErrors[id];
  if (newFieldErrors[id]) updatedErrors[id] = newFieldErrors[id];
  if (id === 'password' || id === 'password2') {
    delete updatedErrors['password2'];
    if (newFieldErrors['password2']) updatedErrors['password2'] = newFieldErrors['password2'];
  }
  setErrors(updatedErrors);
};


  const handleSubmit = (e) => {
    e.preventDefault();
    const allErrors = validateAll(formData);
    if (Object.keys(allErrors).length > 0) {
      setErrors(allErrors);
    } else {
      login();
      navigate('/');
    }
  };

  const fields = [
    {
      id: 'username',
      type: 'text',
      placeholder: '전화번호를 입력하세요...',
    },
    {
      id: 'email',
      type: 'text',
      placeholder: '이메일을 입력하세요...',
    },
    {
      id: 'password',
      type: 'password',
      placeholder: '비밀번호를 입력하세요...',
    },
    {
      id: 'password2',
      type: 'password',
      placeholder: '비밀번호를 다시 입력하세요...',
    },
  ];

  return (
    <div className="login-wrapper">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>회원가입</h2>
        {fields.map(({ id, type, placeholder }) => (
          <div key={id}>
            <div className="input-box">
              <input
                type={type}
                id={id}
                placeholder={placeholder}
                value={formData[id]}
                onChange={handleChange}
                autoComplete="off"
              />
            </div>
            {errors[id] && (
              <small className="error-text">{errors[id]}</small>
            )}
          </div>
        ))}
        <button className="login-button" type="submit">
          회원가입
        </button>
      </form>
    </div>
  );
}

export default Signup;
