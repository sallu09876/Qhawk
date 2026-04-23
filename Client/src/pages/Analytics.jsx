import React from 'react';

const Analytics = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-4 sm:p-8 text-gray-900">

      <h1 className="text-3xl font-bold">📈 Analytics Page</h1>

      <p className="mt-4 text-gray-600">
        This is the Analytics page.
      </p>

      <div className="mt-6">
        <svg
          width="40"
          height="40"
          viewBox="0 0 24 24"
          fill="none"
          stroke="black"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="20" x2="18" y2="10" />
          <line x1="12" y1="20" x2="12" y2="4" />
          <line x1="6" y1="20" x2="6" y2="14" />
        </svg>
      </div>

    </div>
  );
};

export default Analytics;