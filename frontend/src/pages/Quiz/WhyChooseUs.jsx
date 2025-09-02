import React from "react";
import { CheckCircle2 } from "lucide-react"; // icon library

const WhyChooseUs = () => {
  const points = [
    "Engaging quizzes designed by subject experts",
    "Instant feedback to track progress and improve",
    "Wide range of categories for all interests",
    "Adaptive difficulty levels for personalized learning",
    "Leaderboards to compete and stay motivated",
    "Fun way to prepare for exams and interviews",
    "Boosts memory retention through interactive play",
    "User-friendly platform accessible anytime, anywhere",
    "Collaborate and challenge friends worldwide",
    "Continuously updated quizzes matching new trends",
  ];

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Why Choose <span className="text-indigo-600">Our Quiz Platform?</span>
          </h2>
          <p className="text-gray-600 mt-4 text-lg">
            Learning doesn’t have to be boring. Our platform turns quizzes into
            a fun, interactive journey that helps you learn faster, stay motivated, 
            and enjoy every step of your growth.
          </p>
        </div>

        {/* Points Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {points.map((point, index) => (
            <div
              key={index}
              className="flex items-start gap-4 bg-white shadow-sm hover:shadow-md transition rounded-xl p-5"
            >
              <CheckCircle2 className="w-6 h-6 text-indigo-600 flex-shrink-0" />
              <p className="text-gray-700 text-base">{point}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
