import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "What is this Kanban Board?",
    answer:
      "This Kanban Board is a visual task management tool that helps you organize, track, and manage tasks across different stages such as To Do, In Progress, and Done.",
  },
  {
    question: "How do I add a new task?",
    answer:
      "Click on the 'Add Task' button, fill in the title, description, status, and position, then submit. The task will appear in the corresponding column instantly.",
  },
  {
    question: "Can I move tasks between columns?",
    answer:
      "Yes! Simply drag and drop tasks to change their status or order. The updates are reflected in real-time for all team members.",
  },
  {
    question: "Can I assign priorities or due dates?",
    answer:
      "Absolutely. You can set priorities, due dates, and labels for tasks to help you stay organized and ensure important tasks are completed on time.",
  },
  {
    question: "Can I collaborate with my team?",
    answer:
      "Yes, this Kanban Board supports real-time collaboration. Team members can view updates instantly and stay aligned on project progress.",
  },
  {
    question: "Can I customize columns or workflows?",
    answer:
      "Yes, you can create, rename, or reorder columns to match your personal workflow or team project requirements, making task management flexible and tailored.",
  },
];

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAnswer = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="max-w-4xl mx-auto text-white">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">
          Frequently Asked Questions
        </h2>

        <div className="space-y-5">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="border border-gray-700 rounded-xl p-5 bg-gray-800/60 backdrop-blur-sm shadow-md hover:shadow-lg transition-all duration-300"
            >
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleAnswer(index)}
              >
                <h3 className="text-lg md:text-xl font-semibold text-gray-100">
                  {faq.question}
                </h3>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="text-yellow-400" />
                </motion.div>
              </div>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="overflow-hidden mt-3"
                  >
                    <p className="text-base text-gray-300 leading-relaxed">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQs;
