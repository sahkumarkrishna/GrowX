import React from "react";
import { useNavigate } from "react-router-dom";
import quiz from "../../assets/quiz.png";

const AboutPage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/quizCategory");
  };

  return (
    <section className="relative py-20 mt-14 bg-white">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
        
        {/* Text + Image Wrapper for Mobile */}
        <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left">
          {/* Heading */}
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
            <span className="text-indigo-600">Our Quiz Platform</span> 🎓
          </h2>

          {/* Image (comes just below heading on mobile) */}
          <div className="w-full flex justify-center md:hidden mb-6">
            <img
              src="https://cdn-icons-png.flaticon.com/512/906/906175.png"
              alt="Quiz Illustration"
              className="w-72 drop-shadow-lg"
            />
          </div>

          {/* Paragraph */}
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            Our quiz platform is built with a vision to make learning more
            engaging, enjoyable, and accessible for everyone. Education should
            never feel like a burden, and quizzes are the perfect way to combine
            fun with knowledge. Whether you are preparing for competitive exams,
            looking to strengthen subject knowledge, or simply curious about new
            topics, our platform provides quizzes tailored to your needs.
            <br /><br />
            With a wide range of categories, real-time feedback, and leaderboards,
            users can track progress, compete with friends, and push themselves
            toward excellence. The platform is designed to encourage continuous
            growth and curiosity, transforming learning into an interactive
            journey. We strongly believe that every question answered brings you
            closer to achieving your goals. Join us today and explore a world
            where learning is fun, competitive, and truly rewarding.
          </p>

          <button
            onClick={handleGetStarted}
            className="px-8 py-4 bg-indigo-600 text-white rounded-2xl text-lg font-semibold shadow-lg hover:bg-indigo-700 hover:scale-105 transition"
          >
          Quiz Categories
          </button>
        </div>

        {/* Desktop Image (hidden on mobile) */}
        <div className="flex-1 hidden md:flex justify-center">
          <img
            src={quiz}
            alt="Quiz Illustration"
            className="w-80 md:w-[420px] drop-shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
