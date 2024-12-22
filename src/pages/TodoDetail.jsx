// import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTodo } from "../hooks/useTodo";

const TodoDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { todo, loading, error } = useTodo(id);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="text-xl text-gray-500">Loading todo details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 text-red-600 p-4 rounded-lg text-center">
        {error}
      </div>
    );
  }

  if (!todo) {
    return (
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Todo not found
        </h2>
        <button
          onClick={() => navigate("/")}
          className="text-blue-500 hover:text-blue-700"
        >
          Back to list
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm p-6">
      <div className="flex justify-between items-start mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Todo #{todo.id}</h2>
        <button
          onClick={() => navigate("/")}
          className="text-gray-500 hover:text-gray-700"
        >
          Back to list
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-2">Title</h3>
          <p className="text-gray-900">{todo.title}</p>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-2">Status</h3>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={todo.completed}
              readOnly
              className="h-5 w-5 rounded border-gray-300 text-blue-600"
            />
            <span
              className={todo.completed ? "text-green-600" : "text-yellow-600"}
            >
              {todo.completed ? "Completed" : "Pending"}
            </span>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium text-gray-700 mb-2">User ID</h3>
          <p className="text-gray-900">#{todo.userId}</p>
        </div>
      </div>
    </div>
  );
};

export default TodoDetail;
