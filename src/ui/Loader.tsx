//import React from 'react';

function Loader() {
  return (
    <div className="bg-black fixed inset-0 z-50 flex items-center justify-center bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white flex flex-col items-center rounded-lg p-5 shadow-lg">
        <div className="border-lime-600 border-t-transparent h-12 w-12 animate-spin rounded-full border-4"></div>
        <p className="text-gray-700 mt-4 text-lg font-semibold">Loading...</p>
      </div>
    </div>
  );
}

export default Loader;
