import { SearchX } from "lucide-react";

export default function EmptyState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <SearchX size={48} className="text-gray-700 mb-4" />
      <h3 className="text-white text-xl font-bold mb-2">No Results Found</h3>
      <p className="text-gray-500">{message}</p>
    </div>
  );
}