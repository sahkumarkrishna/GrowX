import React from 'react';

const Apply = () => {
    const handleClick = () => {
        window.open(
            'https://docs.google.com/forms/d/176VvemPrVtfnyITpvtihqNp5rVpZrrt2Q1_ISfO73Kk/preview',
            '_blank',
            'noopener,noreferrer'
        );
    };

    return (
        <div className="mt-20 flex flex-col items-center">
            <button
                onClick={handleClick}
                className="group relative inline-flex items-center justify-center overflow-hidden rounded-full px-12 py-4 font-semibold tracking-wide text-white shadow-xl transition duration-300 ease-in-out bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-600 focus:outline-none focus-visible:ring-4 focus-visible:ring-purple-300 active:scale-95"
            >
                <span className="absolute inset-0 w-full h-full transform translate-x-1 translate-y-1 bg-black opacity-10 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300 ease-out rounded-full"></span>
                <span className="relative z-10">🚀 Apply Now</span>
            </button>
            <p className="mt-5 text-sm text-gray-500">Submit your details and get started with your internship journey.</p>
        </div>
    );
};

export default Apply;
