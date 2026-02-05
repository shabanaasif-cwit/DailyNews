export default function Loading() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-20 flex flex-col items-center justify-center">
      {/* A simple spinning loader using Tailwind */}
      <div className="w-12 h-12 border-4 border-gray-800 border-t-orange-600 rounded-full animate-spin mb-4"></div>
      <p className="text-gray-500 font-medium animate-pulse">Fetching latest stories...</p>
    </div>
  );
}