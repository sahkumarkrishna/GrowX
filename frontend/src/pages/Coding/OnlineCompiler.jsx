import React from "react";
import { Link } from "react-router-dom";

const OnlineCompilerPage = () => {
  return (
    <div className="relative min-h-[65vh] bg-gradient-to-b from-white to-gray-100 py-20 px-4 sm:px-8 ">
      {/* Header Section */}
      <header className="flex flex-col items-center justify-center text-center py-28 px-4">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 text-gray-900 drop-shadow-lg">
          Online Code Compiler
        </h1>
        <p className="text-lg md:text-xl text-gray-700 mb-10 max-w-2xl leading-relaxed">
          Write, compile, and run your code online instantly. Supports multiple languages and is beginner-friendly!
        </p>
        <Link
          to="https://online-compile-code-1.onrender.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-12 rounded-full shadow-xl transform hover:scale-105 transition-transform duration-300"
        >
          Start Coding Now
        </Link>
      </header>

      {/* Features Section */}
      <section className="py-24 px-4 bg-white">
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-900 underline decoration-blue-500 decoration-4">
          Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          <div className="bg-blue-50 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <h3 className="text-2xl font-semibold mb-4 text-blue-800">Multiple Languages</h3>
            <p className="text-gray-700">
              Compile and run code in JavaScript, Python, Java, C++, and more. Switch languages effortlessly.
            </p>
          </div>
          <div className="bg-blue-50 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <h3 className="text-2xl font-semibold mb-4 text-blue-800">Instant Output</h3>
            <p className="text-gray-700">
              Get immediate results in the console without installing anything on your system.
            </p>
          </div>
          <div className="bg-blue-50 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <h3 className="text-2xl font-semibold mb-4 text-blue-800">Clean Interface</h3>
            <p className="text-gray-700">
              Simple and intuitive design suitable for both beginners and advanced programmers.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-24 px-4 bg-gradient-to-r from-gray-100 via-blue-200 to-blue-300">
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <h3 className="text-2xl font-semibold mb-4 text-blue-800">Step 1</h3>
            <p className="text-gray-700">
              Choose your programming language from the supported list.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <h3 className="text-2xl font-semibold mb-4 text-blue-800">Step 2</h3>
            <p className="text-gray-700">
              Write or paste your code in the editor.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <h3 className="text-2xl font-semibold mb-4 text-blue-800">Step 3</h3>
            <p className="text-gray-700">
              Click run and see the output instantly in the console.
            </p>
          </div>
        </div>
      </section>

     
    </div>
  );
};

export default OnlineCompilerPage;
