import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";

const API_URL = import.meta.env.VITE_KANBAN_BOARD_API;

// ✅ Softer gray theme colors
const statusColors = {
  todo: "bg-gray-200 border border-gray-400 text-gray-900",
  thisweek: "bg-blue-200 border border-blue-400 text-gray-900",
  inprocess: "bg-yellow-200 border border-yellow-400 text-gray-900",
  done: "bg-green-200 border border-green-400 text-gray-900",
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
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });
  };

  return (
    <div className="min-h-screen px-4 py-10">
  <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-12">
    🗂️ Kanban Task Board
  </h2>

  {/* Columns */}
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
    {Object.keys(groupedTasks).map((status) => (
      <div
        key={status}
        className="w-full bg-violet-200 dark:bg-gray-800 border border-black dark:border-gray-700 rounded-2xl shadow-lg p-4"
      >
        {/* Column Title */}
        <h3 className="font-bold mb-3 text-center text-lg capitalize pb-2 border-b border-black dark:border-gray-700 text-gray-700 dark:text-white">
          {status}
        </h3>

        {/* Tasks List */}
        <div className="flex flex-col gap-3 max-h-[70vh] overflow-y-auto">
          {groupedTasks[status].length > 0 ? (
            groupedTasks[status].map((task) => (
              <div
                key={task._id}
                className={`p-4 rounded-xl shadow-sm ${statusColors[status]}`}
              >
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-lg font-bold text-gray-900">
                    {task.title}
                  </h4>
                  <span className="text-xs text-gray-600">
                    📅 {task.date ? formatDate(task.date) : formatDate(task.createdAt)}
                  </span>
                </div>
                <p className="  text-gray-700 text-base font-semibold">
                  {task.description}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-center text-sm py-6">
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