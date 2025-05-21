import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="container-fluid px-0">
      <header className="bg-light text-dark py-3 border-bottom">
        <div className="container-fluid px-4 d-flex justify-content-between align-items-center">
          <h3 className="fw-bold mb-0">Cafe <span style={{ fontWeight: 400 }}>Reservation</span></h3>

          <ul className="nav mb-0 d-none d-md-flex">
            <li><a href="#" className="nav-link px-3 text-dark">Home</a></li>
            <li className="nav-item dropdown">
              <a href="#" className="nav-link px-3 text-dark dropdown-toggle">
                Cafe
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a
                    onClick={() => navigate('/map')}
                    className="dropdown-item"
                    style={{ cursor: 'pointer' }}
                  >지도</a></li>
                <li><a href="#" className="dropdown-item">카페 목록</a></li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <a href="#" className="nav-link px-3 text-dark dropdown-toggle">
                머적지?
              </a>
              <ul className="dropdown-menu">
                <li><a href="#" className="dropdown-item">사용 방법</a></li>
                <li><a href="#" className="dropdown-item">자주 묻는 질문</a></li>
              </ul>
            </li>
          </ul>

          <div className="d-flex align-items-center btn-wrapper">
            <button
              className="btn btn-sm login-btn"
              onClick={() => navigate('/login')}
            >
              로그인
            </button>
            <button
              className="btn btn-sm signup-btn"
            >
              회원가입
            </button>
          </div>
        </div>
      </header>

      <main className="home-container">
        <div className="gray-banner">
          <div className="search-card">
            <input
              type="text"
              className="form-control form-control-lg search-input"
              placeholder="카페 찾아보기..."
            />

            <div className="search-button-wrapper">
              <button className="btn search-btn">검색하기</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home;
