import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

export default function Feedback() {
  const testimonials = [
    { name: 'Ananya Sharma', role: 'Software Development Intern', company: 'Tech Corp', rating: 5, text: 'GrowX internship transformed my career. The projects were practical and mentors were world-class.', img: 'https://i.pravatar.cc/150?img=1' },
    { name: 'Rohan Mehta', role: 'Web Development Intern', company: 'StartupXYZ', rating: 5, text: 'Best decision ever. Gained real experience and landed my dream job within 2 months.', img: 'https://i.pravatar.cc/150?img=13' },
    { name: 'Ishita Jain', role: 'UI/UX Design Intern', company: 'Design Studio', rating: 5, text: 'The hands-on projects gave me real portfolio pieces. Highly recommend to anyone serious about growth.', img: 'https://i.pravatar.cc/150?img=5' }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">What Our <span className="text-blue-600">Interns Say</span></h2>
          <p className="text-xl text-gray-600">Join 50+ successful interns who transformed their careers</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all">
              <Quote className="text-blue-600 mb-4" size={32} />
              <div className="flex gap-1 mb-4">{[...Array(t.rating)].map((_, i) => <Star key={i} className="text-yellow-400 fill-yellow-400" size={20} />)}</div>
              <p className="text-gray-700 mb-6 leading-relaxed">{t.text}</p>
              <div className="flex items-center gap-4">
                <img src={t.img} alt={t.name} className="w-14 h-14 rounded-full" />
                <div>
                  <div className="font-bold text-gray-900">{t.name}</div>
                  <div className="text-sm text-gray-600">{t.role} at {t.company}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
