import React from "react";
import Task from "./Task"; // Import the Task component

export default function Column({ status, tasks }) {
  const colors = {
    todo: "bg-blue-100",
    "in-progress": "bg-yellow-100",
    done: "bg-green-100",
  };

  return (
    <div className={`flex-1 rounded-lg p-4 shadow-md min-h-[300px] ${colors[status]}`}>
      <h2 className="text-lg font-bold mb-4 capitalize">{status}</h2>
      <div className="flex flex-col gap-3">
        {tasks.map((task, index) => (
          <Task key={task._id} task={task} index={index} />
        ))}
      </div>
    </div>
  );
}
