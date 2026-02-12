import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const feedbackData = [
  {
    id: 1,
    name: "Ananya Sharma",
    role: "Software Engineer",
    company: "Tech Corp",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    feedback: "The portal helped me land my dream job. The process was smooth and efficient!",
    rating: 5,
  },
  {
    id: 2,
    name: "Rohit Kumar",
    role: "Marketing Manager",
    company: "Digital Agency",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
    feedback: "Easy to navigate and great job recommendations. Found my perfect match!",
    rating: 5,
  },
  {
    id: 3,
    name: "Meena Patel",
    role: "Data Analyst",
    company: "Analytics Inc",
    image: "https://randomuser.me/api/portraits/women/50.jpg",
    feedback: "Great support from the recruiter team. Highly recommend this platform!",
    rating: 5,
  },
];

const FeedbackSection = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-emerald-50 to-teal-50">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Success <span className="text-emerald-600">Stories</span>
          </h2>
          <p className="text-xl text-gray-600">Hear from professionals who found their dream careers</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {feedbackData.map((fb, idx) => (
            <motion.div 
              key={fb.id} 
              initial={{ opacity: 0, y: 30 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true }} 
              transition={{ delay: idx * 0.1 }} 
              className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all"
            >
              <Quote className="text-emerald-600 mb-4" size={32} />
              <div className="flex gap-1 mb-4">
                {[...Array(fb.rating)].map((_, i) => (
                  <Star key={i} className="text-amber-400 fill-amber-400" size={20} />
                ))}
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed">{fb.feedback}</p>
              <div className="flex items-center gap-4">
                <Avatar className="w-14 h-14">
                  <AvatarImage src={fb.image} alt={fb.name} />
                  <AvatarFallback className="bg-emerald-100 text-emerald-700">{fb.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-bold text-gray-900">{fb.name}</div>
                  <div className="text-sm text-gray-600">{fb.role} at {fb.company}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeedbackSection;
