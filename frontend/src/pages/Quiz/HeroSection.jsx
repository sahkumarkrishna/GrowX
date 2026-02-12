import { motion } from 'framer-motion';
import { Brain, Trophy, Zap, Play } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white py-20 px-4 -mt-16">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Brain size={16} />
              Test Your Knowledge
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Level Up Your <span className="text-yellow-300">Brain Power</span>
            </h1>
            <p className="text-xl mb-8 text-indigo-100">
              Challenge yourself with interactive quizzes. Track your progress, compete with friends, and master new skills.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/quizCategory">
                <button className="bg-white text-indigo-600 px-8 py-4 rounded-full font-semibold hover:bg-yellow-300 hover:text-indigo-700 transition-all shadow-lg flex items-center gap-2">
                  <Play size={20} />
                  Start Quiz
                </button>
              </Link>
              <button className="border-2 border-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-indigo-600 transition-all flex items-center gap-2">
                <Trophy size={20} />
                View Leaderboard
              </button>
            </div>
            <div className="flex gap-8 mt-10">
              <div>
                <div className="text-3xl font-bold">40+</div>
                <div className="text-indigo-200">Quiz Topics</div>
              </div>
              <div>
                <div className="text-3xl font-bold">1000+</div>
                <div className="text-indigo-200">Questions</div>
              </div>
              <div>
                <div className="text-3xl font-bold">10K+</div>
                <div className="text-indigo-200">Active Users</div>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative">
            <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
              <div className="absolute -top-4 -right-4 bg-yellow-400 text-indigo-900 px-4 py-2 rounded-full font-bold text-sm flex items-center gap-2">
                <Zap size={16} />
                Popular
              </div>
              <img src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&h=400&fit=crop" alt="Quiz" className="rounded-2xl shadow-2xl" />
              <div className="mt-6 grid grid-cols-3 gap-4">
                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl text-center">
                  <div className="text-2xl font-bold">🎯</div>
                  <div className="text-sm mt-1">Accuracy</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl text-center">
                  <div className="text-2xl font-bold">⚡</div>
                  <div className="text-sm mt-1">Speed</div>
                </div>
                <div className="bg-white/20 backdrop-blur-sm p-4 rounded-xl text-center">
                  <div className="text-2xl font-bold">🏆</div>
                  <div className="text-sm mt-1">Rank</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
