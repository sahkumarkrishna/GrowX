import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqData = [
  {
    question: "What is this quiz platform about?",
    answer:
      "Our platform offers a variety of interactive quizzes designed to help users test their knowledge, learn new concepts, and have fun while practicing across different subjects and skill levels.",
  },
  {
    question: "How do I start a quiz?",
    answer:
      "Simply sign up or log in, browse the available quizzes, and click 'Start Quiz' on your chosen topic. Your progress will be tracked automatically.",
  },
  {
    question: "Are there any prerequisites to take quizzes?",
    answer:
      "No prior knowledge is required for most quizzes. Some advanced quizzes may require basic familiarity with the topic, which will be indicated in the quiz description.",
  },
  {
    question: "Can I take quizzes at my own pace?",
    answer:
      "Absolutely! You can start, pause, and resume quizzes at any time. This allows you to learn at your own pace and revisit questions as needed.",
  },
  {
    question: "Do you provide certificates or rewards?",
    answer:
      "Yes! Upon completing certain quizzes or challenges, you can earn badges or digital certificates to showcase your achievements and track your progress.",
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
