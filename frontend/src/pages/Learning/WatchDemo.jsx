import { motion } from 'framer-motion';
import { Play, CheckCircle, Star, Users, Award, TrendingUp, Sparkles, BookOpen, Target } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function WatchDemo() {
  const features = [
    { icon: CheckCircle, title: 'Expert-Led Courses', desc: 'Learn from industry professionals with 10+ years experience' },
    { icon: Star, title: 'High-Quality Content', desc: 'HD video lessons with interactive coding exercises' },
    { icon: Users, title: 'Active Community', desc: 'Connect with 50,000+ learners worldwide' },
    { icon: Award, title: 'Certificates', desc: 'Earn recognized certifications upon completion' },
    { icon: Target, title: 'Career Support', desc: 'Resume reviews and interview preparation' },
    { icon: BookOpen, title: 'Lifetime Access', desc: 'Learn at your own pace, anytime, anywhere' }
  ];

  const stats = [
    { value: '50K+', label: 'Active Students', color: 'from-blue-500 to-cyan-500' },
    { value: '200+', label: 'Expert Courses', color: 'from-purple-500 to-pink-500' },
    { value: '95%', label: 'Success Rate', color: 'from-green-500 to-emerald-500' },
    { value: '4.9★', label: 'Average Rating', color: 'from-yellow-500 to-orange-500' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-20 px-4 -mt-16">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full text-sm font-bold mb-6 shadow-lg">
            <Sparkles className="h-4 w-4" />
            Platform Demo Video
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight">
            Experience GrowX Learning
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Watch how our platform empowers thousands of learners to master new skills, build amazing projects, and advance their careers
          </p>
        </motion.div>

        {/* Video Player */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-20"
        >
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border-8 border-white max-w-5xl mx-auto">
            <div className="aspect-video bg-gradient-to-br from-blue-900 to-purple-900">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/RGOj5yH7evk"
                title="GrowX Learning Platform Demo"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center mt-6"
          >
            <p className="text-gray-600 text-lg">🎥 Watch our 2-minute platform overview</p>
          </motion.div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-900">
            Trusted by <span className="text-blue-600">Thousands</span> Worldwide
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + idx * 0.1 }}
                className="bg-white rounded-2xl p-8 text-center shadow-xl border-2 border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
              >
                <div className={`text-5xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-3`}>
                  {stat.value}
                </div>
                <div className="text-gray-600 font-semibold text-lg">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900">
            Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">GrowX Learning</span>?
          </h2>
          <p className="text-center text-gray-600 text-lg mb-12 max-w-2xl mx-auto">
            Everything you need to succeed in your learning journey
          </p>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + idx * 0.1 }}
                className="bg-white p-8 rounded-3xl shadow-lg hover:shadow-2xl transition-all hover:-translate-y-2 border-2 border-gray-100 group"
              >
                <div className="bg-gradient-to-br from-blue-600 to-purple-600 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="text-white" size={32} />
                </div>
                <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-3xl p-16 text-white text-center shadow-2xl"
        >
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"></div>
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Ready to Start Your Journey?</h2>
            <p className="text-xl mb-10 text-blue-100 max-w-2xl mx-auto">
              Join 50,000+ learners transforming their careers with GrowX Learning today
            </p>
            <div className="flex flex-wrap gap-6 justify-center">
              <Link to="/learningVideo">
                <button className="group bg-white text-blue-600 px-12 py-5 rounded-full font-bold text-lg hover:bg-yellow-300 hover:text-blue-700 transition-all shadow-2xl flex items-center gap-3 hover:scale-105">
                  <TrendingUp size={24} className="group-hover:rotate-12 transition-transform" />
                  Explore All Courses
                </button>
              </Link>
              <Link to="/learning">
                <button className="border-3 border-white px-12 py-5 rounded-full font-bold text-lg hover:bg-white hover:text-blue-600 transition-all shadow-xl flex items-center gap-3 hover:scale-105">
                  <BookOpen size={24} />
                  Learn More
                </button>
              </Link>
            </div>
            <p className="mt-8 text-blue-100 text-sm">✨ 30-day money-back guarantee • No credit card required</p>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
