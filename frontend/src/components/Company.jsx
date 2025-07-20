import React from 'react';
import { Star } from 'lucide-react';
import google from "../assets/Google.webp";
import microsoft from "../assets/Microsoft.jpg";
import amazon from "../assets/Amazon.png";
import netflix from "../assets/Netflix.webp";
import meta from "../assets/Meta.png";
import apple from "../assets/Apple.webp";
import adobe from "../assets/Adobe.png";
import tesla from "../assets/Tesla.png";
import IBM from "../assets/IBM.png";

export const companies = [
  {
    id: 1,
    name: "Google",
    image: google,
    description: "Innovate with the world’s leading tech company.",
    rating: 5,
  },
  {
    id: 2,
    name: "Microsoft",
    image: microsoft,
    description: "Build the future of productivity.",
    rating: 5,
  },
  {
    id: 3,
    name: "Amazon",
    image: amazon,
    description: "Deliver customer obsession at scale.",
    rating: 4,
  },
  {
    id: 4,
    name: "Netflix",
    image: netflix,
    description: "Entertain the world with great storytelling.",
    rating: 5,
  },
  {
    id: 5,
    name: "Meta",
    image: meta,
    description: "Create the future of social connection.",
    rating: 4,
  },
  {
    id: 6,
    name: "Apple",
    image: apple,
    description: "Think different. Design beautifully.",
    rating: 5,
  },
  {
    id: 7,
    name: "Adobe",
    image: adobe,
    description: "Empower creativity and digital media.",
    rating: 4,
  },
  {
    id: 8,
    name: "Tesla",
    image: tesla,
    description: "Accelerate the world’s transition to sustainable energy.",
    rating: 5,
  },
  {
    id: 9,
    name: "IBM",
    image: IBM,
    description: "Connect the world’s professionals.",
    rating: 4,
  },
];

const Company = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-gray-100 to-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
          🌟 Top Hiring Companies
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {companies.map((company) => (
            <div
              key={company.id}
              className="bg-white rounded-2xl ring-1 ring-gray-200 shadow-lg hover:shadow-xl hover:scale-105 transition-transform p-6 flex flex-col items-center text-center"
            >
              <img
                src={company.image}
                alt={company.name}
                className="w-24 h-24 object-contain mb-4 rounded-xl"
              />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {company.name}
              </h3>
              <p className="text-gray-600 mb-3 text-sm max-w-[250px]">
                {company.description}
              </p>
              <div className="flex items-center justify-center gap-1">
                {[...Array(company.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="text-yellow-400 fill-yellow-400 w-5 h-5 transition-transform hover:scale-125"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Company;
