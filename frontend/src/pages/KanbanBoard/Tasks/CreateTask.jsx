import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";

const API_URL = import.meta.env.VITE_KANBAN_BOARD_API;

const statusOptions = [
  { value: "todo", label: "To Do", gradient: "from-blue-500 to-cyan-500", icon: "📋", color: "blue" },
  { value: "thisweek", label: "This Week", gradient: "from-purple-500 to-pink-500", icon: "📅", color: "purple" },
  { value: "inprocess", label: "In Process", gradient: "from-orange-500 to-yellow-500", icon: "⚡", color: "orange" },
  { value: "done", label: "Done", gradient: "from-green-500 to-emerald-500", icon: "✅", color: "green" },
];

export default function CreateTask() {
  const [formData, setFormData] = useState({ title: "", description: "", status: "todo", date: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.date) return toast.error("Title and date are required!");

    try {
      const { data } = await axios.post(`${API_URL}/add`, formData);
      toast.success("🎉 Task created successfully!");
      setFormData({ title: "", description: "", status: "todo", date: "" });
      navigate(`/getTask/${data._id}`);
    } catch (error) {
      toast.error("Failed to create task 😢");
    }
  };

  const selectedStatus = statusOptions.find(s => s.value === formData.status);

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

      <div className="flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-2xl"
        >
          {/* Glassmorphism Card */}
          <div className="relative bg-white/10 backdrop-blur-2xl rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 animate-pulse"></div>
            
            {/* Header */}
            <div className={`relative bg-gradient-to-r ${selectedStatus.gradient} p-8 text-white`}>
              <motion.div initial={{ y: -20 }} animate={{ y: 0 }} className="flex items-center gap-4">
                <div className="text-5xl">{selectedStatus.icon}</div>
                <div>
                  <h2 className="text-4xl font-black">Create New Task</h2>
                  <p className="text-white/80 mt-1">Add a task to your board</p>
                </div>
              </motion.div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="relative p-8 space-y-6">
              {/* Title */}
              <div>
                <label className="block text-white font-bold mb-2 text-sm uppercase tracking-wide">Task Title</label>
                <input
                  type="text"
                  placeholder="Enter your task title..."
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full p-4 rounded-xl bg-white/10 border-2 border-white/20 text-white placeholder-white/50 focus:border-white/50 focus:outline-none transition-all backdrop-blur-sm"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-white font-bold mb-2 text-sm uppercase tracking-wide">Description</label>
                <textarea
                  placeholder="Describe your task..."
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full p-4 rounded-xl bg-white/10 border-2 border-white/20 text-white placeholder-white/50 focus:border-white/50 focus:outline-none transition-all resize-none h-32 backdrop-blur-sm"
                />
              </div>

              {/* Status Selection */}
              <div>
                <label className="block text-white font-bold mb-3 text-sm uppercase tracking-wide">Status</label>
                <div className="grid grid-cols-2 gap-3">
                  {statusOptions.map((option) => (
                    <motion.button
                      key={option.value}
                      type="button"
                      onClick={() => setFormData({...formData, status: option.value})}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className={`relative p-4 rounded-xl font-bold transition-all overflow-hidden ${
                        formData.status === option.value
                          ? `bg-gradient-to-r ${option.gradient} text-white shadow-lg shadow-${option.color}-500/50`
                          : "bg-white/10 text-white/70 hover:bg-white/20 border-2 border-white/20"
                      }`}
                    >
                      <span className="text-2xl mr-2">{option.icon}</span>
                      {option.label}
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Date */}
              <div>
                <label className="block text-white font-bold mb-2 text-sm uppercase tracking-wide">Due Date</label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  className="w-full p-4 rounded-xl bg-white/10 border-2 border-white/20 text-white focus:border-white/50 focus:outline-none transition-all backdrop-blur-sm"
                  required
                />
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4">
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`flex-1 bg-gradient-to-r ${selectedStatus.gradient} text-white py-4 rounded-xl font-bold shadow-lg hover:shadow-2xl transition-all`}
                >
                  🚀 Create Task
                </motion.button>
                <motion.button
                  type="button"
                  onClick={() => navigate("/Taskkanbanboard")}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 bg-white/10 backdrop-blur-sm text-white py-4 rounded-xl font-bold hover:bg-white/20 transition-all border-2 border-white/20"
                >
                  📊 Board
                </motion.button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}