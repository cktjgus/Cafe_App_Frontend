import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="container-fluid px-0">
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
