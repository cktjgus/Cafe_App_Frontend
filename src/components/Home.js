import React from 'react';
import { useNavigate } from 'react-router-dom';
import SeatList from './SeatList';

function Home() {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="container-fluid px-0">
      <header className="bg-dark text-white py-3 border-bottom">
        <div className="container-fluid px-4 d-flex justify-content-between align-items-center">

          <div className="fw-bold fs-5 text-white">사이트명</div>

          <div className="d-flex align-items-center" style={{ gap: '8px', height: '38px' }}>
            <div style={{ height: '100%' }}>
              <input
                type="search"
                className="form-control form-control-sm bg-dark text-white border-secondary"
                placeholder="Search..."
                style={{
                  width: "300px",
                  height: '100%',
                }}
                aria-label="Search"
              />
            </div>
            <button
              className="btn btn-outline-light btn-sm"
              style={{ height: '100%', padding: '0 12px', backgroundColor: '#3498db', borderColor: '#3498db'}}
              onClick={goToLogin}
            >
              Login
            </button>
            <button
              className="btn btn-warning btn-sm text-nowrap"
              style={{ height: '100%', padding: '0 12px', backgroundColor: 'white'}}
            >
              Sign-up
            </button>
          </div>
        </div>
      </header>
      <main className="container-fluid mt-4">
        <SeatList />
      </main>
    </div>
  );
}

export default Home;
