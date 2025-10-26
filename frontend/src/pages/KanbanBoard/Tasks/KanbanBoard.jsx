import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";

const API_URL = import.meta.env.VITE_KANBAN_BOARD_API;

const statusColors = {
  todo: "bg-purple-200/80",
  thisweek: "bg-green-200/80",
  inprocess: "bg-yellow-200/80",
  done: "bg-blue-200/80",
};

export default function KanbanBoard() {
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

  // Group tasks by status
  const groupedTasks = {
    todo: [],
    thisweek: [],
    inprocess: [],
    done: [],
  };

  tasks.forEach((task) => {
    if (groupedTasks[task.status]) groupedTasks[task.status].push(task);
  });

  // ✅ Format date (MM/DD/YYYY format)
  const formatDate = (dateString) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 py-10 px-4">
      <h2 className="text-3xl font-extrabold text-white text-center mb-8 drop-shadow-lg">
        🗂️ Kanban Task Board
      </h2>

      <div
        className="
          grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 
          gap-6 overflow-x-auto sm:overflow-x-visible
          whitespace-nowrap sm:whitespace-normal
        "
      >
        {Object.keys(groupedTasks).map((status) => (
          <div
            key={status}
            className="flex-shrink-0 w-72 sm:w-auto backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-2xl p-4 text-white"
          >
            <h3 className="font-bold mb-3 text-center text-lg capitalize border-b border-white/30 pb-2">
              {status}
            </h3>

            <div className="flex flex-col gap-3 max-h-[70vh] overflow-y-auto">
              {groupedTasks[status].length > 0 ? (
                groupedTasks[status].map((task) => (
                  <div
                    key={task._id}
                    className={`p-4 rounded-xl shadow-md ${statusColors[status]} text-gray-800`}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-semibold">{task.title}</h4>
                      <span className="text-xs text-gray-600">
                        📅 {task.date ? formatDate(task.date) : formatDate(task.createdAt)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700">{task.description}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-300 text-center text-sm py-6">
                  No tasks
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
