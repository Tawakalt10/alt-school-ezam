import React from "react";
import { Link } from "react-router-dom";

const TodoItem = ({ todo, onEdit, onDelete, onToggleComplete }) => {
  return (
    <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-sm">
      <div className="flex items-center flex-1">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => onToggleComplete(todo.id, !todo.completed)}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
        />
        <Link to={`/todos/${todo.id}`} className="ml-3 flex-1">
          <span
            className={`${
              todo.completed ? "line-through text-gray-500" : "text-gray-900"
            }`}
          >
            {todo.title}
          </span>
        </Link>
      </div>
      <div className="flex items-center space-x-2 ml-4">
        <button
          onClick={() => onEdit(todo)}
          className="text-blue-600 hover:text-blue-700 px-2 py-1"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(todo.id)}
          className="text-red-600 hover:text-red-700 px-2 py-1"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoItem;