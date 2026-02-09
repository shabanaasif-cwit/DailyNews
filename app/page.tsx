'use client'; 

import React, { useEffect, useState, useMemo } from "react";
import Card from "@/components/common/card"; 
import Button from "@/components/common/button";
import Loading from "@/components/common/loading"; 
import ErrorMessage from "@/components/common/errormessage"; 
import EmptyState from "@/components/common/emptystate"; // Added EmptyState
import { useNews } from "@/hooks/useNews"; 

export default function Home() {
  const { posts, loading, error, setSelectedCategory, searchQuery } = useNews();
  
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest" | "a-z" | "z-a">("newest");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12; 

  useEffect(() => {
    setSelectedCategory("Home");
  }, [setSelectedCategory]);

  // MODIFICATION: Filter posts by search query, then sort thems
  const filteredAndSortedPosts = useMemo(() => {
    if (!posts) return [];
    
    // 1. Filter logic
    const filtered = posts.filter((post: any) => {
      const query = searchQuery.toLowerCase();
      return (
        post.title?.toLowerCase().includes(query) || 
        post.excerpt?.toLowerCase().includes(query)
      );
    });

    // 2. Sort logic
    return [...filtered].sort((a, b) => {
      switch (sortOrder) {
        case "newest": return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
        case "oldest": return new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime();
        case "a-z": return a.title.localeCompare(b.title);
        case "z-a": return b.title.localeCompare(a.title);
        default: return 0;
      }
    });
  }, [posts, sortOrder, searchQuery]); // Added searchQuery as dependency

  const totalPages = Math.ceil(filteredAndSortedPosts.length / itemsPerPage);

  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedPosts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSortedPosts, currentPage]);

  // Reset to page 1 when searching
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 bg-white dark:bg-[#121417]">
      {/* Header Section */}
      <div className="border-l-4 border-orange-600 pl-4 mb-10 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black uppercase tracking-tighter text-[#121417] dark:text-white">
            {searchQuery ? `Search: ${searchQuery}` : 'Latest Stories'}
          </h1>
        </div>
        {/* Sort Select UI remains same... */}
      </div>

      {filteredAndSortedPosts.length === 0 ? (
        <EmptyState message={`We couldn't find any articles matching "${searchQuery}"`} />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            
            {paginatedPosts.map((article: any, index: number) => (
              <Card key={article.id || index} {...article} onAction={() => window.open(article.url, "_blank")} />
            ))}
          </div>
          {/* Pagination UI remains same... */}
        </>
      )}
    </div>
  );
}

