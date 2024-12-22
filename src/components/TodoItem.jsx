import React from "react";
import { Link } from "react-router-dom";

const TodoItem = ({ todo }) => {
  return (
    <Link
      to={`/todos/${todo.id}`}
      className="block p-4 border rounded-lg mb-2 hover:bg-gray-50 transition-colors"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={todo.completed}
            readOnly
            className="h-4 w-4 text-blue-600"
            aria-label={`Todo ${todo.completed ? "completed" : "incomplete"}`}
          />
          <span className={todo.completed ? "line-through text-gray-500" : ""}>
            {todo.title}
          </span>
        </div>
        <span className="text-sm text-gray-500">#{todo.id}</span>
      </div>
    </Link>
  );
};

export default TodoItem;
