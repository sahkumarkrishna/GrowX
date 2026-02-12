import React from "react";
import { Globe2, MapPin, Wifi } from "lucide-react";
import map from "../../assets/map1.png";

const ConnectivitySection = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 rounded-full mb-6">
            <Wifi className="w-4 h-4 text-indigo-600" />
            <span className="text-sm font-medium text-indigo-700">Work From Anywhere</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Remote-First
            </span>
            {" "}Internship Experience
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Break free from traditional boundaries. Work from the comfort of your own space while gaining hands-on experience with global teams.
          </p>
        </div>

        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl blur-3xl opacity-10"></div>
          <div className="relative bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-8 shadow-xl">
            <img
              src={map}
              alt="Global connectivity map"
              className="w-full h-auto object-contain rounded-2xl"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          <div className="text-center">
            <div className="inline-flex p-4 bg-gradient-to-br from-indigo-500 to-purple-500 rounded-2xl mb-4">
              <Globe2 className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Global Reach</h3>
            <p className="text-gray-600">Connect with teams across continents</p>
          </div>
          <div className="text-center">
            <div className="inline-flex p-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl mb-4">
              <MapPin className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Your Location</h3>
            <p className="text-gray-600">Work from anywhere you feel comfortable</p>
          </div>
          <div className="text-center">
            <div className="inline-flex p-4 bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl mb-4">
              <Wifi className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Always Connected</h3>
            <p className="text-gray-600">Seamless collaboration tools and support</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ConnectivitySection;
