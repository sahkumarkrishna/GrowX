import { motion } from 'framer-motion';
import { FileCheck, ExternalLink, Link2Off } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-amber-600 via-orange-600 to-red-700 text-white py-20 px-4 -mt-16">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Beat the ATS <span className="text-yellow-300">System</span>
            </h1>
            <p className="text-xl mb-8 text-amber-100">
              Check your resume's ATS compatibility score instantly. Get personalized suggestions and increase your chances of landing interviews.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/atschecker/review" className="scroll-smooth">
                <button className="bg-white text-amber-600 px-8 py-4 rounded-full font-semibold hover:bg-yellow-300 hover:text-amber-700 transition-all shadow-lg flex items-center gap-2">
                  <FileCheck size={20} />
                  Check My Resume
                </button>
              </Link>
              <button className="border-2 border-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-amber-600 transition-all flex items-center gap-2">
                <ExternalLink size={20} />
                Learn More
              </button>
            </div>
            <div className="flex gap-8 mt-10">
              <div>
                <div className="text-3xl font-bold">95%</div>
                <div className="text-amber-200">Pass Rate</div>
              </div>
              <div>
                <div className="text-3xl font-bold">Instant</div>
                <div className="text-amber-200">Results</div>
              </div>
              <div>
                <div className="text-3xl font-bold">Free</div>
                <div className="text-amber-200">Analysis</div>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative">
            <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
              <div className="absolute -top-4 -right-4 bg-yellow-400 text-amber-900 px-4 py-2 rounded-full font-bold text-sm">
                ✓ Free Tool
              </div>
              <img src="https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=600&h=400&fit=crop" alt="ATS Checker" className="rounded-2xl shadow-2xl" />
              <div className="mt-6 flex items-center gap-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-400 border-2 border-white"></div>
                  ))}
                </div>
                <div className="text-sm">
                  <div className="font-semibold">Join 10,000+ users</div>
                  <div className="text-amber-200">Check your resume today</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
