// import React from "react";
import { Link, useLocation } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-lg w-full text-center">
        <h1 className="text-6xl font-extrabold text-gray-900 mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-gray-700 mb-6">
          Page Not Found
        </h2>
        <p className="text-gray-600 mb-2">
          The page{" "}
          <code className="bg-gray-100 px-2 py-1 rounded">
            {location.pathname}
          </code>
        </p>
        <p className="text-gray-600 mb-8">does not exist or was removed.</p>
        <div className="space-x-4">
          <Link
            to="/"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            Go Back Home
          </Link>
          <Link
            to="/error-test"
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-base font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50"
          >
            Test Error Boundary
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
