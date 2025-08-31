import React from "react";
import { CheckCircle2 } from "lucide-react"; // icon library

const WhyChooseInternship = () => {
  const points = [
    "Work on real-world projects to gain practical experience",
    "Mentorship from experienced professionals",
    "Flexible schedules to balance learning and work",
    "Exposure to the latest industry tools and technologies",
    "Personalized feedback to accelerate your growth",
    "Collaborate with fellow interns and build your network",
    "Track your progress and achievements",
    "Learn anytime, anywhere with our online platform",
    "Career guidance and interview preparation",
    "Certificates and portfolio projects to showcase your skills",
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Why Choose <span className="text-red-400">Our Internship Program?</span>
          </h2>
          <p className="text-gray-700 mt-4 text-lg">
            Kickstart your career with hands-on experience, mentorship, and projects that make you industry-ready. Learn, grow, and shine with us.
          </p>
        </div>

        {/* Points Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {points.map((point, index) => (
            <div
              key={index}
              className="flex items-start gap-4 bg-white shadow-sm hover:shadow-md transition rounded-xl p-5"
            >
              <CheckCircle2 className="w-6 h-6  flex-shrink-0" />
              <p className="text-gray-800 text-base">{point}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseInternship;
