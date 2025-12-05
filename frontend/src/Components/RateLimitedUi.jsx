// RateLimitedUi.jsx
import React, { useEffect, useRef } from 'react';
import toast from 'react-hot-toast';

const RateLimitedUi = () => {
  const hasShownToast = useRef(false);

  useEffect(() => {
    if (!hasShownToast.current) {
      toast.error("Failed to load notes");
      hasShownToast.current = true;
    }
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 px-4">
      <div className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 p-8 rounded-2xl shadow-2xl max-w-md w-full text-center space-y-5 border border-red-200 dark:border-red-500">
        <h1 className="text-3xl font-extrabold text-red-600 dark:text-red-400 flex items-center justify-center gap-2">
          <span>🚫</span> <span>Rate Limit Exceeded!</span>
        </h1>
        <p className="text-base leading-relaxed">
          You've made too many requests in a short period. Please wait a moment and try again !
        </p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 px-5 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition duration-300 ease-in-out"
        >
          Retry
        </button>
      </div>
    </div>
  );
};

export default RateLimitedUi;
