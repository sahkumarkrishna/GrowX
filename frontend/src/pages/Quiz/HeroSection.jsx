import React from "react";

const HeroSection = () => {
  return (
    <section className="relative min-h-[65vh] bg-gradient-to-b from-white to-gray-100 py-16 px-4 sm:px-8">
      <div className="absolute inset-0 bg-grid-indigo-200/20 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]"></div>

      <div className="container mx-auto px-6 flex flex-col items-center text-center relative z-10">
        {/* Text Section */}
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight text-gray-900 drop-shadow-sm">
            Level Up Your <span className="text-indigo-600">Brain Power</span> <br />
            with Interactive Quizzes 🚀
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-600">
            Sharpen your skills, challenge your friends, and climb the leaderboard.  
            Learning has never been this fun & rewarding!
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
