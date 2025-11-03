import { useState, useEffect } from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

export default function FeaturesSection() {
  const features = [
    {
      title: "Visual Task Management",
      description:
        "Organize your workflow efficiently with intuitive Kanban boards and columns.",
      icon: "📋",
    },
    {
      title: "Drag & Drop Tasks",
      description:
        "Easily move tasks between columns to update their status in real-time.",
      icon: "🖐️",
    },
    {
      title: "Priorities & Deadlines",
      description:
        "Assign priorities, due dates, and labels to tasks to stay on top of your work.",
      icon: "⏰",
    },
    {
      title: "Team Collaboration",
      description:
        "Collaborate seamlessly with your team and keep everyone aligned on projects.",
      icon: "👥",
    },
    {
      title: "Instant Notifications",
      description:
        "Receive updates instantly when tasks are added, updated, or completed.",
      icon: "🔔",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % features.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + features.length) % features.length);
  };

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <section className="py-20 ">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-block drop-shadow-md">
          Key Features
        </h2>
        <p className="text-blue-700 mt-3 text-base sm:text-lg font-semibold">
          Explore the powerful features of our Kanban Board. Manage, track, and
          visualize your tasks effortlessly.
        </p>


        <div className="relative mt-12 flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="p-8 w-full sm:w-3/4 lg:w-2/3 rounded-2xl bg-black/10 backdrop-blur-lg border border-black/30 shadow-xl font-bold"
            >
              <div className="text-6xl">{features[currentIndex].icon}</div>
              <h3 className="text-2xl font-semibold mt-4 text-white">
                {features[currentIndex].title}
              </h3>
              <p className="text-orange-700 mt-2 text-sm sm:text-base">
                {features[currentIndex].description}
              </p>
            </motion.div>
          </AnimatePresence>

          <motion.button
            whileHover={{ scale: 1.2, backgroundColor: "rgba(255,255,255,0.2)" }}
            whileTap={{ scale: 0.9 }}
            onClick={prevSlide}
            className="absolute left-2 sm:left-[-3rem] border border-black/100 text-black rounded-full p-4 shadow-lg backdrop-blur-md font-bold"
          >
            <FiArrowLeft size={24} />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.2, backgroundColor: "rgba(255,255,255,0.2)" }}
            whileTap={{ scale: 0.9 }}
            onClick={nextSlide}
            className="absolute right-2 sm:right-[-3rem] border border-black/100 text-black rounded-full p-4 shadow-lg backdrop-blur-md"
          >
            <FiArrowRight size={24} />
          </motion.button>
        </div>

        <div className="flex justify-center mt-6 space-x-2">
          {features.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentIndex ? "bg-white" : "bg-white/50"
                }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
