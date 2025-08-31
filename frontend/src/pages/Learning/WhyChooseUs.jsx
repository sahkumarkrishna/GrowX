import React from "react";
import { CheckCircle2 } from "lucide-react"; // icon library

const WhyChooseLearning = () => {
  const points = [
    "Comprehensive courses designed by industry experts",
    "Hands-on projects to build real-world skills",
    "Flexible learning paths tailored to your goals",
    "Access to the latest tools and technologies",
    "Personalized feedback and mentorship",
    "Community support to connect and collaborate",
    "Progress tracking to keep you motivated",
    "Learn anytime, anywhere with our mobile-friendly platform",
    "Career guidance and interview preparation",
    "Continuous updates to keep content relevant",
  ];

  return (
    <section className=" py-16">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Why Choose <span className="text-indigo-600">Our Learning Platform?</span>
          </h2>
          <p className="text-gray-600 mt-4 text-lg">
            Learning is a journey, and our platform is here to make it engaging, practical,
            and tailored just for you. Explore, create, and grow with confidence.
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

export default WhyChooseLearning;
