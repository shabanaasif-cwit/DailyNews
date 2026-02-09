//When use navigate this loader should appear

export default function Loading() {
  return (
    // MODIFICATION: Set min-h-[60vh] to prevent the footer from jumping up while content loads
    <div className="max-w-6xl mx-auto px-4 py-32 flex flex-col items-center justify-center min-h-[60vh]">
      
      {/* MODIFICATION: Enhanced the spinner with a double ring effect for a more premium look */}
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 w-full h-full border-4 border-gray-100 dark:border-gray-800 rounded-full"></div>
        <div className="absolute inset-0 w-full h-full border-4 border-transparent border-t-orange-600 rounded-full animate-spin"></div>
      </div>

      {/* MODIFICATION: Updated text styling to match your header's font-black and uppercase theme */}
      <div className="mt-8 flex flex-col items-center space-y-2">
        <p className="text-[#121417] dark:text-white font-black uppercase tracking-tighter text-xl animate-pulse">
          Updating <span className="text-orange-600 italic">Daily</span> News
        </p>
        <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em] animate-pulse delay-75">
          Fetching latest news...
        </p>
      </div>
    </div>
  );
}