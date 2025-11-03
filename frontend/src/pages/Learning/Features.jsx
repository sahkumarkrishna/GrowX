import React from 'react';

const Features = () => {
    return (
        <div>
            {/* Features Section */}
            <section className="py-24 px-4 ">
                <h2 className="text-4xl font-bold text-center mb-16 text-purple-900 underline decoration-pink-500 decoration-4">
                    Features
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
                    <div className="bg-purple-50 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
                        <h3 className="text-2xl font-semibold mb-4 text-purple-700">Interactive Tutorials</h3>
                        <p className="text-purple-800">
                            Learn programming step by step with interactive tutorials designed for beginners and advanced learners.
                        </p>
                    </div>
                    <div className="bg-pink-50 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
                        <h3 className="text-2xl font-semibold mb-4 text-pink-700">Hands-on Practice</h3>
                        <p className="text-pink-800">
                            Strengthen your coding skills by solving challenges and building real projects in different programming languages.
                        </p>
                    </div>
                    <div className="bg-blue-50 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
                        <h3 className="text-2xl font-semibold mb-4 text-blue-700">Community Learning</h3>
                        <p className="text-blue-800">
                            Connect with a community of learners and mentors, ask questions, share knowledge, and grow together.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Features;
