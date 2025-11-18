import React from "react";
import { GoogleMap, Circle, useJsApiLoader } from "@react-google-maps/api";
import { useLocation, useNavigate } from "react-router-dom";

const containerStyle = {
  width: "100%",
  height: "calc(100vh - 80px)", 
};

const FullMap = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: 'AIzaSyAvClaMRLkyDOWVwisn2zJLvNzaoJtSiT0',
  });

  const location = useLocation();
  const navigate = useNavigate();

  const { lat = 28.6139, lng = 77.2090 } = location.state || {};

  if (!isLoaded) return null;

  return (
    <div className="p-2 bg-gray-40 min-h-screen">
      <button
        onClick={() => navigate("/dashboard")}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700"
      >
        ← Back
      </button>

      <GoogleMap
        mapContainerStyle={containerStyle}
        center={{ lat, lng }}
        zoom={10}
      >
        {/* Red Circle */}
        <Circle
          center={{ lat, lng }}
          radius={5000} // 5km
          options={{
            fillColor: "#f08080",
            fillOpacity: 0.3,
            strokeColor: "red",
            strokeOpacity: 0.8,
            strokeWeight: 2,
          }}
        />
      </GoogleMap>

      {/* Coordinate Display */}
      <div
      style={{
        position: "absolute",
        bottom: 10,
        right: 10,    // ⬅️ changed from left: 10
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        padding: "6px 10px",
        borderRadius: "6px",
        fontSize: "12px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
      }}
      >
        Lat: {lat.toFixed(4)} | Lng: {lng.toFixed(4)}
      </div>
    </div>
  );
};

export default FullMap;