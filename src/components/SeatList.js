import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './SeatList.css';  // CSS 파일 꼭 만들 것!

function SeatList() {
  const [seats, setSeats] = useState([]);

  // 좌석 불러오기
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
    loadSeats();  // 처음 실행될 때만 호출
  }, []);

  // 예약하기
  const handleReserve = (id) => {
    axios.post(`http://localhost:8080/api/seats/${id}/reserve`)
      .then(() => {
        alert('예약 성공!');
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

  return (
    <div>
      <h2>좌석 목록</h2>
      <ul className="seat-list">
        {seats.map(seat => (
          <li key={seat.id} className={`seat ${seat.isReserved ? 'reserved' : 'available'}`}>
            좌석 {seat.seatNumber} - {seat.isReserved ? '예약됨' : '비어있음'}
            {seat.isReserved ? (
              <button onClick={() => handleCancel(seat.id)}>예약 취소</button>
            ) : (
              <button onClick={() => handleReserve(seat.id)}>예약</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SeatList;
