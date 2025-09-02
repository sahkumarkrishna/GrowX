import React from 'react';

const Features = () => {
    return (
        <div>
            {/* Features Section */}
            <section className="py-24 px-4 bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100">
                <h2 className="text-4xl font-bold text-center mb-16 text-blue-900 underline decoration-purple-600 decoration-4">
                    Features
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
                    <div className="bg-gradient-to-br from-blue-500 to-indigo-500 text-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
                        <h3 className="text-2xl font-semibold mb-4">Interactive Quizzes</h3>
                        <p>
                            Take engaging quizzes with instant feedback to test and strengthen your knowledge across various topics.
                        </p>
                    </div>
                    <div className="bg-gradient-to-br from-purple-500 to-pink-500 text-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
                        <h3 className="text-2xl font-semibold mb-4">Progress Tracking</h3>
                        <p>
                            Track your quiz performance over time with detailed analytics and personalized progress reports.
                        </p>
                    </div>
                    <div className="bg-gradient-to-br from-green-500 to-teal-500 text-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
                        <h3 className="text-2xl font-semibold mb-4">Community Challenges</h3>
                        <p>
                            Compete with friends and the community by participating in timed challenges and leaderboard competitions.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Features;
