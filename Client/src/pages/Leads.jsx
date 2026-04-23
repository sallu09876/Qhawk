import React from 'react';

const Leads = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center p-4 sm:p-8 text-gray-900">

      <h1 className="text-3xl font-bold">📊 Leads Page</h1>

      <p className="mt-4 text-gray-600">
        This is the Leads page.
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
          <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="8.5" cy="7" r="4" />
          <line x1="20" y1="8" x2="20" y2="14" />
          <line x1="23" y1="11" x2="17" y2="11" />
        </svg>
      </div>

    </div>
  );
};

export default Leads;