import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './SeatList.css';

function SeatList() {
  const [seats, setSeats] = useState([]);

  // 좌석 목록 불러오기
  const loadSeats = () => {
    axios.get('http://localhost:8080/api/seats')
      .then(res => {
        setSeats(res.data);
      })
      .catch(err => {
        console.error('좌석 불러오기 실패:', err);
      });
  };

  useEffect(() => {
    loadSeats();

    // ✅ 5초마다 서버 상태 동기화
    const syncInterval = setInterval(loadSeats, 5000);

    // ✅ 1초마다 강제로 리렌더링 (남은 시간 계산용)
    const renderInterval = setInterval(() => {
      setSeats(prev => [...prev]); // 객체 shallow copy로 리렌더링 트리거
    }, 1000);

    return () => {
      clearInterval(syncInterval);
      clearInterval(renderInterval);
    };
  }, []);

  const handleReserve = (id) => {
    axios.post(`http://localhost:8080/api/seats/${id}/reserve`)
      .then(() => {
        alert('2시간 예약 완료!');
        loadSeats();
      })
      .catch(() => alert('예약 실패 😥'));
  };

  const handleCancel = (id) => {
    axios.post(`http://localhost:8080/api/seats/${id}/cancel`)
      .then(() => {
        alert('예약 취소됨!');
        loadSeats();
      })
      .catch(() => alert('예약 취소 실패 😥'));
  };

  const getRemainingTime = (reservedAt) => {
    if (!reservedAt) return null;
    const end = new Date(new Date(reservedAt).getTime() + 2 * 60 * 60 * 1000);
    const now = new Date();
    const diff = Math.max(0, Math.floor((end - now) / 1000));
    const hours = Math.floor(diff / 3600);
    const minutes = Math.floor((diff % 3600) / 60);
    const seconds = diff % 60;
    return `${hours}시간 ${minutes}분 ${seconds}초`;
  };

  return (
    <div className="container">
      <h2 className="system-title">좌석 예약 시스템</h2>
      <div className="seat-grid">
        {seats.map(seat => (
          <div
            key={seat.id}
            className={`seat ${seat.reserved ? 'reserved' : 'available'}`}
          >
            <div className="seat-number">{seat.seatNumber}</div>
            {seat.reserved && seat.reservedAt && (
              <div className="seat-time">
                남은 시간: {getRemainingTime(seat.reservedAt)}
              </div>
            )}
            <button
              className="seat-button"
              onClick={() =>
                seat.reserved ? handleCancel(seat.id) : handleReserve(seat.id)
              }
            >
              {seat.reserved ? '취소' : '예약'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SeatList;
