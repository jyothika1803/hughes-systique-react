
import React from 'react';

const SharedButton = ({ label }) => {
  return (
    <button
      type="submit"
      className="w-full p-3 bg-gradient-to-r from-blue-700 via-cyan-600 to-cyan-200 text-white rounded-full text-lg font-medium hover:opacity-90 transition"
    >
      {label}
    </button>
  );
};

export default SharedButton;