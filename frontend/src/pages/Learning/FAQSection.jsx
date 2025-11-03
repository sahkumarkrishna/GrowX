import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqData = [
  {
    question: "What is this platform about?",
    answer:
      "Our platform is a comprehensive learning management system designed to help users learn, build, and grow with confidence using real-world projects, modern tools, and expert guidance.",
  },
  {
    question: "How do I start a course?",
    answer:
      "Simply sign up, browse the courses, and click 'Start Learning' on the course of your choice. You can track your progress through your dashboard.",
  },
  {
    question: "Are there any prerequisites?",
    answer:
      "Most of our courses are beginner-friendly, but some advanced courses may require basic knowledge of programming or relevant skills.",
  },
  {
    question: "Can I learn at my own pace?",
    answer:
      "Absolutely! Our platform allows you to learn at your own pace, revisit lessons, and practice with hands-on projects.",
  },
  {
    question: "Do you provide certificates?",
    answer:
      "Yes, upon completing a course or project, you will receive a digital certificate that can be shared on LinkedIn or added to your resume.",
  },
];

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-20 ">
      <div className="max-w-5xl mx-auto px-6">
        <h2 className="text-5xl font-extrabold text-center mb-16 text-gray-800">
          Frequently Asked Questions
        </h2>

        <div className="space-y-6">
          {faqData.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg overflow-hidden transition hover:shadow-2xl"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex justify-between items-center px-6 py-5 text-left focus:outline-none"
              >
                <span className="text-lg font-semibold text-gray-800">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-6 h-6 text-blue-600 transition-transform duration-300 ${
                    activeIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                className={`px-6 overflow-hidden transition-all duration-500 ${
                  activeIndex === index ? "max-h-96 py-4" : "max-h-0"
                }`}
              >
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
