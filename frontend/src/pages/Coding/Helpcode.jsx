import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const HelpCodePage = () => {
  const messages = [
    "Learn programming from beginner to advanced levels with easy tutorials.",
    "Practice coding exercises and build real projects.",
    "Master algorithms and data structures with guided examples.",
  ];

  const [currentMessage, setCurrentMessage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % messages.length);
    }, 3000); // change message every 3 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen  mt-2">
      {/* Header Section */}
      <header className="flex flex-col items-center justify-center text-center py-28 px-4">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-gray-900 drop-shadow-lg">
          Welcome to HelpCode
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mb-10 max-w-2xl leading-relaxed">
          {messages[currentMessage]}
        </p>
        <Link
          to="https://helpcode-1.onrender.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-12 rounded-full shadow-xl transform hover:scale-105 transition-transform duration-300"
        >
          Visit HelpCode
        </Link>
      </header>

      {/* Features Section */}
      <section className="py-24 px-4 ">
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-900 underline decoration-purple-500 decoration-4">
          Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          <div className="bg-purple-50 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <h3 className="text-2xl font-semibold mb-4 text-purple-800">Coding Tutorials</h3>
            <p className="text-gray-700">{messages[currentMessage]}</p>
          </div>
          <div className="bg-purple-50 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <h3 className="text-2xl font-semibold mb-4 text-purple-800">Problem Solving</h3>
            <p className="text-gray-700">
              Solve coding challenges and improve your skills with real-time examples.
            </p>
          </div>
          <div className="bg-purple-50 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <h3 className="text-2xl font-semibold mb-4 text-purple-800">Community Support</h3>
            <p className="text-gray-700">
              Ask questions and get help from experienced developers in our community.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 px-4 ">
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <h3 className="text-2xl font-semibold mb-4 text-purple-800">Step 1</h3>
            <p className="text-gray-700">Browse tutorials or choose a problem to solve.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <h3 className="text-2xl font-semibold mb-4 text-purple-800">Step 2</h3>
            <p className="text-gray-700">Write code directly in the browser or follow guided examples.</p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <h3 className="text-2xl font-semibold mb-4 text-purple-800">Step 3</h3>
            <p className="text-gray-700">Run your code and see the results instantly. Learn by doing!</p>
          </div>
        </div>
      </section>

      
    </div>
  );
};

export default HelpCodePage;
