import { motion } from 'framer-motion';
import { Target, Users, Award, Zap } from 'lucide-react';

const About = () => {
  const features = [
    { icon: Target, title: 'Targeted Matching', desc: 'AI-powered job recommendations based on your profile' },
    { icon: Users, title: 'Direct Connect', desc: 'Chat directly with hiring managers and recruiters' },
    { icon: Award, title: 'Career Resources', desc: 'Access resume tips, interview guides, and more' },
    { icon: Zap, title: 'Fast Hiring', desc: 'Get hired faster with our streamlined process' }
  ];

  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              Your Gateway to <span className="text-emerald-600">Career Success</span>
            </h2>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              GrowX Job Portal connects talented professionals with leading companies. Our platform combines smart matching technology, 
              verified job listings, and career resources to help you land your dream job faster.
            </p>
            <div className="grid grid-cols-2 gap-6">
              {features.map((feature, idx) => (
                <motion.div key={idx} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.1 }} className="flex items-start gap-3">
                  <div className="bg-emerald-100 p-2 rounded-lg">
                    <feature.icon className="text-emerald-600" size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                    <p className="text-sm text-gray-600">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="relative">
            <div className="relative">
              <img src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&h=700&fit=crop" alt="Job Portal" className="rounded-3xl shadow-2xl w-full h-[500px] object-cover" />
              <div className="absolute -bottom-6 -left-6 bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-6 rounded-2xl shadow-xl">
                <div className="text-3xl font-bold">1000+</div>
                <div className="text-sm">Active Jobs</div>
              </div>
              <div className="absolute -top-6 -right-6 bg-amber-400 text-gray-900 p-6 rounded-2xl shadow-xl">
                <div className="text-3xl font-bold">500+</div>
                <div className="text-sm font-semibold">Companies</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
