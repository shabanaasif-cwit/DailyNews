'use client';

import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { useNews } from "@/hooks/useNews";
import Card from "@/components/common/card";
import Loading from "@/components/common/loading";
import ErrorMessage from "@/components/common/errormessage";
import EmptyState from "@/components/common/emptystate";
import Button from "@/components/common/button";

export default function CategoryPage() {
  const { slug } = useParams();
  
  // MODIFICATION: Added 'sortOrder' to the destructured context to keep UI in sync
  const { posts, loading, error, setSelectedCategory, selectedCategory, searchQuery, sortOrder } = useNews();
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Sync URL slug with Context
  useEffect(() => {
    if (slug) {
      const formatted = slug.toString().charAt(0).toUpperCase() + slug.toString().slice(1);
      setSelectedCategory(formatted);
    }
  }, [slug, setSelectedCategory]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // MODIFICATION: Integrated Sorting logic based on Header's sortOrder
  const filteredAndSortedPosts = useMemo(() => {
    if (!posts) return [];
    
    // 1. Filter by search query
    const query = searchQuery.toLowerCase();
    const filtered = posts.filter((post: any) =>
      post.title?.toLowerCase().includes(query) ||
      post.excerpt?.toLowerCase().includes(query)
    );

    // 2. Sort results based on the global sortOrder from Header
    return [...filtered].sort((a, b) => {
      switch (sortOrder) {
        case "newest": return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
        case "oldest": return new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime();
        case "a-z": return (a.title || "").localeCompare(b.title || "");
        case "z-a": return (b.title || "").localeCompare(a.title || "");
        default: return 0;
      }
    });
  }, [posts, searchQuery, sortOrder]);

  const totalPages = Math.ceil(filteredAndSortedPosts.length / itemsPerPage);
  
  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedPosts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSortedPosts, currentPage]);

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;

  return (
    /* MODIFICATION: Used bg-background and text-foreground for theme switching */
    <div className="max-w-6xl mx-auto px-4 py-12 bg-background text-foreground transition-colors duration-500 min-h-screen">
      
      {/* Header Section */}
      <div className="border-l-4 border-orange-600 pl-4 mb-10">
        <h1 className="text-4xl font-black uppercase tracking-tighter text-foreground capitalize">
          {slug} News {searchQuery && <span className="text-orange-600 ml-2">| Search: {searchQuery}</span>}
        </h1>
      </div>

      {filteredAndSortedPosts.length === 0 ? (
        <EmptyState message={`No results in ${slug} for "${searchQuery}"`} />
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {paginatedPosts.map((article: any, index: number) => (
              <Card 
                key={article.id || index} 
                {...article} 
                onAction={() => window.open(article.url, "_blank")} 
              />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-10 flex flex-col items-center gap-6">
              {/* MODIFICATION: border-border-custom ensures the line changes color in dark mode */}
              <div className="flex items-center justify-between w-full border-t border-border-custom pt-8">
                
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setCurrentPage(prev => Math.max(prev - 1, 1));
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }} 
                  disabled={currentPage === 1}
                  className={`cursor-pointer border-orange-600 text-orange-600 font-black uppercase px-6 rounded-lg ${
                    currentPage === 1 ? 'opacity-20 !cursor-not-allowed' : 'hover:bg-orange-600 hover:text-white'
                  }`}
                >
                  ← Prev
                </Button>

                <div className="text-sm font-black uppercase tracking-widest text-foreground">
                  Page <span className="text-orange-600">{currentPage}</span> of {totalPages}
                </div>

                <Button 
                  variant="outline" 
                  onClick={() => {
                    setCurrentPage(prev => Math.min(prev + 1, totalPages));
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }} 
                  disabled={currentPage === totalPages}
                  className={`cursor-pointer border-orange-600 text-orange-600 font-black uppercase px-6 rounded-lg ${
                    currentPage === totalPages ? 'opacity-20 !cursor-not-allowed' : 'hover:bg-orange-600 hover:text-white'
                  }`}
                >
                  Next →
                </Button>
              </div>
              
              <p className="text-[10px] text-foreground/50 font-bold uppercase tracking-[0.2em]">
                Showing {paginatedPosts.length} of {filteredAndSortedPosts.length} {selectedCategory} Results
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}


