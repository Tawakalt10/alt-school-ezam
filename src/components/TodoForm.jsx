import React, { useState } from "react";

const TodoForm = ({ onSubmit, initialData = null }) => {
  const [title, setTitle] = useState(initialData?.title || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, completed: initialData?.completed || false });
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Todo Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>
      <div className="flex justify-end">
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          {initialData ? "Update Todo" : "Add Todo"}
        </button>
      </div>
    </form>
  );
};

export default TodoForm;