import React from "react";
import { useNavigate } from "react-router-dom";
import "./CafeList.css";

const cafes = [
  {
    id: 1,
    title: "커피 한 잔",
    description: "조용하고 아늑한 분위기의 카페입니다.",
    link: "#",
  },
  {
    id: 2,
    title: "모던 카페",
    description: "모던한 인테리어와 다양한 메뉴를 제공합니다.",
    link: "#",
  },
  {
    id: 3,
    title: "원두 카페",
    description: "신선한 원두로 내리는 커피가 일품입니다.",
    link: "#",
  },
];

function CafeList() {
  const navigate = useNavigate();
  return (
    <div className="cafe-list">
      {cafes.map((cafe) => (
        <div key={cafe.id} className="card">
          <div className="card-img-top" aria-label={cafe.title} />
          <div className="card-body">
            <h5 className="card-title">{cafe.title}</h5>
            <p className="card-text">{cafe.description}</p>
            <button
              className="btn btn-primary"
              onClick={() => navigate("/seats")}
            >
              좌석 예약하기
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CafeList;
