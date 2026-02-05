'use client'; 
import React, { createContext, useState, useEffect, useContext, useCallback } from "react";
import { fetchPosts } from "@/services/api"; // Updated path to match your structure

// Fix TS2554: Added null as initial value
export const NewsContext = createContext<any>(null);

// Fix Build Error: Exported useNews hook
export const useNews = () => {
  const context = useContext(NewsContext);
  if (!context) throw new Error("useNews must be used within a NewsProvider");
  return context;
};

export const NewsProvider = ({ children }: { children: React.ReactNode }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("Home");

  // Fix TS7006: Added type 'string' to category
  const loadData = useCallback(async (category: string) => {
    try {
      setLoading(true);
      setError(null);
      const apiCategory = category === "Home" ? "general" : category.toLowerCase();
      const data = await fetchPosts(apiCategory);
      setPosts(data);
    } catch (err: any) {
      setError("Failed to fetch news. Please check your connection.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData(selectedCategory);
  }, [selectedCategory, loadData]);

  return (
    <NewsContext.Provider value={{ posts, loading, error, setSelectedCategory, selectedCategory }}>
      {children}
    </NewsContext.Provider>
  );
};
