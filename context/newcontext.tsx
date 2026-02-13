// this file is global brain of application
// prevent from prop drilling

'use client'; 

import React, { createContext, useState, useEffect, useContext, useCallback } from "react";
import { fetchPosts } from "@/services/api"; 

//app shares news data across different parts of the site without having to pass props
//When the app first starts, before the API has a chance to fetch anything, the "bucket" is empty (null).
export const NewsContext = createContext<any>(null);

//custom hook
export const useNews = () => {
  const context = useContext(NewsContext);
  if (!context) throw new Error("useNews must be used within a NewsProvider");
  return context;
};

//Transmitter that sends data to your context bucket
export const NewsProvider = ({ children }: { children: React.ReactNode }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("Home");
  const [searchQuery, setSearchQuery] = useState(""); 
  // MODIFICATION: Added sortOrder to global context
  const [sortOrder, setSortOrder] = useState("newest");

  //By using useCallback, you ensure the function is memoized(dont re-render again , render when the something specific changed)
  const loadData = useCallback(async (category: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const apiCategory = (category === "Home" || category === "General") 
        ? "general" 
        : category.toLowerCase();
        
        //wait for the promise, until it fulfil or rejected
      const data = await fetchPosts(apiCategory);
      setPosts(data);
    } catch (err: any) {
      setError("Failed to fetch news. Please check your connection.");
    } finally {
      setLoading(false);
    }
  }, []);
  
// this tell, ONLY RUN the code inside me
  useEffect(() => {
    loadData(selectedCategory);
  }, [selectedCategory, loadData]);

  return (
    <NewsContext.Provider value={{ 
      //value={{ ... }}: This is the Delivery Truck
      //Every variable and function you put inside these double curly braces becomes globally available to any other component in your app.
      posts, 
      loading, 
      error, 
      setSelectedCategory, 
      selectedCategory,
      searchQuery,
      setSearchQuery,
      loadData,
      sortOrder,    // MODIFICATION: Exported
      setSortOrder  // MODIFICATION: Exported
    }}>
      {children}
    </NewsContext.Provider>
  );
};

