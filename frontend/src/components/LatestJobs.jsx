import React from "react";
import LatestJobCards from "./LatestJobCards";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";

const LatestJobs = () => {
  const { allJobs } = useSelector((store) => store.job);

  return (
    <section className="max-w-7xl mx-auto my-24 px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight"
        >
          <span className="text-[#6A38C2]">Latest & Top</span> Job Openings
        </motion.h1>
        <p className="mt-4 text-lg text-gray-500">
          Find the best roles that match your skills.
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12"
      >
        {allJobs.length <= 0 ? (
          <div className="col-span-full text-center text-gray-400 text-lg font-medium">
            No Job Available
          </div>
        ) : (
          allJobs.slice(0, 6).map((job) => (
            <LatestJobCards key={job._id} job={job} />
          ))
        )}
      </motion.div>
    </section>
  );
};

export default LatestJobs;
