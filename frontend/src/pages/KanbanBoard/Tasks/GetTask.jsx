import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate, useParams } from "react-router-dom";

const API_URL = import.meta.env.VITE_KANBAN_BOARD_API;

export default function GetTask() {
  const { id } = useParams(); // single task ID from URL
  const navigate = useNavigate();

  const [task, setTask] = useState(null);
  const [allTasks, setAllTasks] = useState([]);

  // Fetch all tasks
  const fetchAllTasks = async () => {
    try {
      const response = await axios.get(`${API_URL}/get`);
      setAllTasks(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch tasks 😢");
    }
  };

  // Fetch single task
  const fetchTask = async (taskId) => {
    if (!taskId) return;
    try {
      const response = await axios.get(`${API_URL}/get/${taskId}`);
      setTask(response.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch task 😢");
      setTask(null);
    }
  };

  // Delete task
  const deleteTask = async (taskId) => {
    if (!taskId) return toast.error("Select a task to delete!");
    try {
      await axios.delete(`${API_URL}/delete/${taskId}`);
      toast.success("Task deleted successfully! ✅");
      if (!id) fetchAllTasks(); // refresh list only if viewing all tasks
      else navigate("/getTask"); // go back to all tasks if viewing single
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete task 😢");
    }
  };

  useEffect(() => {
    if (id) fetchTask(id);
    else fetchAllTasks();
  }, [id]);

  const tasksToRender = id && task ? [task] : allTasks;

  return (
    <div className="min-h-screen  px-4 py-10">
      <h2 className="text-3xl font-bold  mb-6 text-center ">
        📋 {id ? "Task Details" : "All Tasks"}
      </h2>

      {!id && (
        <div className="text-center mb-6">
          <button
            type="button"
            onClick={() => navigate("/Taskkanbanboard")}
            className="inline-block bg-pink-500 text-white py-3 px-6 rounded-xl font-semibold hover:bg-pink-600 transition-all shadow-lg"
          >
            📋 Go to Kanban Board
          </button>
        </div>
      )}

      <div className="border-black grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 shadow-md hover:shadow-xl hover:border-black transition-all py-10 px-4 rounded-lg">
        {tasksToRender.map((t) => (
          <div
            key={t._id}
            className="bg-white rounded-xl p-4 shadow-lg flex flex-col justify-between"
          >
            <div>
              <h3 className="text-xl font-bold mb-2">{t.title}</h3>
              <p className="mb-1">
                <strong>Description:</strong> {t.description || "-"}
              </p>
              <p className="mb-1">
                <strong>Status:</strong> {t.status}
              </p>
              <p className="mb-2">
                <strong>Date:</strong>{" "}
                {t.date ? new Date(t.date).toLocaleDateString() : "-"}
              </p>
            </div>

            {!id && (
              <div className="flex gap-2 mt-4 flex-wrap">
                <button
                  onClick={() => navigate(`/getTask/${t._id}`)}
                  className="flex-1 bg-pink-500 text-white py-2 rounded-lg font-semibold hover:bg-pink-600 transition-all"
                >
                  🔍 View
                </button>
                <button
                  onClick={() => navigate(`/updateTask/${t._id}`)}
                  className="flex-1 bg-yellow-500 text-white py-2 rounded-lg font-semibold hover:bg-yellow-600 transition-all"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => deleteTask(t._id)}
                  className="flex-1 bg-red-500 text-white py-2 rounded-lg font-semibold hover:bg-red-600 transition-all"
                >
                  🗑️ Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
