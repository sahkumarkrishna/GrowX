import { motion } from 'framer-motion';
import { Brain, Target, Users, Award } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AboutPage = () => {
  const navigate = useNavigate();

  const features = [
    { icon: Target, title: 'Goal-Oriented', desc: 'Structured quizzes designed to achieve your learning goals' },
    { icon: Users, title: 'Community Driven', desc: 'Compete with thousands of learners worldwide' },
    { icon: Award, title: 'Earn Badges', desc: 'Get recognized for your achievements' },
    { icon: Brain, title: 'Smart Learning', desc: 'Adaptive difficulty based on your performance' }
  ];

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Transform Learning with <span className="text-indigo-600">Interactive Quizzes</span>
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Our quiz platform makes learning engaging and fun. Test your knowledge across 40+ topics, track your progress, and compete with friends. Whether preparing for exams or exploring new subjects, we've got you covered.
            </p>
            <div className="grid grid-cols-2 gap-6 mb-8">
              {features.map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex items-start gap-3">
                  <div className="bg-indigo-100 p-2 rounded-lg">
                    <feature.icon className="text-indigo-600" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                    <p className="text-sm text-gray-600">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <button
              onClick={() => navigate('/quizCategory')}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-8 py-4 rounded-full font-semibold hover:shadow-xl transition-all hover:scale-105"
            >
              Explore Quiz Categories
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&h=700&fit=crop"
                alt="Quiz Learning"
                className="rounded-3xl shadow-2xl w-full h-[500px] object-cover"
              />
              <div className="absolute -bottom-6 -left-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 rounded-2xl shadow-xl">
                <div className="text-3xl font-bold">1000+</div>
                <div className="text-sm">Quiz Questions</div>
              </div>
              <div className="absolute -top-6 -right-6 bg-yellow-400 text-gray-900 p-6 rounded-2xl shadow-xl">
                <div className="text-3xl font-bold">40+</div>
                <div className="text-sm font-semibold">Categories</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutPage;
