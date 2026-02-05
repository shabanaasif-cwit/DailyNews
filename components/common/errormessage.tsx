import { Info } from "lucide-react";

interface ErrorMessageProps {
  title?: string;
  message: string;
}

export default function ErrorMessage({ title = "Notice", message }: ErrorMessageProps) {
  return (
    <div className="w-full bg-[#1a1d21] border-l-4 border-orange-600 p-4 flex gap-4 items-start">
      <Info className="text-orange-600 shrink-0" size={20} />
      <div>
        <h4 className="text-white font-bold text-sm uppercase tracking-tight">{title}</h4>
        <p className="text-gray-400 text-xs mt-1">{message}</p>
      </div>
    </div>
  );
}
