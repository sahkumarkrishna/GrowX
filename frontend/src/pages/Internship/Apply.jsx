import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, Clock, Award } from 'lucide-react';

const Apply = () => {
    const handleClick = () => {
        window.open(
            'https://docs.google.com/forms/d/176VvemPrVtfnyITpvtihqNp5rVpZrrt2Q1_ISfO73Kk/preview',
            '_blank',
            'noopener,noreferrer'
        );
    };

    const benefits = [
        { icon: CheckCircle, text: "Quick 5-minute application" },
        { icon: Clock, text: "Response within 48 hours" },
        { icon: Award, text: "Certificate upon completion" }
    ];

    return (
        <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-20 mb-10"
        >
            <div className="max-w-5xl mx-auto bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-3xl p-12 text-white relative overflow-hidden shadow-2xl">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"></div>
                
                <div className="relative z-10 text-center">
                    <motion.div
                        initial={{ scale: 0.9 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        className="mb-8"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">
                            Ready to Start Your Journey?
                        </h2>
                        <p className="text-xl text-blue-100 max-w-2xl mx-auto">
                            Submit your details and get started with your internship journey. Join 50+ interns already transforming their careers.
                        </p>
                    </motion.div>

                    <div className="flex flex-wrap justify-center gap-6 mb-10">
                        {benefits.map((benefit, idx) => {
                            const Icon = benefit.icon;
                            return (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="flex items-center gap-2 bg-white/10 backdrop-blur-lg px-4 py-2 rounded-full border border-white/20"
                                >
                                    <Icon size={18} />
                                    <span className="text-sm font-medium">{benefit.text}</span>
                                </motion.div>
                            );
                        })}
                    </div>

                    <motion.button
                        onClick={handleClick}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="group inline-flex items-center gap-3 bg-white text-blue-600 px-10 py-5 rounded-full font-bold text-lg shadow-2xl hover:bg-yellow-300 hover:text-blue-700 transition-all"
                    >
                        <span>🚀 Apply Now</span>
                        <ArrowRight className="group-hover:translate-x-1 transition-transform" size={24} />
                    </motion.button>

                    <p className="mt-6 text-sm text-blue-200">
                        No application fee • Free certificate • Flexible schedule
                    </p>
                </div>
            </div>
        </motion.div>
    );
};

export default Apply;
