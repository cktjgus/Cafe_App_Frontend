import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import './SeatList.css';

function SeatList() {
  const [seats, setSeats] = useState([]);
  const timerRef = useRef(null);

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

  // 마운트 시 실행
  useEffect(() => {
    loadSeats();

    timerRef.current = setInterval(() => {
      setSeats((prevSeats) =>
        prevSeats.map((seat) => {
          if (seat.isReserved && seat.endTime) {
            const now = new Date();
            const end = new Date(seat.endTime);
            if (end <= now) {
              return { ...seat, isReserved: false, endTime: null };
            }
          }
          return seat;
        })
      );
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, []);

  // 예약
  const handleReserve = (id) => {
    axios.post(`http://localhost:8080/api/seats/${id}/reserve`)
      .then(() => {
        alert('2시간 예약 완료!');
        loadSeats();
      })
      .catch(() => alert('예약 실패 😥'));
  };

  // 예약 취소
  const handleCancel = (id) => {
    axios.post(`http://localhost:8080/api/seats/${id}/cancel`)
      .then(() => {
        alert('예약 취소됨!');
        loadSeats();
      })
      .catch(() => alert('예약 취소 실패 😥'));
  };

  // 남은 시간 표시
  const getRemainingTime = (endTime) => {
    const now = new Date();
    const end = new Date(endTime);
    const diff = Math.max(0, Math.floor((end - now) / 1000));
    const hours = Math.floor(diff / 3600);
    const minutes = Math.floor((diff % 3600) / 60);
    const seconds = diff % 60;
    return `${hours}시간 ${minutes}분 ${seconds}초`;
  };

  return (
    <div className="container">
      <h2>좌석 예약 시스템</h2>
      <div className="seat-grid">
        {seats.map(seat => (
          <div
            key={seat.id}
            className={`seat ${seat.isReserved ? 'reserved' : 'available'}`}
          >
            <div className="seat-number">{seat.seatNumber}</div>
            {seat.isReserved && seat.endTime && (
              <div className="seat-time">
                남은 시간: {getRemainingTime(seat.endTime)}
              </div>
            )}
            <button
              className="seat-button"
              onClick={() =>
                seat.isReserved ? handleCancel(seat.id) : handleReserve(seat.id)
              }
            >
              {seat.isReserved ? '취소' : '예약'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SeatList;
