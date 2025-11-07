import React from "react";

const TaskCard = ({ title, description, date }) => {
  return (
    <div className="p-4 bg-white rounded-2xl shadow-md hover:shadow-lg transition">
      <h3 className="text-lg font-semibold text-green-700">{title}</h3>
      <p className="text-gray-600">{description}</p>
      {date && <p className="text-sm text-gray-400 mt-2">📅 {date}</p>}
    </div>
  );
};

export default TaskCard;
