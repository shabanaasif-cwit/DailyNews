'use client'; 
import React, { createContext, useState, useEffect, useContext, useCallback } from "react";
import { fetchPosts } from "@/services/api"; 

export const NewsContext = createContext<any>(null);

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
  const [searchQuery, setSearchQuery] = useState(""); 

  const loadData = useCallback(async (category: string) => {
    try {
      setLoading(true);
      setError(null);
      
      // Modification: Ensure 'Home' and 'General' both point to the correct API endpoint
      const apiCategory = (category === "Home" || category === "General") 
        ? "general" 
        : category.toLowerCase();
        
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
    <NewsContext.Provider value={{ 
      posts, 
      loading, 
      error, 
      setSelectedCategory, 
      selectedCategory,
      searchQuery,
      setSearchQuery
    }}>
      {children}
    </NewsContext.Provider>
  );
};

