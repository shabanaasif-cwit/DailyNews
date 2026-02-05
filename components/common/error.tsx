'use client'; // Required for error components

import { AlertTriangle, RefreshCw } from "lucide-react";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center p-6">
      <div className="bg-red-500/20 p-4 rounded-full mb-4">
        <AlertTriangle size={40} className="text-red-500" />
      </div>
      <h2 className="text-2xl font-black text-white uppercase tracking-tighter mb-2">
        System Error
      </h2>
      <p className="text-gray-400 mb-6 max-w-sm">
        The news feed couldn't be loaded. This usually happens due to a network glitch.
      </p>
      <button
        onClick={() => reset()}
        className="flex items-center gap-2 bg-orange-600 text-white px-6 py-2 font-bold uppercase text-xs tracking-widest hover:bg-orange-700 transition-all"
      >
        <RefreshCw size={14} /> Try Again
      </button>
    </div>
  );
}
