import React from "react";
import { motion } from "framer-motion";
import aboutImage from "../../assets/Kanban Board Project.jpg";
import { Link } from "react-router-dom";

export default function AboutSection() {
  return (
    <section className=" px-6 py-16"> {/* <-- Added bg color */}
      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-12">

        {/* Text Content */}
        <div className="md:w-1/2 text-left space-y-4">
          <h2 className="text-4xl font-bold leading-tight">
            <span className="text-yellow-400">Efficient Task Management</span>{" "}
          </h2>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <p className="text-lg opacity-90">
              Organize your workflow and manage tasks effortlessly with our intuitive Kanban Board.
            </p>
            <p className="text-base opacity-80">
              Track task progress across multiple columns — from "To Do" to "In Progress" and "Done".
            </p>
            <p className="text-base opacity-80">
              Drag and drop tasks to update status and maintain an up-to-date view of your project.
            </p>
            <p className="text-base opacity-80">
              Assign priorities, due dates, and labels to tasks to improve organization and productivity.
            </p>
            <p className="text-base opacity-80">
              Collaborate with team members in real-time, ensuring everyone stays on the same page.
            </p>
            <p className="text-base opacity-80">
              Ideal for developers, designers, or any team looking for a visual and dynamic task management tool.
            </p>
          </motion.div>

          {/* Button */}
          <Link to="/taskForm">
            <motion.button
              className="flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold shadow-md hover:from-blue-700 hover:to-purple-700 transition w-full sm:w-auto mt-5"

              whileHover={{ scale: 1.1, rotate: 2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300 }}>
              Get Start
            </motion.button>
          </Link>
        </div>

        {/* Image */}
        <motion.div
          className="md:w-1/2"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <motion.img
            src={aboutImage}
            alt="Kanban board project screenshot"
            className="rounded-xl w-full shadow-lg"
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 200 }}
          />
        </motion.div>
      </div>
    </section>
  );
}
