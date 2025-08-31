import React from "react";
import msmelogo from "../../assets/MSME.png";
import signature from "../../assets/sign.jpg";
import { HiOutlineMail, HiOutlineGlobeAlt } from "react-icons/hi";

// Simplified ExploreX Logo
const ExploreXLogo = () => (
  <svg width="60" height="60" viewBox="0 0 120 120" className="mx-auto">
    <circle cx="60" cy="60" r="58" stroke="#0077FF" strokeWidth="4" fill="none" />
    <text x="50%" y="28%" textAnchor="middle" fontSize="10" fontWeight="bold" fill="#0077FF">
      EXPLORE-X
    </text>
    <circle cx="60" cy="65" r="18" fill="#0077FF" />
    <path d="M48,65 A12,12 0 1,1 72,65 A12,12 0 1,1 48,65" fill="white" opacity="0.6" />
  </svg>
);

const Certificate = ({
  name = "Robert",
  course = "Learning Program",
  startDate = "01/01/2025",
  endDate = "12/02/2025",
}) => {
  return (
    <div className="relative max-w-3xl mx-auto bg-gradient-to-r from-purple-100 via-pink-50 to-indigo-50 border-4 border-blue-500 rounded-2xl p-12 shadow-xl overflow-hidden">

      {/* Ribbon / Badge */}
      <div className="absolute -top-6 -right-6 w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg transform rotate-12">
        <span className="text-black font-bold text-sm tracking-wider">CERTIFIED</span>
      </div>

      {/* Header */}
      <h1 className="text-5xl font-extrabold text-center mb-4 text-gray-900">CERTIFICATE</h1>
      <p className="text-center text-xl text-gray-700 mb-8 uppercase">of Completion</p>

      {/* Recipient */}
      <p className="text-center text-lg text-gray-800 mb-2">Proudly Presented To</p>
      <h2 className="text-3xl font-bold text-center mb-4 text-gray-900 underline">{name}</h2>

      {/* Course Details */}
      <p className="text-center text-lg text-gray-800 mb-6">
        has successfully completed <span className="font-semibold">{course}</span> <br />
        <span className="font-medium">From {startDate} to {endDate}</span>
      </p>

      {/* Short Description (~40 words) */}
      <p className="text-center text-base text-gray-700 mb-10 max-w-2xl mx-auto">
        This certificate recognizes dedication, hard work, and outstanding performance during the program. The recipient has showcased skills, perseverance, and commitment, setting an example for peers and achieving remarkable results in all projects and evaluations.
      </p>

      {/* Footer */}
      <div className="flex flex-col md:flex-row justify-between items-center px-8 gap-8">

        {/* Signature */}
        <div className="flex flex-col items-center">
          <img src={signature} className="w-40 h-20 object-contain mb-1" />
          <span className="text-lg font-semibold">Founder</span>
        </div>

        {/* Logos and Contact */}
        <div className="flex flex-col items-center gap-4">
          <div className="flex gap-4 items-center">
            <img src={msmelogo} alt="MSME Logo" className="w-20 h-20 object-contain" />
            <ExploreXLogo />
          </div>

          <span className="text-base font-medium flex items-center gap-2">
            <HiOutlineMail className="w-5 h-5" /> explore.x.student@gmail.com
          </span>

          <span className="text-base font-medium flex items-center gap-2">
            <HiOutlineGlobeAlt className="w-5 h-5" /> https://explore-x.vercel.app/
          </span>
        </div>
      </div>
    </div>
  );
};

export default Certificate;
