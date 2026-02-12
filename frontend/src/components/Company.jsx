import { motion } from 'framer-motion';
import { Star, ArrowRight } from 'lucide-react';
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
    description: "Innovate with the world's leading tech company.",
    rating: 5,
    jobs: 120,
  },
  {
    id: 2,
    name: "Microsoft",
    image: microsoft,
    description: "Build the future of productivity.",
    rating: 5,
    jobs: 95,
  },
  {
    id: 3,
    name: "Amazon",
    image: amazon,
    description: "Deliver customer obsession at scale.",
    rating: 4,
    jobs: 150,
  },
  {
    id: 4,
    name: "Netflix",
    image: netflix,
    description: "Entertain the world with great storytelling.",
    rating: 5,
    jobs: 45,
  },
  {
    id: 5,
    name: "Meta",
    image: meta,
    description: "Create the future of social connection.",
    rating: 4,
    jobs: 80,
  },
  {
    id: 6,
    name: "Apple",
    image: apple,
    description: "Think different. Design beautifully.",
    rating: 5,
    jobs: 110,
  },
  {
    id: 7,
    name: "Adobe",
    image: adobe,
    description: "Empower creativity and digital media.",
    rating: 4,
    jobs: 60,
  },
  {
    id: 8,
    name: "Tesla",
    image: tesla,
    description: "Accelerate the world's transition to sustainable energy.",
    rating: 5,
    jobs: 75,
  },
  {
    id: 9,
    name: "IBM",
    image: IBM,
    description: "Connect the world's professionals.",
    rating: 4,
    jobs: 90,
  },
];

const Company = () => {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-gray-50 to-emerald-50">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Top <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Hiring Companies</span>
          </h2>
          <p className="text-xl text-gray-600">Join industry leaders and shape the future</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {companies.map((company, idx) => (
            <motion.div
              key={company.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="group bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-3 group-hover:scale-110 transition-transform">
                  <img
                    src={company.image}
                    alt={company.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex gap-1">
                  {[...Array(company.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="text-amber-400 fill-amber-400 w-4 h-4"
                    />
                  ))}
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {company.name}
              </h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                {company.description}
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                <span className="text-sm font-semibold text-emerald-600">
                  {company.jobs} Open Positions
                </span>
                <button className="flex items-center gap-2 text-emerald-600 font-semibold hover:gap-3 transition-all">
                  View Jobs
                  <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Company;
