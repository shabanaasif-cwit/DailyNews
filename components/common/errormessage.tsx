// useCase: When API limit exhaust
// This Notice should appear globally styled

import { Info } from "lucide-react";

interface ErrorMessageProps {
  title?: string;
  message: string;
}

export default function ErrorMessage({ title = "Notice", message }: ErrorMessageProps) {
  return (
    /* MODIFICATION: 
       1. Changed bg-[#1a1d21] to bg-nav (uses your secondary background variable)
       2. Added transition-colors for smooth theme switching
    */
    <div className="w-full bg-nav border-l-4 border-orange-600 p-4 flex gap-4 items-start transition-colors duration-300">
      <Info className="text-orange-600 shrink-0" size={20} />
      <div>
        {/* MODIFICATION: Changed text-white to text-foreground */}
        <h4 className="text-foreground font-bold text-sm uppercase tracking-tight">
          {title}
        </h4>
        {/* MODIFICATION: Used standard gray that works on both modes */}
        <p className="text-gray-500 dark:text-gray-400 text-xs mt-1">
          {message}
        </p>
      </div>
    </div>
  );
}

