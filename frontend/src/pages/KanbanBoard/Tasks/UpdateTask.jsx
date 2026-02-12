import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { IoMdArrowRoundBack } from "react-icons/io";

const API_URL = import.meta.env.VITE_KANBAN_BOARD_API;

const statusOptions = [
  { value: "todo", label: "To Do", gradient: "from-blue-500 to-cyan-500", icon: "📋" },
  { value: "thisweek", label: "This Week", gradient: "from-purple-500 to-pink-500", icon: "📅" },
  { value: "inprocess", label: "In Process", gradient: "from-orange-500 to-yellow-500", icon: "⚡" },
  { value: "done", label: "Done", gradient: "from-green-500 to-emerald-500", icon: "✅" },
];

export default function UpdateTask() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("todo");

  useEffect(() => {
    if (id) {
      axios
        .get(`${API_URL}/get/${id}`)
        .then((res) => {
          setTask(res.data);
          setTitle(res.data.title);
          setDescription(res.data.description);
          setStatus(res.data.status);
        })
        .catch(() => toast.error("Failed to fetch task 😢"));
    }
  }, [id]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`${API_URL}/update/${id}`, { title, description, status });
      toast.success("✅ Task updated successfully!");
      setIsEditing(false);
      navigate("/getTask");
    } catch (error) {
      toast.error("Failed to update task 😢");
    }
  };

  if (!task)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-xl">Loading task...</p>
      </div>
    );

  const currentStatus = statusOptions.find(s => s.value === status);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 px-4 py-10 flex justify-center items-center -mt-16 ">
      {/* Back Button - Absolute Position */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        whileHover={{ scale: 1.05, x: -5 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate(-1)}
        className="absolute top-10 left-4 flex items-center gap-2 bg-white text-gray-800 px-4 py-2 rounded-xl font-bold hover:bg-gray-100 transition-all shadow-md z-10 mt-20"
      >
        <IoMdArrowRoundBack size={24} />
        Back
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl"
      >
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/50">
          {/* Header */}
          <div className={`bg-gradient-to-r ${currentStatus.gradient} p-6 text-white`}>
            <div className="flex items-center gap-3">
              <span className="text-4xl">{currentStatus.icon}</span>
              <div>
                <h2 className="text-3xl font-black">✏️ Update Task</h2>
                <p className="text-white/80">Modify task details</p>
              </div>
            </div>
          </div>

          <div className="p-8">
            {isEditing ? (
              <div className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-bold mb-2">Title</label>
                  <input
                    className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:outline-none transition-all"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter task title"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-bold mb-2">Description</label>
                  <textarea
                    className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-indigo-500 focus:outline-none transition-all h-32 resize-none"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter task description"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-bold mb-3">Status</label>
                  <div className="grid grid-cols-2 gap-3">
                    {statusOptions.map((option) => (
                      <motion.button
                        key={option.value}
                        type="button"
                        onClick={() => setStatus(option.value)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className={`p-4 rounded-xl font-bold transition-all ${
                          status === option.value
                            ? `bg-gradient-to-r ${option.gradient} text-white shadow-lg`
                            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                        }`}
                      >
                        <span className="text-xl mr-2">{option.icon}</span>
                        {option.label}
                      </motion.button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex-1 bg-gradient-to-r ${currentStatus.gradient} text-white py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all`}
                    onClick={handleUpdate}
                  >
                    ✅ Save Changes
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 bg-gray-200 text-gray-700 py-4 rounded-xl font-bold hover:bg-gray-300 transition-all"
                    onClick={() => setIsEditing(false)}
                  >
                    ❌ Cancel
                  </motion.button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Title</p>
                  <p className="text-xl font-bold text-gray-800">{task.title}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Description</p>
                  <p className="text-gray-700">{task.description || "No description"}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Status</p>
                  <span className={`inline-block bg-gradient-to-r ${currentStatus.gradient} text-white px-4 py-2 rounded-lg font-bold`}>
                    {currentStatus.icon} {currentStatus.label}
                  </span>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-1">Created On</p>
                  <p className="text-gray-700">{formatDate(task.createdAt)}</p>
                </div>

                <div className="flex gap-3 pt-4">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex-1 bg-gradient-to-r ${currentStatus.gradient} text-white py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all`}
                    onClick={() => setIsEditing(true)}
                  >
                    ✏️ Edit Task
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 bg-gray-200 text-gray-700 py-4 rounded-xl font-bold hover:bg-gray-300 transition-all"
                    onClick={() => navigate("/getTask")}
                  >
                    ← Back
                  </motion.button>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}