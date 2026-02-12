import { motion } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqData = [
  {
    question: "What is this quiz platform about?",
    answer: "Our platform offers a variety of interactive quizzes designed to help users test their knowledge, learn new concepts, and have fun while practicing across different subjects and skill levels."
  },
  {
    question: "How do I start a quiz?",
    answer: "Simply sign up or log in, browse the available quizzes, and click 'Start Quiz' on your chosen topic. Your progress will be tracked automatically."
  },
  {
    question: "Are there any prerequisites to take quizzes?",
    answer: "No prior knowledge is required for most quizzes. Some advanced quizzes may require basic familiarity with the topic, which will be indicated in the quiz description."
  },
  {
    question: "Can I take quizzes at my own pace?",
    answer: "Absolutely! You can start, pause, and resume quizzes at any time. This allows you to learn at your own pace and revisit questions as needed."
  },
  {
    question: "Do you provide certificates or rewards?",
    answer: "Yes! Upon completing certain quizzes or challenges, you can earn badges or digital certificates to showcase your achievements and track your progress."
  }
];

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <HelpCircle size={16} />
            Got Questions?
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Frequently Asked <span className="text-indigo-600">Questions</span>
          </h2>
          <p className="text-xl text-gray-600">Everything you need to know about our quiz platform</p>
        </motion.div>

        <div className="space-y-4">
          {faqData.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="bg-gradient-to-br from-white to-indigo-50 rounded-2xl overflow-hidden border-2 border-indigo-100 hover:border-indigo-300 transition-all shadow-md hover:shadow-xl"
            >
              <button
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                className="w-full flex justify-between items-center px-6 py-5 text-left focus:outline-none group"
              >
                <span className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors pr-4">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-6 h-6 text-indigo-600 flex-shrink-0 transition-transform duration-300 ${activeIndex === index ? 'rotate-180' : ''}`}
                />
              </button>

              <div
                className={`px-6 overflow-hidden transition-all duration-500 ${activeIndex === index ? 'max-h-96 py-4 border-t-2 border-indigo-100' : 'max-h-0'}`}
              >
                <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
