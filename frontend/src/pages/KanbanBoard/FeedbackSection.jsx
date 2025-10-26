import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Aman Gupta",
    gender: "Male",
    img: "https://randomuser.me/api/portraits/men/12.jpg",
    text: "The Kanban Board makes managing tasks so much easier! I can visualize everything at a glance.",
    rating: 5,
  },
  {
    name: "Rohit Kumar",
    gender: "Male",
    img: "https://randomuser.me/api/portraits/men/24.jpg",
    text: "Moving tasks between columns is super smooth. It keeps our team aligned and productive.",
    rating: 4,
  },
  {
    name: "Meena Patel",
    gender: "Female",
    img: "https://randomuser.me/api/portraits/women/19.jpg",
    text: "Adding priorities and deadlines helps me stay on top of my work without missing anything.",
    rating: 5,
  },
  {
    name: "Aarav Singh",
    gender: "Male",
    img: "https://randomuser.me/api/portraits/men/45.jpg",
    text: "The real-time updates are amazing. I can see when team members complete or move tasks instantly.",
    rating: 4,
  },
  {
    name: "Priya Verma",
    gender: "Female",
    img: "https://randomuser.me/api/portraits/women/30.jpg",
    text: "Customizing columns to match our workflow has made task management much more efficient.",
    rating: 4,
  },
  {
    name: "Karan Mehta",
    gender: "Male",
    img: "https://randomuser.me/api/portraits/men/52.jpg",
    text: "This Kanban Board keeps our projects organized and our team on the same page. Highly recommend!",
    rating: 5,
  },
];

export default function FeedbackSection() {
  return (
    <section className="bg-gradient-to-r from-pink-500 to-orange-400 text-white py-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl sm:text-5xl font-extrabold mb-12 drop-shadow-md">
          🌟 What Our Users Say
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="rounded-2xl bg-white/90 text-gray-800 p-6 shadow-lg hover:shadow-2xl transition transform"
            >
              {/* User Info */}
              <div className="flex items-center gap-4 mb-4">
                <motion.img
                  src={t.img}
                  alt={t.name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-pink-500"
                  whileHover={{ rotate: 10, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                />
                <div>
                  <h3 className="font-semibold text-gray-900">{t.name}</h3>
                  <p className="text-gray-500 text-sm">{t.gender}</p>
                </div>
              </div>

              {/* Feedback */}
              <p className="text-gray-700 mb-4 italic">“{t.text}”</p>

              {/* Rating */}
              <motion.div
                className="flex text-yellow-400 text-lg justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 + i * 0.15 }}
              >
                {Array.from({ length: 5 }).map((_, idx) => (
                  <motion.span
                    key={idx}
                    whileHover={{ scale: 1.3 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {idx < t.rating ? "★" : "☆"}
                  </motion.span>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
