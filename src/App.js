import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import KakaoMap from './components/KakaoMap';
import Header from './components/Header';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/map"
          element={
            <div style={{ width: '100vw', height: '100vh' }}>
              <KakaoMap
                kakaoKey={process.env.REACT_APP_KAKAO_KEY}
                width="100%"
                height="100%"
                level={4}
              />
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
