import React, { useState } from "react";

const ErrorTest = () => {
  const [throwError, setThrowError] = useState(false);

  if (throwError) {
    throw new Error("This is a test error from ErrorTest component");
  }

  return (
    <div className="max-w-2xl mx-auto text-center">
      <h1 className="text-2xl font-bold mb-6">Error Boundary Test Page</h1>
      <p className="mb-8 text-gray-600">
        Click the button below to simulate an error and test the Error Boundary
      </p>
      <button
        onClick={() => setThrowError(true)}
        className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors"
      >
        Trigger Error
      </button>
    </div>
  );
};

export default ErrorTest;
