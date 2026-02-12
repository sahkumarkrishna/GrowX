import React from 'react';
import { Award, Download } from 'lucide-react';
import CertificateImage from "../../assets/Certificate.png";

const Certificate = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 rounded-full mb-6">
            <Award className="w-4 h-4 text-indigo-600" />
            <span className="text-sm font-medium text-indigo-700">Recognition</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Earn Your <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Certificate</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Complete your internship and receive an official certificate to showcase your achievements
          </p>
        </div>

        <div className="relative group">
          <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
          <div className="relative bg-gradient-to-br from-gray-50 to-indigo-50 rounded-3xl p-8 shadow-2xl">
            <img 
              src={CertificateImage} 
              alt="Internship Certificate" 
              className="w-full h-auto object-contain rounded-2xl shadow-lg" 
            />
          </div>
        </div>

        <div className="mt-12 text-center">
          <div className="inline-flex flex-col sm:flex-row gap-4 items-center justify-center">
            <div className="flex items-center gap-2 text-gray-700">
              <Award className="w-5 h-5 text-indigo-600" />
              <span className="font-medium">Industry-Recognized</span>
            </div>
            <div className="hidden sm:block w-1 h-1 bg-gray-300 rounded-full"></div>
            <div className="flex items-center gap-2 text-gray-700">
              <Download className="w-5 h-5 text-indigo-600" />
              <span className="font-medium">Digital & Printable</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Certificate;
