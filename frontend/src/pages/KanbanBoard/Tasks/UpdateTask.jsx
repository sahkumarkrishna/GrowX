import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useParams, useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_KANBAN_BOARD_API;

export default function UpdateTask({ onTaskUpdated }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [task, setTask] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("todo");

  const statusColors = {
    todo: "bg-blue-100 text-blue-800",
    thisweek: "bg-yellow-100 text-yellow-800",
    inprocess: "bg-orange-100 text-orange-800",
    done: "bg-green-100 text-green-800",
  };

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
    return new Date(dateString).toLocaleDateString("en-GB", {
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
      if (onTaskUpdated) onTaskUpdated();
      navigate("/getTask");
    } catch (error) {
      toast.error("Failed to update task 😢");
    }
  };

  if (!task)
    return <p className="text-white text-center mt-10">Loading task...</p>;

  return (
    <div className="min-h-screen px-4 py-10 flex justify-center">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-xl mt-6 border border-gray-200">
        <h2 className="text-2xl font-bold text-center mb-4">✏️ Update Task</h2>

        {isEditing ? (
          <div className="flex flex-col gap-4">
            <label className="font-semibold text-gray-700">Title</label>
            <input
              className="p-3 rounded border font-medium text-gray-900"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter task title"
            />

            <label className="font-semibold text-gray-700">Description</label>
            <textarea
              className="p-3 rounded border font-medium text-gray-900 h-24"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter task description"
            />

            <label className="font-semibold text-gray-700">Status</label>
            <select
              className={`p-3 rounded font-bold ${statusColors[status]}`}
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="todo">To Do</option>
              <option value="thisweek">This Week</option>
              <option value="inprocess">In Process</option>
              <option value="done">Done</option>
            </select>

            <div className="flex gap-2 mt-2">
              <button
                className="bg-green-600 px-4 py-2 rounded text-white font-bold hover:bg-green-700 transition"
                onClick={handleUpdate}
              >
                ✅ Save
              </button>
              <button
                className="bg-red-500 px-4 py-2 rounded text-white font-bold hover:bg-red-600 transition"
                onClick={() => setIsEditing(false)}
              >
                ❌ Cancel
              </button>
            </div>
          </div>
        ) : (
          <div className="text-lg font-semibold space-y-2">
            <p><span className="font-bold">Title:</span> {task.title}</p>
            <p><span className="font-bold">Description:</span> {task.description || "-"}</p>
            <p><span className="font-bold">Status:</span> {task.status}</p>
            <p><span className="font-bold">Created On:</span> {formatDate(task.createdAt)}</p>

            <button
              className="mt-4 bg-yellow-500 px-4 py-2 rounded text-white font-bold hover:bg-yellow-600 transition"
              onClick={() => setIsEditing(true)}
            >
              ✏️ Edit Task
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
