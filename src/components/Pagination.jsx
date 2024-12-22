import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div
      className="flex justify-center space-x-2 mt-4"
      role="navigation"
      aria-label="Pagination"
    >
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 border rounded-md disabled:opacity-50"
        aria-label="Previous page"
      >
        Previous
      </button>

      <span className="px-4 py-2" aria-current="page">
        Page {currentPage} of {totalPages}
      </span>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 border rounded-md disabled:opacity-50"
        aria-label="Next page"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
