import React from 'react';

const Features = () => {
  return (
    <div>
      {/* Features Section */}
      <section className="py-24 px-4 bg-gradient-to-r from-purple-50 via-pink-50 to-yellow-50">
        <h2 className="text-4xl font-bold text-center mb-16 text-purple-800 underline decoration-pink-500 decoration-4">
          Resume Builder Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          <div className="bg-purple-100 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <h3 className="text-2xl font-semibold mb-4 text-purple-700">Quick Resume Creation</h3>
            <p className="text-purple-800">
              Build professional resumes in minutes with pre-designed templates and smart suggestions for content.
            </p>
          </div>
          <div className="bg-pink-100 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <h3 className="text-2xl font-semibold mb-4 text-pink-700">Customizable Templates</h3>
            <p className="text-pink-800">
              Choose from a variety of modern, ATS-friendly templates and easily customize fonts, colors, and layout to fit your style.
            </p>
          </div>
          <div className="bg-yellow-100 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
            <h3 className="text-2xl font-semibold mb-4 text-yellow-700">Expert Tips & Guidance</h3>
            <p className="text-yellow-800">
              Receive personalized suggestions for optimizing your resume content and highlighting your strengths to impress recruiters.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Features;
