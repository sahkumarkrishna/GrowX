import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

export default function Feedback() {
  const testimonials = [
    { name: 'Priya Sharma', role: 'Software Engineer', company: 'Tech Solutions', rating: 5, text: 'GrowX Resume Builder helped me land my dream job. The templates are professional and ATS-friendly!', img: 'https://i.pravatar.cc/150?img=1' },
    { name: 'Rahul Kumar', role: 'Marketing Manager', company: 'Digital Agency', rating: 5, text: 'Created my resume in just 10 minutes. The interface is intuitive and the results are impressive.', img: 'https://i.pravatar.cc/150?img=13' },
    { name: 'Sneha Patel', role: 'Data Analyst', company: 'Analytics Corp', rating: 5, text: 'The best resume builder I\'ve used. Got multiple interview calls after updating my resume here.', img: 'https://i.pravatar.cc/150?img=5' }
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">What Our <span className="text-blue-600">Users Say</span></h2>
          <p className="text-xl text-gray-600">Join thousands of successful job seekers who landed their dream jobs</p>
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
