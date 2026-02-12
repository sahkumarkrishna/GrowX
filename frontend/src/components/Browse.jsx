import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { Search, Briefcase, Loader2 } from 'lucide-react';

const Browse = () => {
  useGetAllJobs();
  const { allJobs, loading } = useSelector((store) => store.job);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(''));
    };
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-emerald-50 to-teal-50 py-12 -mt-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-600 flex items-center justify-center shadow-lg">
              <Search className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-4xl md:text-5xl text-gray-900">
                Browse <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Jobs</span>
              </h1>
              <p className="text-lg text-gray-600 mt-1">
                {allJobs.length} {allJobs.length === 1 ? 'opportunity' : 'opportunities'} available
              </p>
            </div>
          </div>
        </motion.div>

        {/* Content */}
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 opacity-20 animate-ping absolute"></div>
              <Loader2 className="h-20 w-20 text-emerald-600 animate-spin relative" />
            </div>
            <p className="text-gray-600 font-semibold mt-6 text-lg">Loading opportunities...</p>
          </div>
        ) : allJobs.length === 0 ? (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center py-20">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center mb-6">
              <Briefcase className="h-16 w-16 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">No Jobs Found</h3>
            <p className="text-gray-600 text-center max-w-md text-lg">
              We couldn't find any jobs matching your criteria. Try adjusting your search filters.
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {allJobs.map((job, idx) => (
              <motion.div
                key={job._id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <Job job={job} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Browse;
