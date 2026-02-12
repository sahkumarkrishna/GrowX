import { motion } from 'framer-motion';
import { Target, Users, Award, Zap } from 'lucide-react';

export default function About() {
  const features = [
    { icon: Target, title: 'Goal-Oriented', desc: 'Structured learning paths designed to achieve your career goals' },
    { icon: Users, title: 'Expert Mentors', desc: 'Learn from industry professionals with real-world experience' },
    { icon: Award, title: 'Certified Learning', desc: 'Earn recognized certificates upon course completion' },
    { icon: Zap, title: 'Fast-Track Skills', desc: 'Accelerated programs to quickly master in-demand skills' }
  ];

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Transform Your Career with <span className="text-blue-600">Expert-Led Learning</span>
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              GrowX Learning is your gateway to mastering cutting-edge skills. Our platform combines world-class content, 
              hands-on projects, and personalized mentorship to accelerate your professional growth.
            </p>
            <div className="grid grid-cols-2 gap-6">
              {features.map((feature, idx) => (
                <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} className="flex items-start gap-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <feature.icon className="text-blue-600" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                    <p className="text-sm text-gray-600">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="relative">
            <div className="relative">
              <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=700&fit=crop" alt="Learning Experience" className="rounded-3xl shadow-2xl w-full h-[500px] object-cover" />
              <div className="absolute -bottom-6 -left-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-2xl shadow-xl">
                <div className="text-3xl font-bold">10M+</div>
                <div className="text-sm">Hours of Learning</div>
              </div>
              <div className="absolute -top-6 -right-6 bg-yellow-400 text-gray-900 p-6 rounded-2xl shadow-xl">
                <div className="text-3xl font-bold">4.9★</div>
                <div className="text-sm font-semibold">Average Rating</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
