import { motion } from 'framer-motion';
import { FileText, Download, Edit, Layout, CheckCircle, Palette, Zap, Share2 } from 'lucide-react';

export default function Features() {
  const features = [
    { icon: Layout, title: 'Multiple Templates', desc: 'Choose from 10+ professionally designed templates', color: 'bg-blue-500' },
    { icon: Edit, title: 'Easy Editing', desc: 'Intuitive editor with real-time preview', color: 'bg-purple-500' },
    { icon: CheckCircle, title: 'ATS-Optimized', desc: 'Pass Applicant Tracking Systems with ease', color: 'bg-green-500' },
    { icon: Download, title: 'PDF Export', desc: 'Download your resume in high-quality PDF', color: 'bg-orange-500' },
    { icon: Palette, title: 'Customizable', desc: 'Personalize colors, fonts, and layouts', color: 'bg-pink-500' },
    { icon: FileText, title: 'Content Guidance', desc: 'Get tips and examples for each section', color: 'bg-yellow-500' },
    { icon: Zap, title: 'Quick Build', desc: 'Create professional resumes in minutes', color: 'bg-indigo-500' },
    { icon: Share2, title: 'Easy Sharing', desc: 'Share your resume link with recruiters', color: 'bg-teal-500' }
  ];

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Everything You Need to <span className="text-blue-600">Stand Out</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our comprehensive resume builder provides all the tools you need to create winning resumes
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
