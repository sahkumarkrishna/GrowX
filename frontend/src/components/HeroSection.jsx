import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Briefcase, ArrowRight } from 'lucide-react';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchJobHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate('/browse');
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 text-white py-20 px-4  ">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"></div>
      
      <div className="max-w-7xl mx-auto relative z-10  ">
        <div className="grid md:grid-cols-2 gap-12 iHeroSectiontems-center">
          <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Find Your Dream <span className="text-amber-300">Career</span>
            </h1>
            <p className="text-xl mb-8 text-emerald-100">
              Discover thousands of job opportunities from top companies. Connect with employers and take the next step in your career journey.
            </p>
            
            {/* Search Bar */}
            <div className="bg-white rounded-full p-2 shadow-2xl mb-8">
              <div className="flex items-center gap-2">
                <Search className="ml-4 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search jobs by title, company..."
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && searchJobHandler()}
                  className="flex-1 px-2 py-3 text-gray-900 outline-none"
                />
                <Button 
                  onClick={searchJobHandler}
                  className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 rounded-full px-8 py-3"
                >
                  Search
                </Button>
              </div>
            </div>

            <div className="flex gap-8">
              <div>
                <div className="text-3xl font-bold">1000+</div>
                <div className="text-emerald-200">Active Jobs</div>
              </div>
              <div>
                <div className="text-3xl font-bold">500+</div>
                <div className="text-emerald-200">Companies</div>
              </div>
              <div>
                <div className="text-3xl font-bold">10K+</div>
                <div className="text-emerald-200">Job Seekers</div>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay: 0.2 }} className="relative">
            <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
              <div className="absolute -top-4 -right-4 bg-amber-400 text-emerald-900 px-4 py-2 rounded-full font-bold text-sm">
                💼 Hiring Now
              </div>
              <img src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=600&h=400&fit=crop" alt="Job Portal" className="rounded-2xl shadow-2xl" />
              <div className="mt-6 flex items-center gap-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-400 to-teal-400 border-2 border-white"></div>
                  ))}
                </div>
                <div className="text-sm">
                  <div className="font-semibold">Join 10,000+ job seekers</div>
                  <div className="text-emerald-200">Start your search today</div>
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
