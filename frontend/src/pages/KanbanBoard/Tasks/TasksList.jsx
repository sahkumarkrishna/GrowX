import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";

const API_URL = import.meta.env.VITE_KANBAN_BOARD_API;

const statusConfig = {
  todo: { gradient: "from-blue-500 to-cyan-500", icon: "📋", label: "To Do" },
  thisweek: { gradient: "from-purple-500 to-pink-500", icon: "📅", label: "This Week" },
  inprocess: { gradient: "from-orange-500 to-yellow-500", icon: "⚡", label: "In Process" },
  done: { gradient: "from-green-500 to-emerald-500", icon: "✅", label: "Done" },
};

export default function TasksList() {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${API_URL}/get`);
      setTasks(response.data);
    } catch (error) {
      toast.error("Failed to fetch tasks 😢");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 px-4 py-10 -mt-16">
      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ scale: 1.05, x: -5 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2 bg-white text-gray-800 px-4 py-2 rounded-xl font-bold hover:bg-gray-100 transition-all shadow-md"
      >
        <IoMdArrowRoundBack size={24} />
        Back
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <h2 className="text-4xl md:text-5xl font-black text-gray-800 mb-4">
          🗂️ All Tasks
        </h2>
        <p className="text-gray-600 mb-6">Manage and update your tasks</p>
        <div className="flex justify-center gap-3">
          <button
            onClick={() => navigate("/taskForm")}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all"
          >
            ➕ New Task
          </button>
          <button
            onClick={() => navigate("/Taskkanbanboard")}
            className="bg-gradient-to-r from-pink-600 to-rose-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all"
          >
            📊 Board View
          </button>
        </div>
      </motion.div>

      {tasks.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <p className="text-6xl mb-4">📭</p>
          <p className="text-gray-500 text-lg">No tasks available</p>
        </motion.div>
      ) : (
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task, index) => {
            const config = statusConfig[task.status] || statusConfig.todo;
            return (
              <motion.div
                key={task._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all overflow-hidden"
              >
                <div className={`bg-gradient-to-r ${config.gradient} p-4 text-white`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{config.icon}</span>
                      <span className="font-bold">{config.label}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{task.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{task.description}</p>
                  <p className="text-sm text-gray-500 mb-4">
                    📅 Created: {formatDate(task.createdAt)}
                  </p>

                  <button
                    onClick={() => navigate(`/updateTask/${task._id}`)}
                    className={`w-full bg-gradient-to-r ${config.gradient} text-white py-3 rounded-xl font-bold shadow-md hover:shadow-lg transition-all`}
                  >
                    ✏️ Update Task
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}