import React from "react";

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 rounded-full border-4 border-gray-300 border-t-violet-600 animate-spin"></div>
        <p className="text-gray-600">Loading...</p>
      </div>
    </div>
  );
};

export default Loader;
