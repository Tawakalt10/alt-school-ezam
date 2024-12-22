import React from "react";

const TodoFilters = ({
  searchTerm,
  onSearchChange,
  filterStatus,
  onFilterChange,
}) => {
  return (
    <div className="mb-6 space-y-4 sm:space-y-0 sm:flex sm:items-center sm:justify-between">
      <div className="flex-1 max-w-md">
        <label htmlFor="search" className="sr-only">
          Search todos
        </label>
        <div className="relative">
          <input
            type="text"
            id="search"
            placeholder="Search todos..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <label
          htmlFor="status-filter"
          className="text-sm font-medium text-gray-700"
        >
          Status:
        </label>
        <select
          id="status-filter"
          value={filterStatus}
          onChange={(e) => onFilterChange(e.target.value)}
          className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="completed">Completed</option>
        </select>
      </div>
    </div>
  );
};

export default TodoFilters;
