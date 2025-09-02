import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const faqs = [
  {
    question: "What is the duration of the internship?",
    answer: "The internship usually lasts for 8–12 weeks, depending on the role and project requirements.",
  },
  {
    question: "Is the internship paid?",
    answer: "Yes, all selected interns receive a stipend along with performance-based perks.",
  },
  {
    question: "Can I do the internship remotely?",
    answer: "Yes, we offer both remote and on-site internship opportunities.",
  },
  {
    question: "Will I receive a certificate?",
    answer: "Yes, upon successful completion, every intern will be awarded a certificate of completion.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="max-w-3xl mx-auto py-12 px-4">
      <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <Card
            key={index}
            className="rounded-2xl shadow-md border border-gray-200 cursor-pointer"
            onClick={() => toggleFAQ(index)}
          >
            <CardContent className="p-5">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">{faq.question}</h3>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-gray-600" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-600" />
                )}
              </div>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden mt-3 text-gray-600"
                  >
                    <p>{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
