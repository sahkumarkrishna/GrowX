import { motion } from 'framer-motion';
import { Code, Briefcase, Video, FileText, Users, Trophy, Clock, Target } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Features() {
  const navigate = useNavigate();
  
  const features = [
    { icon: Briefcase, title: 'Real Projects', desc: 'Work on live industry projects and build your portfolio', color: 'bg-blue-500' },
    { icon: Users, title: 'Expert Mentorship', desc: 'Get guidance from experienced professionals', color: 'bg-purple-500' },
    { icon: Trophy, title: 'Certificates', desc: 'Earn industry-recognized completion certificates', color: 'bg-green-500' },
    { icon: Code, title: 'Hands-On Learning', desc: 'Practice with real-world tools and technologies', color: 'bg-orange-500' },
    { icon: Video, title: 'Live Sessions', desc: 'Attend interactive workshops and training', color: 'bg-pink-500' },
    { icon: FileText, title: 'Learning Resources', desc: 'Access comprehensive study materials', color: 'bg-yellow-500' },
    { icon: Clock, title: 'Flexible Schedule', desc: 'Work at your own pace with remote options', color: 'bg-indigo-500' },
    { icon: Target, title: 'Career Support', desc: 'Get job placement assistance and guidance', color: 'bg-teal-500' }
  ];

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Everything You Need to <span className="text-blue-600">Succeed</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our comprehensive internship program provides all the tools and resources you need to excel
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <motion.div key={idx} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.05 }} className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group">
              <div className={`${feature.color} w-14 h-14 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <feature.icon className="text-white" size={28} />
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </motion.div>
          ))}
        </div>


      </div>
    </section>
  );
}
