import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import UpdateTask from "./UpdateTask";

const API_URL = import.meta.env.VITE_KANBAN_BOARD_API;

export default function TasksList() {
  const [tasks, setTasks] = useState([]);

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

  // Format date (e.g. 26 Oct 2025)
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="p-6 min-h-screen bg-gradient-to-r ">
      <h2 className="text-2xl font-bold mb-6 text-white text-center">
        🗂️ All Tasks
      </h2>

      {tasks.length === 0 ? (
        <p className="text-gray-300 text-center">No tasks available.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task) => (
            <div
              key={task._id}
              className="p-5 bg-white/10 border border-white/20 rounded-2xl shadow-lg hover:shadow-2xl transition-all"
            >
              <h3 className="text-lg font-semibold text-yellow-300">
                {task.title}
              </h3>
              <p className="text-gray-200 mt-2">{task.description}</p>

              <p className="text-sm text-gray-300 mt-2">
                <span className="font-semibold text-white">Status:</span>{" "}
                {task.status}
              </p>

              <p className="text-sm text-gray-300">
                <span className="font-semibold text-white">Created On:</span>{" "}
                {formatDate(task.createdAt)}
              </p>

              {/* Update button */}
              <div className="mt-3">
                <UpdateTask task={task} onTaskUpdated={fetchTasks} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
