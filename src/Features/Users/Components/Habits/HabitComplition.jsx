import React, { useState } from "react";
import api from "../../../../Api/baseurl";
import { toast } from "react-toastify";

export default function HabitComplition({ id, onSuccess }) {
  const [form, setForm] = useState({
  count: 1,
  notes: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = (await api.post(`habit/${id}/completion`, form, { withCredentials: true })).data;
      toast.success(res.data);
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error("Error completing habit:", err);
      alert("Failed to mark completion. Try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 bg-white rounded-xl shadow-md"
    >
      <h2 className="text-lg font-bold text-gray-800">Mark Habit Completion</h2>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Count
        </label>
        <input
          type="number"
          name="count"
          value={form.count}
          onChange={handleChange}
          min="0"
          className="mt-1 w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Notes
        </label>
        <textarea
          name="notes"
          value={form.notes}
          onChange={handleChange}
          rows="3"
          className="mt-1 w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          placeholder="Add any notes..."
        />
      </div>

      <div className="flex justify-end gap-3">
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
