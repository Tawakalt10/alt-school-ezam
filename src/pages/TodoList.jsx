import React, { useState } from "react";
import { useTodos } from "../hooks/useTodos";
import TodoItem from "../components/TodoItem";
import Pagination from "../components/Pagination";
import TodoFilters from "../components/TodoFilters";
import Modal from "../components/Modal";
import TodoForm from "../components/TodoForm";

const TodoList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletingTodoId, setDeletingTodoId] = useState(null);

  const { todos, loading, error, totalPages, addTodo, updateTodo, deleteTodo } =
    useTodos(currentPage, searchTerm, filterStatus);

  const handleAdd = async (todoData) => {
    await addTodo(todoData);
    setIsAddModalOpen(false);
  };

  const handleEdit = (todo) => {
    setEditingTodo(todo);
    setIsEditModalOpen(true);
  };

  const handleUpdate = async (todoData) => {
    await updateTodo(editingTodo.id, todoData);
    setIsEditModalOpen(false);
    setEditingTodo(null);
  };

  const handleDelete = async () => {
    await deleteTodo(deletingTodoId);
    setIsDeleteModalOpen(false);
    setDeletingTodoId(null);
  };

  const handleToggleComplete = async (id, completed) => {
    await updateTodo(id, { completed });
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center py-8">{error}</div>;
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Todo List</h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
        >
          Add Todo
        </button>
      </div>

      <TodoFilters
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        filterStatus={filterStatus}
        onFilterChange={setFilterStatus}
      />

      <div className="space-y-3">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onEdit={handleEdit}
            onDelete={(id) => {
              setDeletingTodoId(id);
              setIsDeleteModalOpen(true);
            }}
            onToggleComplete={handleToggleComplete}
          />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      {/* Add Todo Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Todo"
      >
        <TodoForm onSubmit={handleAdd} />
      </Modal>

      {/* Edit Todo Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingTodo(null);
        }}
        title="Edit Todo"
      >
        <TodoForm initialData={editingTodo} onSubmit={handleUpdate} />
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setDeletingTodoId(null);
        }}
        title="Delete Todo"
      >
        <div>
          <p className="mb-4">Are you sure you want to delete this todo?</p>
          <div className="flex justify-end space-x-2">
            <button
              onClick={() => {
                setIsDeleteModalOpen(false);
                setDeletingTodoId(null);
              }}
              className="px-4 py-2 text-gray-600 hover:text-gray-700"
            >
              Cancel
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default TodoList;