import { motion } from 'framer-motion';
import { CheckCircle, Star, Zap, Users, Trophy } from 'lucide-react';

const WhyChooseUs = () => {
  const reasons = [
    { icon: Star, title: 'Expert-Crafted Content', desc: 'Quizzes designed by subject experts and educators', stats: '500+ Expert Contributors' },
    { icon: Zap, title: 'Instant Feedback', desc: 'Get immediate results with detailed explanations', stats: 'Real-time Scoring' },
    { icon: Users, title: 'Global Community', desc: 'Join thousands of learners worldwide', stats: '25K+ Active Users' },
    { icon: Trophy, title: 'Gamified Learning', desc: 'Earn badges, compete on leaderboards, and track progress', stats: '100+ Achievements' }
  ];

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Why Choose <span className="text-indigo-600">Our Quiz Platform</span>?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We make learning fun, interactive, and rewarding
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {reasons.map((reason, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="bg-gradient-to-br from-indigo-50 to-purple-50 p-8 rounded-3xl border-2 border-indigo-100 hover:border-indigo-300 transition-all hover:shadow-xl"
            >
              <div className="flex items-start gap-6">
                <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-4 rounded-2xl">
                  <reason.icon className="text-white" size={32} />
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2 text-gray-900">{reason.title}</h3>
                  <p className="text-gray-600 mb-4">{reason.desc}</p>
                  <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full text-sm font-semibold text-indigo-600">
                    <CheckCircle size={16} />
                    {reason.stats}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gray-900 text-white rounded-3xl p-12 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600 rounded-full blur-3xl opacity-20"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600 rounded-full blur-3xl opacity-20"></div>
          
          <div className="relative z-10 grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold mb-2 text-yellow-400">Free</div>
              <div className="text-lg">Forever Access</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2 text-green-400">24/7</div>
              <div className="text-lg">Available Anytime</div>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2 text-blue-400">40+</div>
              <div className="text-lg">Quiz Categories</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
