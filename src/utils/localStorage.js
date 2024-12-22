const TODOS_STORAGE_KEY = "todos_app_data";

export const getStoredTodos = () => {
  try {
    const storedTodos = localStorage.getItem(TODOS_STORAGE_KEY);
    return storedTodos ? JSON.parse(storedTodos) : [];
  } catch (error) {
    console.error("Error reading from localStorage:", error);
    return [];
  }
};

export const storeTodos = (todos) => {
  try {
    localStorage.setItem(TODOS_STORAGE_KEY, JSON.stringify(todos));
  } catch (error) {
    console.error("Error writing to localStorage:", error);
  }
};
