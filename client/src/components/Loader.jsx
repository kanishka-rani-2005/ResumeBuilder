import React from "react";

const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 backdrop-blur-sm z-50">
      <div className="flex flex-col items-center gap-6 p-8 rounded-2xl bg-white/70 shadow-2xl">
        
        {/* Gradient Spinner */}
        <div className="relative h-16 w-16">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-500 via-pink-500 to-indigo-500 animate-spin"></div>
          <div className="absolute inset-1 rounded-full bg-white"></div>
        </div>

        {/* Animated Dots */}
        <div className="flex gap-2">
          <span className="h-2 w-2 bg-violet-600 rounded-full animate-bounce"></span>
          <span className="h-2 w-2 bg-pink-500 rounded-full animate-bounce [animation-delay:150ms]"></span>
          <span className="h-2 w-2 bg-indigo-500 rounded-full animate-bounce [animation-delay:300ms]"></span>
        </div>

        <p className="text-gray-700 font-medium tracking-wide">Loading, please wait…</p>
      </div>
    </div>
  );
};

export default Loader;
