import React, { useEffect, useRef } from "react";

const KakaoMap = ({
  level = 3,
  width = "100%",
  height = "400px",
  defaultLat = 33.450701,
  defaultLng = 126.570667,
  kakaoKey = "YOUR_JS_KEY"
}) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!kakaoKey) return;
    const script = document.createElement("script");
    script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoKey}&autoload=false`;
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      if (window.kakao && window.kakao.maps) {
        window.kakao.maps.load(() => {
          navigator.geolocation.getCurrentPosition(
            ({ coords }) => initMap(coords.latitude, coords.longitude),
            () => initMap(defaultLat, defaultLng)
          );
        });
      }
    };

    function initMap(lat, lng) {
      if (!mapRef.current) return;
      const options = {
        center: new window.kakao.maps.LatLng(lat, lng),
        level,
      };
      const map = new window.kakao.maps.Map(mapRef.current, options);
      new window.kakao.maps.Marker({
        position: new window.kakao.maps.LatLng(lat, lng),
        map,
      });
    }

    return () => {
      document.head.removeChild(script);
    };
  }, [kakaoKey, level, defaultLat, defaultLng]);

  return (
    <div
      ref={mapRef}
      style={{ width, height, margin: "0 auto" }}
    />
  );
};

export default KakaoMap;
