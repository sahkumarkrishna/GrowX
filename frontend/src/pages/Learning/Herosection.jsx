import React from "react";

const HeroSection = () => {
  return (
    <section className=" relative min-h-[65vh] bg-gradient-to-b from-white to-gray-100 py-20 px-4 sm:px-8">
      <div className="container mx-auto px-6 flex flex-col items-center text-center gap-10 relative z-10">
        
        {/* Text Section */}
        <div className="flex flex-col gap-6 max-w-4xl items-center text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
            <span className="bg-gradient-to-r from-purple-700 via-pink-500 to-indigo-600 bg-clip-text text-transparent">
              The Best Learning Management System
            </span>
            <span className="text-gray-900"> for Personalized Learning</span>
          </h1>

          <p className="text-xl text-gray-700 max-w-2xl">
            Enhance your skills and achieve your career goals with interactive courses and expert guidance.
          </p>
        </div>
      </div>

      {/* Decorative Blurred Background Shapes */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-purple-200 opacity-40 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-pink-200 opacity-40 rounded-full blur-3xl"></div>
    </section>
  );
};

export default HeroSection;
