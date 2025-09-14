import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaPlay, FaFileAlt } from "react-icons/fa";

export default function About() {
    const navigate = useNavigate();

    const handleBuild = () => navigate("/Resumebuilder");
    const handleTemplates = () => navigate("/templates");

    return (
        <section className="bg-gradient-to-r from-slate-100 via-slate-100 to-slate-100 pt-0 pb-16">
            <div className="container mx-auto px-6">
                {/* H1 */}
                <motion.h2
                    initial={{ opacity: 0, y: -40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-4xl md:text-6xl font-extrabold text-gray-900 drop-shadow-lg leading-tight mb-6 text-center md:text-left "
                >
                    <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent ml-0 md:ml-20">
                        About
                    </span>
                </motion.h2>


                {/* Flex container */}
                <div className="flex flex-col md:flex-row items-center gap-10">
                    {/* Left: Text */}
                    <motion.div
                        initial={{ opacity: 0, x: -60 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                        className="flex-1 order-2 md:order-1"
                    >
                        <p className="text-gray-700 text-lg mb-4 drop-shadow-md ml-0 md:ml-20 text-center md:text-left">
                            Build your perfect resume with our professional resume builder —
                            designed to help you stand out in today’s competitive job market.
                            Whether you are a fresher entering the workforce or an experienced
                            professional aiming for your next big role, our platform makes it
                            simple and effective.
                        </p>

                        <p className="text-gray-700 text-lg drop-shadow-md mb-4 ml-0 md:ml-20 text-center md:text-left">
                            With ATS-friendly templates, recruiter-approved designs, and easy
                            customization, you can create a polished resume in just minutes.
                            Highlight your skills, achievements, and career goals while
                            ensuring maximum visibility to hiring managers.
                        </p>

                        {/* Buttons */}
                        <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4 mt-6 ml-0 md:ml-20">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleBuild}
                                className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:from-blue-700 hover:to-purple-700 transition w-full sm:w-auto"
                            >
                                <FaPlay /> Start Building
                            </motion.button>

                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleTemplates}
                                className="flex items-center justify-center gap-2 bg-gray-200 text-gray-800 px-6 py-3 rounded-lg font-semibold hover:bg-gray-300 transition w-full sm:w-auto"
                            >
                                <FaFileAlt /> View Templates
                            </motion.button>
                        </div>
                    </motion.div>

                    {/* Right: Resume Mockup */}
                    <motion.div
                        initial={{ opacity: 0, x: 60 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                        className="w-full md:w-1/2 lg:w-5/12 order-1 md:order-2"
                    >
                        <motion.div
                            animate={{ y: [0, -15, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            whileHover={{ scale: 1.03 }}
                            className="relative bg-white rounded-2xl shadow-2xl p-6 border border-gray-200"
                        >
                            {/* Profile */}
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-500 to-pink-500"></div>
                                <div>
                                    <div className="h-3 w-28 bg-gray-300 rounded mb-2"></div>
                                    <div className="h-2 w-20 bg-gray-200 rounded"></div>
                                </div>
                            </div>

                            {/* Skills */}
                            <div className="mb-6">
                                <div className="h-3 w-1/3 bg-purple-500 rounded mb-3"></div>
                                <div className="flex flex-wrap gap-3">
                                    <div className="h-6 w-20 bg-purple-200 rounded-lg"></div>
                                    <div className="h-6 w-20 bg-purple-200 rounded-lg"></div>
                                    <div className="h-6 w-20 bg-purple-200 rounded-lg"></div>
                                </div>
                            </div>

                            {/* Experience */}
                            <div className="mb-6">
                                <div className="h-3 w-1/4 bg-pink-500 rounded mb-3"></div>
                                <div className="space-y-2">
                                    <div className="h-2 w-3/4 bg-gray-200 rounded"></div>
                                    <div className="h-2 w-2/3 bg-gray-200 rounded"></div>
                                    <div className="h-2 w-4/5 bg-gray-200 rounded"></div>
                                </div>
                            </div>

                            {/* Education */}
                            <div className="mb-6">
                                <div className="h-3 w-1/5 bg-blue-500 rounded mb-3"></div>
                                <div className="space-y-2">
                                    <div className="h-2 w-2/3 bg-gray-200 rounded"></div>
                                    <div className="h-2 w-1/2 bg-gray-200 rounded"></div>
                                </div>
                            </div>

                            {/* Responsive Tags */}
                            <div className="flex flex-wrap gap-3 mb-6 justify-center md:justify-start">
                                <div className="px-4 py-2 rounded-full bg-purple-100 text-purple-600 text-sm font-medium">
                                    Experience
                                </div>
                                <div className="px-4 py-2 rounded-full bg-purple-100 text-purple-600 text-sm font-medium">
                                    Skills
                                </div>
                                <div className="px-4 py-2 rounded-full bg-purple-100 text-purple-600 text-sm font-medium">
                                    Education
                                </div>
                            </div>

                            {/* Floating decorations */}
                            <div className="absolute -left-4 top-1/3 w-4 h-4 bg-green-400 rounded-full"></div>
                            <div className="absolute -right-3 top-1/2 w-0 h-0 border-t-[10px] border-b-[10px] border-l-[15px] border-transparent border-l-red-500"></div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
