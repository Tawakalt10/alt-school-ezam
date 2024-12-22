// import { useState, useEffect } from "react";
// import axios from "axios";

// const ITEMS_PER_PAGE = 10;

// export const useTodos = (page = 1, searchTerm = "", filterStatus = "all") => {
//   const [todos, setTodos] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [totalPages, setTotalPages] = useState(0);

//   useEffect(() => {
//     const fetchTodos = async () => {
//       try {
//         setLoading(true);
//         const response = await axios.get(
//           "https://jsonplaceholder.typicode.com/todos"
//         );
//         let filteredData = response.data;

//         // Apply search filter
//         if (searchTerm) {
//           filteredData = filteredData.filter((todo) =>
//             todo.title.toLowerCase().includes(searchTerm.toLowerCase())
//           );
//         }

//         // Apply status filter
//         if (filterStatus !== "all") {
//           filteredData = filteredData.filter((todo) =>
//             filterStatus === "completed" ? todo.completed : !todo.completed
//           );
//         }

//         setTotalPages(Math.ceil(filteredData.length / ITEMS_PER_PAGE));

//         // Calculate pagination slice
//         const startIndex = (page - 1) * ITEMS_PER_PAGE;
//         const endIndex = startIndex + ITEMS_PER_PAGE;
//         const paginatedTodos = filteredData.slice(startIndex, endIndex);

//         setTodos(paginatedTodos);
//         setError(null);
//       } catch (err) {
//         setError("Failed to fetch todos");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchTodos();
//   }, [page, searchTerm, filterStatus]);

//   return { todos, loading, error, totalPages };
// };

import { useState, useEffect } from "react";
import axios from "axios";
import { getStoredTodos, storeTodos } from "../utils/localStorage";

const ITEMS_PER_PAGE = 10;

export const useTodos = (page = 1, searchTerm = "", filterStatus = "all") => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(0);

  // Initial fetch from API and store in localStorage
  useEffect(() => {
    const initializeTodos = async () => {
      try {
        const storedTodos = getStoredTodos();

        if (storedTodos.length === 0) {
          // If no stored todos, fetch from API
          const response = await axios.get(
            "https://jsonplaceholder.typicode.com/todos"
          );
          storeTodos(response.data);
          processData(response.data);
        } else {
          // Use stored todos
          processData(storedTodos);
        }
      } catch (err) {
        setError("Failed to fetch todos");
        setLoading(false);
      }
    };

    initializeTodos();
  }, []);

  // Process data with filters and pagination
  const processData = (data) => {
    let filteredData = data;

    // Apply search filter
    if (searchTerm) {
      filteredData = filteredData.filter((todo) =>
        todo.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (filterStatus !== "all") {
      filteredData = filteredData.filter((todo) =>
        filterStatus === "completed" ? todo.completed : !todo.completed
      );
    }

    setTotalPages(Math.ceil(filteredData.length / ITEMS_PER_PAGE));

    // Calculate pagination slice
    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    const paginatedTodos = filteredData.slice(startIndex, endIndex);

    setTodos(paginatedTodos);
    setLoading(false);
  };

  // Process data whenever filters change
  useEffect(() => {
    const allTodos = getStoredTodos();
    processData(allTodos);
  }, [page, searchTerm, filterStatus]);

  // Function to update a todo
  const updateTodo = async (id, updates) => {
    try {
      const allTodos = getStoredTodos();
      const updatedTodos = allTodos.map((todo) =>
        todo.id === id ? { ...todo, ...updates } : todo
      );
      storeTodos(updatedTodos);
      processData(updatedTodos);
      return true;
    } catch (error) {
      console.error("Error updating todo:", error);
      return false;
    }
  };

  // Function to add a new todo
  const addTodo = async (newTodo) => {
    try {
      const allTodos = getStoredTodos();
      const todoToAdd = {
        ...newTodo,
        id: Math.max(...allTodos.map((t) => t.id), 0) + 1,
      };
      const updatedTodos = [...allTodos, todoToAdd];
      storeTodos(updatedTodos);
      processData(updatedTodos);
      return true;
    } catch (error) {
      console.error("Error adding todo:", error);
      return false;
    }
  };

  // Function to delete a todo
  const deleteTodo = async (id) => {
    try {
      const allTodos = getStoredTodos();
      const updatedTodos = allTodos.filter((todo) => todo.id !== id);
      storeTodos(updatedTodos);
      processData(updatedTodos);
      return true;
    } catch (error) {
      console.error("Error deleting todo:", error);
      return false;
    }
  };

  return {
    todos,
    loading,
    error,
    totalPages,
    updateTodo,
    addTodo,
    deleteTodo,
  };
};
