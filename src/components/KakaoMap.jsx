import React, { useEffect, useRef, useState } from "react";

const KakaoMap = ({ kakaoKey, level = 3, width = "100%", height = "100vh" }) => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [placesService, setPlacesService] = useState(null);
  const [infowindow, setInfowindow] = useState(null);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    if (!kakaoKey) {
      console.error("카카오 API 키 누락");
      return;
    }

    const script = document.createElement("script");
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoKey}&autoload=false&libraries=services`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      window.kakao.maps.load(() => {
        navigator.geolocation.getCurrentPosition(
          (position) => initMap(position.coords.latitude, position.coords.longitude),
          () => initMap(37.566826, 126.9786567)
        );
      });
    };

    function initMap(lat, lng) {
      if (!mapRef.current) return;

      const kakao = window.kakao;
      const center = new kakao.maps.LatLng(lat, lng);
      const newMap = new kakao.maps.Map(mapRef.current, {
        center,
        level,
      });

      new kakao.maps.Marker({ map: newMap, position: center });

      const ps = new kakao.maps.services.Places(newMap);
      const iw = new kakao.maps.InfoWindow({ zIndex: 1 });

      setMap(newMap);
      setPlacesService(ps);
      setInfowindow(iw);

      // 기본 카페 검색
      ps.categorySearch("CE7", (data, status) => {
        if (status !== kakao.maps.services.Status.OK) return;
        data.forEach((place) => displayMarker(place, newMap, iw));
      }, { useMapBounds: true });
    }

    return () => document.head.removeChild(script);
  }, [kakaoKey, level]);

  const displayMarker = (place, map, infowindow) => {
    const kakao = window.kakao;
    const marker = new kakao.maps.Marker({
      map,
      position: new kakao.maps.LatLng(place.y, place.x),
    });

    kakao.maps.event.addListener(marker, "click", () => {
      infowindow.setContent(`<div style="padding:5px;font-size:12px;">${place.place_name}</div>`);
      infowindow.open(map, marker);
    });
  };

  const handleSearch = () => {
    if (!keyword || !placesService || !map) return;

    placesService.keywordSearch(keyword, (data, status) => {
      if (status !== window.kakao.maps.services.Status.OK) {
        alert("검색 결과가 없습니다.");
        return;
      }

      map.setCenter(new window.kakao.maps.LatLng(data[0].y, data[0].x)); // 첫 장소로 중심 이동
      data.forEach((place) => displayMarker(place, map, infowindow));
    });
  };

  return (
    <div style={{ display: "flex", height }}>
      {/* 검색 영역 */}
      <div style={{ width: "300px", padding: "20px", background: "#f7f7f7", borderRight: "1px solid #ccc" }}>
        <h5>장소 검색</h5>
        <input
          type="text"
          placeholder="검색어 입력"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
        />
        <button className="btn btn-primary w-100" onClick={handleSearch}>
          검색
        </button>
      </div>

      {/* 지도 영역 */}
      <div ref={mapRef} style={{ flex: 1 }} />
    </div>
  );
};

export default KakaoMap;
