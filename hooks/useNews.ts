//used in cat slug

'use client';

import { useContext } from "react";
// Import the context we created in context/newcontext.tsx
import { NewsContext } from "@/context/newcontext";

/**
 * Custom hook to access NewsContext.
 * This resolves the "Export useNews doesn't exist" build error.
 */
export const useNews = () => {
  const context = useContext(NewsContext);

  // Safety check to ensure the hook is used within the Provider
  if (!context) {
    throw new Error("useNews must be used within a NewsProvider. Check your layout.tsx.");
  }

  // Returns: { posts, loading, error, searchQuery, setSearchQuery, setSelectedCategory, selectedCategory, theme, setTheme }
  return context;
};

