import React from 'react';
import CertificateImage from "../../assets/Certificate.png";

const Certificate = () => {
  return (
    <div className="flex flex-col items-center mt-4 px-4">
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-500 mb-4 text-center">
        Internship Certificate
      </h1>
      <img 
        src={CertificateImage} 
        alt="Certificate" 
        className="w-full max-w-md sm:max-w-3xl h-auto object-contain rounded-2xl shadow-md" 
      />
    </div>
  );
}

export default Certificate;
