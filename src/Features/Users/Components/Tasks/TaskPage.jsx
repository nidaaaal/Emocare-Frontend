import React, { useState } from "react";
import { useTasks } from "./useTasks";
import TaskCard from "./TaskCard";
import Navbar from "../Dashboard/Navbar";

const TaskPage = () => {
  const [view, setView] = useState("today"); // today | past | psychologist
  const { tasks, loading } = useTasks(view);

  return (
    <>
    <Navbar/>
    <div className="p-6 max-w-4xl mx-auto">
      {/* Navigation */}
      <div className="flex justify-around mb-6">
        <button
          onClick={() => setView("today")}
          className={`px-4 py-2 rounded-xl ${view === "today" ? "bg-green-600 text-white" : "bg-gray-200"}`}
        >
          Today’s Task
        </button>
        <button
          onClick={() => setView("past")}
          className={`px-4 py-2 rounded-xl ${view === "past" ? "bg-green-600 text-white" : "bg-gray-200"}`}
        >
          Past Tasks
        </button>
        <button
          onClick={() => setView("psychologist")}
          className={`px-4 py-2 rounded-xl ${view === "psychologist" ? "bg-green-600 text-white" : "bg-gray-200"}`}
        >
          Psychologist Tasks
        </button>
      </div>

      {/* Content */}
      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : tasks.length === 0 ? (
        <p className="text-center text-gray-400">No tasks found.</p>
      ) : (
        <div className="grid gap-4">
          {tasks.map((task, idx) => (
            <TaskCard
              key={idx}
              title={task.title}
              description={task.description}
              date={task.date}
            />
          ))}
        </div>
      )}
    </div>   
    </>
  );
};

export default TaskPage;
