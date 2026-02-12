import { motion } from 'framer-motion';
import { CheckSquare, Users, Zap, BarChart, Bell, Calendar, Tag, Archive } from 'lucide-react';

export default function Features() {
  const features = [
    { icon: CheckSquare, title: 'Drag & Drop', desc: 'Intuitive drag-and-drop interface for easy task management', color: 'bg-blue-500' },
    { icon: Users, title: 'Team Collaboration', desc: 'Work together seamlessly with your team in real-time', color: 'bg-purple-500' },
    { icon: Zap, title: 'Real-Time Updates', desc: 'Instant synchronization across all devices and users', color: 'bg-green-500' },
    { icon: BarChart, title: 'Progress Tracking', desc: 'Visual insights into project progress and completion', color: 'bg-orange-500' },
    { icon: Bell, title: 'Notifications', desc: 'Stay updated with task changes and deadlines', color: 'bg-pink-500' },
    { icon: Calendar, title: 'Due Dates', desc: 'Set and track deadlines for all your tasks', color: 'bg-yellow-500' },
    { icon: Tag, title: 'Custom Labels', desc: 'Organize tasks with customizable tags and categories', color: 'bg-indigo-500' },
    { icon: Archive, title: 'Task Archive', desc: 'Keep your board clean by archiving completed tasks', color: 'bg-teal-500' }
  ];

  return (
    <section className="py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Everything You Need to <span className="text-blue-600">Stay Organized</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our comprehensive Kanban board provides all the tools you need to manage tasks efficiently
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
