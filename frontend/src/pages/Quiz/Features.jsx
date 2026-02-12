import { motion } from 'framer-motion';
import { Brain, BarChart, Users, Zap, Trophy, Target } from 'lucide-react';

const Features = () => {
  const features = [
    { icon: Brain, title: 'Interactive Quizzes', desc: 'Engaging questions with instant feedback to test and strengthen your knowledge', color: 'from-blue-500 to-indigo-500' },
    { icon: BarChart, title: 'Progress Tracking', desc: 'Detailed analytics and personalized reports to monitor your improvement', color: 'from-purple-500 to-pink-500' },
    { icon: Users, title: 'Community Challenges', desc: 'Compete with friends in timed challenges and climb the leaderboard', color: 'from-green-500 to-teal-500' },
    { icon: Zap, title: 'Instant Results', desc: 'Get immediate feedback on your answers with detailed explanations', color: 'from-orange-500 to-red-500' },
    { icon: Trophy, title: 'Earn Rewards', desc: 'Collect badges and certificates as you complete quizzes and challenges', color: 'from-yellow-500 to-orange-500' },
    { icon: Target, title: 'Adaptive Learning', desc: 'Smart difficulty adjustment based on your performance and progress', color: 'from-cyan-500 to-blue-500' }
  ];

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Powerful Features for <span className="text-indigo-600">Better Learning</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Everything you need to master new skills through interactive quizzes
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2"
            >
              <div className={`bg-gradient-to-br ${feature.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <feature.icon className="text-white" size={32} />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900 group-hover:text-indigo-600 transition-colors">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
