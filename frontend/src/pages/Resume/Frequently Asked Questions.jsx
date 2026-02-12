import { motion } from "framer-motion";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

const faqData = [
  {
    id: 1,
    question: "How do I create a resume?",
    answer: "Simply click 'Create Resume', fill in your details across different sections, and our builder will format everything professionally for you.",
  },
  {
    id: 2,
    question: "Are the templates ATS-friendly?",
    answer: "Yes! All our templates are designed to be ATS-compatible, ensuring your resume passes through applicant tracking systems successfully.",
  },
  {
    id: 3,
    question: "Can I download my resume as PDF?",
    answer: "Absolutely! You can download your resume in high-quality PDF format, perfect for job applications and printing.",
  },
  {
    id: 4,
    question: "Can I edit my resume after creating it?",
    answer: "Yes, you can edit your resume anytime. Just go to 'My Resumes', select the resume you want to edit, and make your changes.",
  },
  {
    id: 5,
    question: "How many resumes can I create?",
    answer: "You can create unlimited resumes! Create different versions for different job applications to maximize your chances.",
  },
];

const FAQSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      <div className="max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-block px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full text-purple-700 font-semibold text-sm mb-4">
            FAQ
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-800 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 text-lg">Everything you need to know</p>
        </motion.div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqData.map((faq, index) => (
            <motion.div
              key={faq.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <AccordionItem 
                value={`item-${faq.id}`} 
                className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all border border-purple-100 overflow-hidden"
              >
                <AccordionTrigger className="text-lg font-bold text-gray-800 px-6 py-4 hover:text-purple-600 transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 px-6 pb-4 leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            </motion.div>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
