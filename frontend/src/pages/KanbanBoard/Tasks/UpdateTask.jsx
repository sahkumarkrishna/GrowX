import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useParams, useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_KANBAN_BOARD_API;

export default function UpdateTask({ onTaskUpdated }) {
  const { id } = useParams(); // get task ID from URL
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

  // Fetch the task by ID
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
        .catch((err) => {
          console.error(err);
          toast.error("Failed to fetch task 😢");
        });
    }
  }, [id]);

  // Format the date nicely
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const handleUpdate = async () => {
    try {
      const updatedTask = { title, description, status };
      await axios.put(`${API_URL}/update/${id}`, updatedTask);
      toast.success("Task updated successfully! 🎉");
      setIsEditing(false);
      if (onTaskUpdated) onTaskUpdated();
      navigate("/getTask"); // Navigate back to all tasks after update
    } catch (error) {
      console.error("Error updating task:", error);
      toast.error("Failed to update task 😢");
    }
  };

  if (!task)
    return <p className="text-white text-center mt-10">Loading task...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 px-4 py-10 flex justify-center">
      <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-lg">
        <h2 className="text-2xl font-bold mb-4">✏️ Update Task</h2>

        {isEditing ? (
          <div className="flex flex-col gap-3">
            <input
              className="p-2 rounded border"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              className="p-2 rounded border"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <select
              className={`p-2 rounded ${statusColors[status]}`}
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
                className="bg-green-500 px-4 py-2 rounded text-white font-semibold hover:bg-green-600 transition-all"
                onClick={handleUpdate}
              >
                Save
              </button>
              <button
                className="bg-red-500 px-4 py-2 rounded text-white font-semibold hover:bg-red-600 transition-all"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <div>
            <p>
              <strong>Title:</strong> {task.title}
            </p>
            <p>
              <strong>Description:</strong> {task.description || "-"}
            </p>
            <p>
              <strong>Status:</strong> {task.status}
            </p>
            <p>
              <strong>Created On:</strong> {formatDate(task.createdAt)}
            </p>

            <button
              className="mt-4 bg-yellow-500 px-4 py-2 rounded text-white font-semibold hover:bg-yellow-600 transition-all"
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
