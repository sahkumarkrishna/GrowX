import { motion } from 'framer-motion';
import { Play, X } from 'lucide-react';
import { useState } from 'react';

export default function WatchDemo() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <section id="watch-demo" className="py-20 px-4 bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              See How It Works
            </h2>
            <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
              Watch our quick demo to learn how GrowX Kanban Board can transform your workflow
            </p>
            <button
              onClick={() => setIsOpen(true)}
              className="inline-flex items-center gap-3 bg-white text-blue-600 px-10 py-5 rounded-full font-bold text-lg hover:bg-yellow-300 hover:text-blue-700 transition-all shadow-2xl hover:scale-105"
            >
              <Play size={24} fill="currentColor" />
              Watch Demo Video
            </button>
          </motion.div>
        </div>
      </section>

      {/* Video Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4" onClick={() => setIsOpen(false)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative w-full max-w-5xl bg-gray-900 rounded-3xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 z-10 bg-white/10 hover:bg-white/20 backdrop-blur-lg p-3 rounded-full transition-all"
            >
              <X className="text-white" size={24} />
            </button>
            <div className="aspect-video">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/Xm4BObh4MhI"
                title="Kanban Board Demo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
}
