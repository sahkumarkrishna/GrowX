import React from 'react';
import { Code, Terminal, Sparkles } from 'lucide-react';

const ProblemSlove = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 flex items-center justify-center px-4">
            <div className="max-w-2xl w-full text-center">
                <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-2xl border-2 border-gray-200 p-8 sm:p-12">
                    <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
                        <Code className="h-10 w-10 text-white" />
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4">
                        Online Coding
                    </h1>
                    <p className="text-gray-600 text-lg mb-6">
                        Coming Soon!
                    </p>
                    <div className="flex items-center justify-center gap-2 text-purple-600">
                        <Sparkles className="h-5 w-5 animate-pulse" />
                        <span className="font-semibold">We're building something amazing</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProblemSlove;
