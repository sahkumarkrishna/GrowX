import React from "react";
import { motion } from "framer-motion";
import LatestJobCards from "./LatestJobCards";
import { useSelector } from "react-redux";
import { Briefcase, TrendingUp } from "lucide-react";

const LatestJobs = () => {
  const { allJobs } = useSelector((store) => store.job);

  return (
    <section className="max-w-7xl mx-auto my-20 px-4">
      <div className="text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-emerald-100 to-teal-100 px-6 py-3 rounded-full mb-6"
        >
          <TrendingUp className="h-5 w-5 text-emerald-600" />
          <span className="text-sm font-bold text-emerald-700">Hot Opportunities</span>
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl font-bold tracking-tight mb-4"
        >
          <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Latest & Top
          </span>{' '}
          <span className="text-gray-900">Job Openings</span>
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-xl text-gray-600 max-w-2xl mx-auto"
        >
          Find the best roles that match your skills and aspirations
        </motion.p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {allJobs.length <= 0 ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="col-span-full flex flex-col items-center justify-center py-20"
          >
            <div className="w-32 h-32 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-6">
              <Briefcase className="h-16 w-16 text-gray-400" />
            </div>
            <p className="text-gray-500 text-xl font-semibold">No Jobs Available</p>
            <p className="text-gray-400 text-sm mt-2">Check back soon for new opportunities</p>
          </motion.div>
        ) : (
          allJobs.slice(0, 6).map((job, index) => (
            <motion.div
              key={job._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05 * index }}
            >
              <LatestJobCards job={job} />
            </motion.div>
          ))
        )}
      </div>
    </section>
  );
};

export default LatestJobs;
