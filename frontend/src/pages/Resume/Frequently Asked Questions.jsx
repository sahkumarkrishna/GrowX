import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

const faqData = [
  {
    id: 1,
    question: "What technologies did you use to build your resume website?",
    answer: "I used React.js, Tailwind CSS, Framer Motion for animations, and shadcn/ui for UI components to make the site interactive and modern.",
  },
  {
    id: 2,
    question: "Is your resume website mobile-friendly?",
    answer: "Yes, the website is fully responsive and works seamlessly on all devices including desktops, tablets, and smartphones.",
  },
  {
    id: 3,
    question: "Can I download your resume from the website?",
    answer: "Absolutely! There is a dedicated section where you can view and download my resume in PDF format.",
  },
  {
    id: 4,
    question: "How can I contact you through the website?",
    answer: "You can use the contact form available on the website or reach out via the provided email or social media links.",
  },
  {
    id: 5,
    question: "Does your website showcase your projects?",
    answer: "Yes, all my projects are showcased with descriptions, technologies used, and interactive links to view them live or access the code.",
  },
];

const FAQSection = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-purple-50 via-blue-50 to-pink-50">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-purple-900 mb-12">
          Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible className="space-y-4">
          {faqData.map((faq) => (
            <AccordionItem key={faq.id} value={`item-${faq.id}`} className="border border-gray-200 rounded-xl shadow-sm bg-white hover:shadow-lg transition">
              <AccordionTrigger className="text-lg font-medium text-purple-900 ml-4">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 mt-2 ml-4">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
