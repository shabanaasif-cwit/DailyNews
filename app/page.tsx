'use client'; 

import React, { useEffect, useState, useMemo } from "react";
import Card from "@/components/common/card"; 
import Button from "@/components/common/button";
import Loading from "@/components/common/loading"; 
import ErrorMessage from "@/components/common/errormessage"; 
import { useNews } from "@/hooks/useNews"; 

export default function Home() {
  const { posts, loading, error, setSelectedCategory } = useNews();
  
  // 1. CORE STATES: Sorting and Pagination
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest" | "a-z" | "z-a">("newest");
  const [visibleCount, setVisibleCount] = useState(6); // Start with 6 articles

  useEffect(() => {
    setSelectedCategory("Home");
  }, [setSelectedCategory]);

  // 2. SORTING LOGIC: (Core functionality preserved)
  const sortedPosts = useMemo(() => {
    if (!posts) return [];
    return [...posts].sort((a, b) => {
      switch (sortOrder) {
        case "newest":
          return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
        case "oldest":
          return new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime();
        case "a-z":
          return a.title.localeCompare(b.title);
        case "z-a":
          return b.title.localeCompare(a.title);
        default:
          return 0;
      }
    });
  }, [posts, sortOrder]);

  // 3. PAGINATION LOGIC: Slice the sorted array based on visibleCount
  const paginatedPosts = useMemo(() => {
    return sortedPosts.slice(0, visibleCount);
  }, [sortedPosts, visibleCount]);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 6); // Load 6 more on each click
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 bg-white dark:bg-[#121417] transition-colors duration-300">
      {/* Page Header Section */}
      <div className="border-l-4 border-orange-600 pl-4 mb-10 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black uppercase tracking-tighter text-[#121417] dark:text-white">
            Latest Stories
          </h1>
          <p className="text-gray-500">Stay updated with DailyNews</p>
        </div>

        <div className="flex items-center gap-4">
          <select 
            className="bg-transparent border border-gray-300 dark:border-gray-800 text-[11px] font-black uppercase tracking-[0.1em] py-2 px-3 rounded cursor-pointer dark:text-white outline-none focus:border-orange-600 transition-colors"
            value={sortOrder}
            onChange={(e) => {
              setSortOrder(e.target.value as any);
              setVisibleCount(6); // Reset pagination when sorting changes
            }}
          >
            <option className="bg-[#121417]" value="newest">Newest</option>
            <option className="bg-[#121417]" value="oldest">Oldest</option>
            <option className="bg-[#121417]" value="a-z">A - Z</option>
            <option className="bg-[#121417]" value="z-a">Z - A</option>
          </select>

          <Button 
            variant="outline" 
            size="sm" 
            className="hidden md:flex cursor-pointer"
            onClick={() => window.location.reload()} 
          >
            Refresh Feed
          </Button>
        </div>
      </div>

      {/* Logic for Loading, Error, and Content states */}
      {loading ? (
        <Loading />
      ) : error ? (
        <ErrorMessage message={error} />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {/* 4. RENDER: Use paginatedPosts instead of sortedPosts */}
            {paginatedPosts.map((article: any, index: number) => (
              <Card 
                key={article.id || index}
                title={article.title}
                subtitle={article.subtitle}
                image={article.image}
                excerpt={article.excerpt}
                author={article.author}
                onAction={() => window.open(article.url, "_blank")}
              />
            ))}
          </div>

          {/* 5. LOAD MORE BUTTON: Only show if there are more posts to load */}
          {visibleCount < sortedPosts.length && (
            <div className="flex justify-center mt-10 mb-20"> 
              <Button 
                variant="primary" 
                size="lg" 
                className="cursor-pointer"
                onClick={handleLoadMore}
              >
                Load More News
              </Button>
            </div>
          )}

          {/* Optional: Show message if all news is loaded */}
          {visibleCount >= sortedPosts.length && sortedPosts.length > 0 && (
            <p className="text-center text-gray-500 italic mt-10 mb-20">
              You've reached the end of the feed.
            </p>
          )}
        </>
      )}
    </div>
  );
}

