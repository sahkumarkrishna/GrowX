// components/GrowXLogo.jsx
import React from "react";

const GrowXLogo = ({ size = 40 }) => {
  return (
    <div className="flex items-center gap-2">
      {/* Arrow Icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
      >
        <polyline
          points="10,90 30,60 50,70 70,40"
          fill="none"
          stroke="#1E40AF"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="10" cy="90" r="5" fill="#1E40AF" />
        <circle cx="30" cy="60" r="5" fill="#1E40AF" />
        <circle cx="50" cy="70" r="5" fill="#1E40AF" />
        <circle cx="70" cy="40" r="5" fill="#1E40AF" />
        <polygon points="70,40 90,20 80,50" fill="#22C55E" />
      </svg>

      {/* Logo Text */}
      <span className="text-2xl font-bold">
        <span className="text-blue-700">Grow</span>
        <span className="text-green-500">X</span>
      </span>
    </div>
  );
};

export default GrowXLogo;
