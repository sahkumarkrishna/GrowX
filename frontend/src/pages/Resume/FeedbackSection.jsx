import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";

const feedbackData = [
  {
    id: 1,
    name: "Rohit Sharma",
    role: "Software Engineer",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    feedback: "The resume builder is incredibly intuitive! Created my professional resume in just 5 minutes.",
    rating: 5,
  },
  {
    id: 2,
    name: "Sneha Patel",
    role: "Product Manager",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    feedback: "Love the modern templates and smooth interface. It really helped me land my dream job!",
    rating: 5,
  },
  {
    id: 3,
    name: "Aditya Verma",
    role: "Data Analyst",
    image: "https://randomuser.me/api/portraits/men/50.jpg",
    feedback: "The ATS-friendly templates are a game changer. Highly recommend for job seekers!",
    rating: 4,
  },
  {
    id: 4,
    name: "Priya Sharma",
    role: "UX Designer",
    image: "https://randomuser.me/api/portraits/women/33.jpg",
    feedback: "Amazing attention to detail! The export quality is perfect for professional applications.",
    rating: 5,
  },
  {
    id: 5,
    name: "Raghav Joshi",
    role: "Marketing Manager",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
    feedback: "Very clean design and excellent customization options. My resume looks outstanding!",
    rating: 4,
  },
  {
    id: 6,
    name: "Anika Sen",
    role: "HR Specialist",
    image: "https://randomuser.me/api/portraits/women/29.jpg",
    feedback: "As an HR professional, I can confirm these templates are recruiter-approved. Excellent work!",
    rating: 5,
  },
];

const FeedbackSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full text-purple-700 font-semibold text-sm mb-4">
            Testimonials
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-gray-800 mb-4">
            🌟 What Our Users Say
          </h2>
          <p className="text-gray-600 text-lg">Real feedback from real professionals</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {feedbackData.map((fb, i) => (
            <motion.div
              key={fb.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
            >
              <Card className="h-full bg-gradient-to-br from-white to-purple-50 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all border border-purple-100">
                <div className="flex items-center gap-4 mb-4">
                  <motion.div whileHover={{ scale: 1.1, rotate: 5 }}>
                    <Avatar className="w-16 h-16 ring-4 ring-purple-200">
                      <AvatarImage src={fb.image} alt={fb.name} />
                      <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-white font-bold">
                        {fb.name[0]}
                      </AvatarFallback>
                    </Avatar>
                  </motion.div>
                  <div>
                    <h4 className="text-lg font-bold text-gray-900">{fb.name}</h4>
                    <p className="text-sm text-purple-600 font-medium">{fb.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4 leading-relaxed italic">
                  "{fb.feedback}"
                </p>
                <div className="flex space-x-1">
                  {Array.from({ length: 5 }, (_, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.3, rotate: 15 }}
                    >
                      <Star
                        className={`w-5 h-5 ${
                          i < fb.rating
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeedbackSection;
