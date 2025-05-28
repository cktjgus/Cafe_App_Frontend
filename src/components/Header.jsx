import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Home.css';

function Header() {
  const navigate = useNavigate();
  const { isLoggedIn, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <header className="bg-light text-dark py-3 border-bottom">
      <div className="container-fluid px-4 d-flex justify-content-between align-items-center">
        {/* 좌측: 로고 + 메뉴 */}
        <div className="d-flex align-items-center" style={{ gap: '24px' }}>
          <h3
            className="fw-bold mb-0"
            style={{ cursor: 'pointer' }}
            onClick={() => navigate('/')}
          >
            Cafe <span style={{ fontWeight: 400 }}>Reservation</span>
          </h3>

          <ul className="nav mb-0 d-none d-md-flex">
            <li><a className="nav-link px-3 text-dark" onClick={() => navigate('/')}>Home</a></li>
            <li className="nav-item dropdown">
              <a className="nav-link px-3 text-dark dropdown-toggle">Cafe</a>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" onClick={() => navigate('/map')}>지도</a></li>
                <li><a className="dropdown-item">카페 목록</a></li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a className="nav-link px-3 text-dark dropdown-toggle">머적지?</a>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item">사용 방법</a></li>
                <li><a className="dropdown-item">자주 묻는 질문</a></li>
              </ul>
            </li>
          </ul>
        </div>

        {/* 우측: 로그인/프로필 */}
        {isLoggedIn ? (
          <div
            className="position-relative"
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
            style={{ cursor: 'pointer' }}
          >
            <img
              src="/profile.png"
              alt="프로필"
              style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                objectFit: 'cover',
              }}
              title="프로필"
            />
            {showDropdown && (
              <ul
                className="dropdown-menu show"
                style={{
                  position: 'absolute',
                  top: '120%',
                  right: 0,
                  display: 'block',
                }}
              >
                <li>
                  <a className="dropdown-item" onClick={() => navigate('/dashboard')}>
                    대시보드
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" onClick={logout}>
                    로그아웃
                  </a>
                </li>
              </ul>
            )}
          </div>
        ) : (
          <button
            className="login-btn"
            onClick={() => navigate('/login')}
          >
            로그인
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;
