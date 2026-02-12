import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { IoMdArrowRoundBack } from "react-icons/io";

const API_URL = import.meta.env.VITE_KANBAN_BOARD_API;

const statusConfig = {
  todo: { gradient: "from-blue-500 to-cyan-500", icon: "📋", label: "To Do", ring: "ring-blue-500" },
  thisweek: { gradient: "from-purple-500 to-pink-500", icon: "📅", label: "This Week", ring: "ring-purple-500" },
  inprocess: { gradient: "from-orange-500 to-yellow-500", icon: "⚡", label: "In Process", ring: "ring-orange-500" },
  done: { gradient: "from-green-500 to-emerald-500", icon: "✅", label: "Done", ring: "ring-green-500" },
};

export default function GetTask() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [allTasks, setAllTasks] = useState([]);
  const [filter, setFilter] = useState("all");

  const fetchAllTasks = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/get`);
      setAllTasks(data);
    } catch (error) {
      toast.error("Failed to fetch tasks");
    }
  };

  const fetchTask = async (taskId) => {
    if (!taskId) return;
    try {
      const { data } = await axios.get(`${API_URL}/get/${taskId}`);
      setTask(data);
    } catch (error) {
      toast.error("Task not found");
      setTask(null);
    }
  };

  const deleteTask = async (taskId) => {
    if (!taskId) return;
    try {
      await axios.delete(`${API_URL}/delete/${taskId}`);
      toast.success("✅ Task deleted!");
      id ? navigate("/getTask") : fetchAllTasks();
    } catch (error) {
      toast.error("Failed to delete");
    }
  };

  useEffect(() => {
    id ? fetchTask(id) : fetchAllTasks();
  }, [id]);

  const tasksToRender = id && task ? [task] : allTasks.filter(t => filter === "all" || t.status === filter);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 px-4 py-10 -mt-16">
      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ scale: 1.05, x: -5 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate(-1)}
        className="mb-6 flex items-center gap-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-xl font-bold hover:bg-white/20 transition-all border border-white/20"
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
        <h2 className="text-5xl md:text-6xl font-black text-white mb-4">
          {id ? "🔍 Task Details" : "📊 All Tasks"}
        </h2>
        <p className="text-white/60 mb-6">Manage your tasks efficiently</p>
        
        {/* Action Buttons */}
        <div className="flex justify-center gap-3 flex-wrap mb-8">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/taskForm")}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-2xl transition-all"
          >
            ➕ New Task
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/Taskkanbanboard")}
            className="bg-gradient-to-r from-pink-600 to-rose-600 text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-2xl transition-all"
          >
            📊 Board View
          </motion.button>
        </div>

        {/* Filter Buttons */}
        {!id && (
          <div className="flex justify-center gap-2 flex-wrap">
            {["all", "todo", "thisweek", "inprocess", "done"].map((f) => (
              <motion.button
                key={f}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg font-bold transition-all ${
                  filter === f
                    ? "bg-white text-slate-900 shadow-lg"
                    : "bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm"
                }`}
              >
                {f === "all" ? "All" : statusConfig[f]?.label}
              </motion.button>
            ))}
          </div>
        )}
      </motion.div>

      {/* Tasks Grid */}
      <AnimatePresence mode="wait">
        {tasksToRender.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-20"
          >
            <p className="text-8xl mb-4">📭</p>
            <p className="text-white/60 text-xl">No tasks found</p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {tasksToRender.map((t, index) => {
              const config = statusConfig[t.status] || statusConfig.todo;
              return (
                <motion.div
                  key={t._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="group relative bg-white/10 backdrop-blur-xl rounded-2xl shadow-xl hover:shadow-2xl transition-all overflow-hidden border border-white/20"
                >
                  {/* Gradient Header */}
                  <div className={`bg-gradient-to-r ${config.gradient} p-5 text-white relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-all"></div>
                    <div className="relative flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{config.icon}</span>
                        <span className="font-bold text-sm uppercase tracking-wide">{config.label}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Content */}
                  <div className="p-6 space-y-4">
                    <h3 className="text-2xl font-black text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:${config.gradient} transition-all">
                      {t.title}
                    </h3>
                    <p className="text-white/70 leading-relaxed line-clamp-3">
                      {t.description || "No description provided"}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-white/50">
                      <span>📅</span>
                      <span>{t.date ? new Date(t.date).toLocaleDateString() : "No date"}</span>
                    </div>

                    {/* Action Buttons */}
                    {!id && (
                      <div className="flex gap-2 pt-4">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => navigate(`/getTask/${t._id}`)}
                          className="flex-1 bg-white/10 backdrop-blur-sm text-white py-2 rounded-lg font-semibold hover:bg-white/20 transition-all border border-white/20"
                        >
                          🔍 View
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => navigate(`/updateTask/${t._id}`)}
                          className={`flex-1 bg-gradient-to-r ${config.gradient} text-white py-2 rounded-lg font-semibold shadow-md hover:shadow-lg transition-all`}
                        >
                          ✏️ Edit
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => deleteTask(t._id)}
                          className="flex-1 bg-red-500/80 backdrop-blur-sm text-white py-2 rounded-lg font-semibold hover:bg-red-600 transition-all"
                        >
                          🗑️
                        </motion.button>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}