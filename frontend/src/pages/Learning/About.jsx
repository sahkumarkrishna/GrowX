import React from "react";
import { useNavigate } from "react-router-dom";
import learningImg from "../../assets/international.webp";

export default function About() {
  const navigate = useNavigate();

  return (
    <section className="py-16">
      <div className="container mx-auto px-6">

        {/* H1 always on top */}
        <h1 className="text-4xl md:text-4xl font-extrabold leading-tight mb-10 text-center md:text-left text-sky-700">
          About
        </h1>
        <h3 className="text-2xl font-extrabold leading-tight mb-6 text-gray-800">
          Learn, Build & Grow with Confidence
        </h3>

        {/* Flex container */}
        <div className="flex flex-col md:flex-row items-center gap-10">

          {/* Left: Text */}
          <div className="flex-1 order-2 md:order-1">
            <p className="text-lg md:text-xl text-gray-700 mb-6 max-w-3xl leading-relaxed">
              Learning is a lifelong journey that empowers individuals to grow,
              innovate, and achieve meaningful goals. Our platform is designed for
              learners who want more than just theory — it is rooted in{" "}
              <strong>real-world applications, modern tools,</strong> and{" "}
              <strong>hands-on lessons</strong> that provide the confidence and
              knowledge required to thrive in today’s fast-changing digital
              landscape. Every step is about applying concepts effectively, not
              just memorizing them.
            </p>

            <p className="text-lg md:text-xl text-gray-600 mb-6 max-w-3xl leading-relaxed">
              Whether you’re just beginning or aiming to sharpen advanced skills,
              we emphasize project-driven experiences, industry best practices,
              and problem-solving techniques. Our approach builds curiosity,
              adaptability, and innovation, preparing you for success in evolving
              industries. Each module bridges the gap between{" "}
              <strong>theory and execution</strong>, ensuring you master not only
              tools but also the mindset for lifelong growth. Learning with us is
              about more than acquiring information — it’s about building the
              ability to think critically, create boldly, and grow continuously.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => navigate("/learningVideo")}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:from-blue-700 hover:to-purple-700 transition w-full sm:w-auto mt-5"

              >
                Get Started
              </button>
            </div>
          </div>

          {/* Right: Image */}
          <div className="w-full md:w-1/2 lg:w-5/12 order-1 md:order-2">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={learningImg}
                alt="Learning preview"
                className="w-full h-80 md:h-[28rem] lg:h-[32rem] object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
