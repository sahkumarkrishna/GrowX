import { motion } from "framer-motion";

export default function StatsSection() {
  const stats = [
    { value: "500+", label: "Tasks Managed" },
    { value: "50+", label: "Projects Created" },
    { value: "100%", label: "Team Collaboration" },
    { value: "24/7", label: "Real-Time Updates" },
  ];

  return (
    <section className="py-16">
      <div className="max-w-5xl mx-auto px-6 sm:px-12 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-center">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: i * 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <h3 className="text-4xl sm:text-5xl font-extrabold bg-gradient-to-r from-pink-400 to-yellow-400 bg-clip-text text-transparent">
              {stat.value}
            </h3>
            <p className="text-gray-400 mt-2 text-sm sm:text-base">
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
