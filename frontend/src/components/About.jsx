import React from "react";
import job from "../assets/job.png";

const About = () => {
  return (
    <section className=" py-12 px-4 sm:px-6 md:px-16">
      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center gap-8 md:gap-16">
        
        {/* Left: Text Content */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
            About Our Job Portal
          </h2>

          <p className="text-gray-700 text-base sm:text-lg mb-4">
            Welcome to our job portal — your gateway to thousands of career opportunities.
            We connect job seekers with top companies around the globe, making the hiring
            process smooth, efficient, and impactful.
          </p>

          <p className="text-gray-700 text-base sm:text-lg mb-4">
            In the era of the Internet, a large number of students and professionals prefer 
            searching for jobs through online platforms rather than traditional newspapers. 
            Job portals have become a multipurpose solution for both employers and job seekers 
            to find their perfect match with ease and efficiency.
          </p>

          <p className="text-gray-700 text-base sm:text-lg mb-4">
            Whether you're starting your career or looking for your next challenge, our
            platform is designed to support your journey. Discover roles, apply easily,
            and get hired faster.
          </p>

          <p className="text-gray-700 text-base sm:text-lg">
            Join us and take your first step toward a brighter professional future.
          </p>
        </div>

        {/* Right: Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src={job}
            alt="Teamwork illustration"
            className="w-full max-w-md md:max-w-full h-auto rounded-xl shadow-md"
          />
        </div>
      </div>
    </section>
  );
};

export default About;
