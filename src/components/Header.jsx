// Header.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

export default function Header() {
  const navigate = useNavigate();
  return (
    <header className="bg-light text-dark py-3 border-bottom">
        <div className="container-fluid px-4 d-flex justify-content-between align-items-center">
          <h3 className="fw-bold mb-0">Cafe <span style={{ fontWeight: 400 }}>Reservation</span></h3>
          <ul className="nav mb-0 d-none d-md-flex">
            <li><a href="#" className="nav-link px-3 text-dark">Home</a></li>
            <li className="nav-item dropdown">
              <span className="nav-link px-3 text-dark dropdown-toggle" style={{ cursor: 'pointer' }}>
                Cafe
              </span>
              <ul className="dropdown-menu">
                <li>
                  <span
                    onClick={() => navigate('/map')}
                    className="dropdown-item"
                  >지도</span>
                </li>
                <li><a href="#" className="dropdown-item">카페 목록</a></li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <span className="nav-link px-3 text-dark dropdown-toggle" style={{ cursor: 'pointer' }}>
                머적지?
              </span>
              <ul className="dropdown-menu">
                <li><a href="#" className="dropdown-item">사용 방법</a></li>
                <li><a href="#" className="dropdown-item">자주 묻는 질문</a></li>
              </ul>
            </li>
          </ul>
          <div className="d-flex align-items-center btn-wrapper">
            <button className="btn btn-sm login-btn" onClick={() => navigate('/login')}>로그인</button>
            <button className="btn btn-sm signup-btn" onClick={() => navigate('/signup')}>회원가입</button>
          </div>
        </div>
      </header>
  );

  
}