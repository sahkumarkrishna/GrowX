import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_KANBAN_BOARD_API;

export default function CreateTask() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("todo");
  const [date, setDate] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !date) {
      toast.error("Please enter both title and date!");
      return;
    }

    const newTask = { title, description, status, date };

    try {
      const response = await axios.post(`${API_URL}/add`, newTask);
      console.log("✅ Task Created:", response.data);
      toast.success("Task added successfully! 🎉");

      // Reset form
      setTitle("");
      setDescription("");
      setStatus("todo");
      setDate("");

      // Navigate to GetTask page with newly created task ID
      navigate(`/getTask/${response.data._id}`);
    } catch (error) {
      console.error("❌ Error creating task:", error);
      toast.error("Failed to create task 😢");
    }
  };

  const statusColors = {
    todo: "bg-blue-100 text-blue-800",
    thisweek: "bg-yellow-100 text-yellow-800",
    inprocess: "bg-orange-100 text-orange-800",
    done: "bg-green-100 text-green-800",
  };

  return (
    <div className="flex justify-center items-start mt-15 min-h-screen bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 px-4 py-10">
      <motion.form
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        onSubmit={handleSubmit}
        className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-3xl p-8 flex flex-col gap-6 w-full max-w-md"
      >
        <h2 className="text-3xl font-extrabold text-white text-center mb-4 drop-shadow-lg">
          ✍️ Add New Task
        </h2>

        {/* Title */}
        <div>
          <label className="block text-white/90 mb-2 font-semibold">Title</label>
          <input
            type="text"
            placeholder="Enter Task Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-4 rounded-xl bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-pink-400"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-white/90 mb-2 font-semibold">Description</label>
          <textarea
            placeholder="Enter Task Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-4 rounded-xl bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-pink-400 resize-none h-24"
          />
        </div>

        {/* Status */}
        <div>
          <label className="block text-white/90 mb-2 font-semibold">Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className={`w-full p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-pink-400 ${statusColors[status]}`}
          >
            <option value="todo" className="text-black">To Do</option>
            <option value="thisweek" className="text-black">This Week</option>
            <option value="inprocess" className="text-black">In Process</option>
            <option value="done" className="text-black">Done</option>
          </select>
        </div>

        {/* Date */}
        <div>
          <label className="block text-white/90 mb-2 font-semibold">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-4 rounded-xl bg-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-pink-400"
            required
          />
        </div>

        {/* Add Task button */}
        <button
          type="submit"
          className="bg-gradient-to-r from-indigo-500 to-pink-500 text-white py-3 rounded-xl font-semibold hover:from-indigo-600 hover:to-pink-600 transition-all shadow-lg hover:shadow-2xl"
        >
          🚀 Add Task
        </button>

        {/* Navigate to Get Task page */}
        <div className="flex flex-col gap-3 mt-2">
          <button
            type="button"
            onClick={() => navigate("/getTask")}
            className="bg-gradient-to-r from-indigo-500 to-pink-500 text-white py-3 rounded-xl font-semibold hover:from-indigo-600 hover:to-pink-600 transition-all shadow-lg hover:shadow-2xl"
          >
            📋 View Tasks
          </button>
        </div>
      </motion.form>
    </div>
  );
}
