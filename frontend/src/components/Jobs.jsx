import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import FilterCard from './FilterCard';
import Job from './Job';
import { useSelector } from 'react-redux';
import { Briefcase, Filter } from 'lucide-react';

const Jobs = () => {
    const { allJobs, searchedQuery } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allJobs);

    useEffect(() => {
        if (searchedQuery) {
            const filtered = allJobs.filter((job) =>
                job.title.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                job.description.toLowerCase().includes(searchedQuery.toLowerCase()) ||
                job.location.toLowerCase().includes(searchedQuery.toLowerCase())
            );
            setFilterJobs(filtered);
        } else {
            setFilterJobs(allJobs);
        }
    }, [allJobs, searchedQuery]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-emerald-50 to-teal-50 py-12 -mt-16">
            <div className='max-w-7xl mx-auto px-4'>
                {/* Header */}
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
                    <div className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-600 flex items-center justify-center shadow-lg">
                            <Briefcase className="h-8 w-8 text-white" />
                        </div>
                        <div>
                            <h1 className="font-bold text-4xl md:text-5xl text-gray-900">
                                All <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Jobs</span>
                            </h1>
                            <p className="text-lg text-gray-600 mt-1">{filterJobs.length} opportunities available</p>
                        </div>
                    </div>
                </motion.div>

                <div className='flex flex-col lg:flex-row gap-8'>
                    {/* Filter Sidebar */}
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }} 
                        animate={{ opacity: 1, x: 0 }}
                        className='w-full lg:w-1/4'
                    >
                        <div className="sticky top-4">
                            <FilterCard />
                        </div>
                    </motion.div>

                    {/* Jobs Grid */}
                    <div className='flex-1'>
                        {
                            filterJobs.length <= 0 ? (
                                <motion.div 
                                    initial={{ opacity: 0, scale: 0.9 }} 
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="flex flex-col items-center justify-center py-20"
                                >
                                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center mb-6">
                                        <Briefcase className="h-16 w-16 text-gray-400" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 mb-3">No Jobs Found</h3>
                                    <p className="text-gray-600 text-center text-lg">Try adjusting your filters or search criteria</p>
                                </motion.div>
                            ) : (
                                <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8'>
                                    {
                                        filterJobs.map((job, index) => (
                                            <motion.div
                                                key={job?._id}
                                                initial={{ opacity: 0, y: 30 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ duration: 0.3, delay: index * 0.05 }}
                                            >
                                                <Job job={job} />
                                            </motion.div>
                                        ))
                                    }
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Jobs;
