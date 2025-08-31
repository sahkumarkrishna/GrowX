import React from "react";

const HeroSection = () => {
  return (
    <section className="relative min-h-[65vh] bg-gradient-to-b from-white to-gray-100 py-20 px-4 sm:px-8">
      
      {/* Decorative Background Shapes */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
      
      {/* Text Content */}
      <div className="text-center px-6 md:px-12 z-10">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-lg">
          <span className="bg-gradient-to-r from-black  to-blue-300 bg-clip-text text-transparent">
            Welcome to Our Internship Program
          </span>
        </h1>
        <p className="text-lg md:text-xl text-black/90 max-w-2xl mx-auto drop-shadow-md">
          Join the best internship experience to enhance your skills, work on real projects, and grow your career faster.
        </p>
      </div>
    </section>
  );
};

export default HeroSection;
