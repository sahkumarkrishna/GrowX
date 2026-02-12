import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";

const API_URL = import.meta.env.VITE_KANBAN_BOARD_API;

const statusConfig = {
  todo: { 
    bg: "from-blue-500 to-cyan-500", 
    icon: "📋", 
    label: "To Do",
    cardBg: "bg-blue-50 border-blue-200"
  },
  thisweek: { 
    bg: "from-purple-500 to-pink-500", 
    icon: "📅", 
    label: "This Week",
    cardBg: "bg-purple-50 border-purple-200"
  },
  inprocess: { 
    bg: "from-orange-500 to-yellow-500", 
    icon: "⚡", 
    label: "In Process",
    cardBg: "bg-orange-50 border-orange-200"
  },
  done: { 
    bg: "from-green-500 to-emerald-500", 
    icon: "✅", 
    label: "Done",
    cardBg: "bg-green-50 border-green-200"
  },
};

export default function KanbanBoard() {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${API_URL}/get`);
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      toast.error("Failed to fetch tasks 😢");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const groupedTasks = {
    todo: [],
    thisweek: [],
    inprocess: [],
    done: [],
  };

  tasks.forEach((task) => {
    if (groupedTasks[task.status]) groupedTasks[task.status].push(task);
  });

  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
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

      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <h2 className="text-4xl md:text-5xl font-black text-gray-800 mb-4">
          🗂️ Kanban Task Board
        </h2>
        <p className="text-gray-600 mb-6">Organize and track your tasks efficiently</p>
        <div className="flex justify-center gap-3 flex-wrap">
          <button 
            onClick={() => navigate("/taskForm")}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all"
          >
            ➕ Add Task
          </button>
          <button 
            onClick={() => navigate("/getTask")}
            className="bg-white text-gray-800 px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all border border-gray-200"
          >
            📋 View All
          </button>
        </div>
      </motion.div>

      {/* Kanban Columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {Object.keys(groupedTasks).map((status, colIndex) => (
          <motion.div
            key={status}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: colIndex * 0.1 }}
            className="flex flex-col"
          >
            {/* Column Header */}
            <div className={`bg-gradient-to-r ${statusConfig[status].bg} text-white rounded-t-2xl p-4 shadow-lg`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{statusConfig[status].icon}</span>
                  <h3 className="font-bold text-lg">{statusConfig[status].label}</h3>
                </div>
                <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-bold">
                  {groupedTasks[status].length}
                </span>
              </div>
            </div>

            {/* Tasks Container */}
            <div className="bg-white/60 backdrop-blur-sm rounded-b-2xl p-4 shadow-lg flex-1 min-h-[400px] max-h-[70vh] overflow-y-auto">
              <div className="flex flex-col gap-3">
                {groupedTasks[status].length > 0 ? (
                  groupedTasks[status].map((task, index) => (
                    <motion.div
                      key={task._id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.02, y: -2 }}
                      className={`${statusConfig[status].cardBg} border-2 p-4 rounded-xl shadow-md hover:shadow-lg transition-all cursor-pointer`}
                      onClick={() => navigate(`/getTask/${task._id}`)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-base font-bold text-gray-800 flex-1 pr-2">
                          {task.title}
                        </h4>
                      </div>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {task.description}
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          📅 {task.date ? formatDate(task.date) : formatDate(task.createdAt)}
                        </span>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="text-center py-12 text-gray-400">
                    <p className="text-4xl mb-2">📭</p>
                    <p className="text-sm">No tasks yet</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}