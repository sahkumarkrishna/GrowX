import { motion } from 'framer-motion';
import { Target, Users, Award, Zap } from 'lucide-react';

export default function About() {
  const features = [
    { icon: Target, title: 'Goal-Oriented', desc: 'Structured internship paths designed to achieve your career goals' },
    { icon: Users, title: 'Expert Mentors', desc: 'Learn from industry professionals with real-world experience' },
    { icon: Award, title: 'Certified Program', desc: 'Earn recognized certificates upon internship completion' },
    { icon: Zap, title: 'Fast-Track Career', desc: 'Accelerated programs to quickly gain practical experience' }
  ];

  return (
    <section id="about" className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Build Your Career with <span className="text-blue-600">Real Experience</span>
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              GrowX Internship is your gateway to professional success. Our program combines hands-on projects, 
              personalized mentorship, and industry exposure to accelerate your career growth.
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
              <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=700&fit=crop" alt="Internship Experience" className="rounded-3xl shadow-2xl w-full h-[500px] object-cover" />
              <div className="absolute -bottom-6 -left-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-2xl shadow-xl">
                <div className="text-3xl font-bold">50+</div>
                <div className="text-sm">Interns Onboarded</div>
              </div>
              <div className="absolute -top-6 -right-6 bg-yellow-400 text-gray-900 p-6 rounded-2xl shadow-xl">
                <div className="text-3xl font-bold">95%</div>
                <div className="text-sm font-semibold">Success Rate</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
