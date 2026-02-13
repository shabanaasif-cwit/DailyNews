'use client';

import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { useNews } from "@/context/newcontext";
import Card from "@/components/common/card";
import Loading from "@/components/common/loading";
import ErrorMessage from "@/components/common/errormessage";
import EmptyState from "@/components/common/emptystate";
import Button from "@/components/common/button";

export default function CategoryPage() {
  const { slug } = useParams();
  const { posts, loading, error, setSelectedCategory, searchQuery, sortOrder } = useNews();
  
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Logic: Sync slug with context
  useEffect(() => {
    if (slug) {
      const formatted = slug.toString().charAt(0).toUpperCase() + slug.toString().slice(1);
      setSelectedCategory(formatted);
    }
  }, [slug, setSelectedCategory]);

  // Logic: Reset pagination on search
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // Logic: Filtering and Sorting (Maintained Core Functionality)
  const filteredAndSortedPosts = useMemo(() => {
    if (!posts) return [];
    
    const query = searchQuery.toLowerCase();
    const filtered = posts.filter((post: any) =>
      post.title?.toLowerCase().includes(query) ||
      post.excerpt?.toLowerCase().includes(query)
    );

    return [...filtered].sort((a, b) => {
      const titleA = (a.title || "").toLowerCase();
      const titleB = (b.title || "").toLowerCase();
      
      switch (sortOrder) {
        case "newest": return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
        case "oldest": return new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime();
        case "a-z": return titleA.localeCompare(titleB);
        case "z-a": return titleB.localeCompare(titleA);
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
    /* MODIFICATION: 
       - Used 'w-full px-0' to allow background to hit edges.
       - 'py-6 md:py-12' adjusts vertical spacing for mobile.
    */
    <div className="w-full px-0 py-6 md:py-12 bg-background text-foreground transition-colors duration-500 min-h-screen">
      
      {/* MODIFICATION: Responsive Header
          - 'mx-4 md:mx-10' ensures text doesn't hit the screen edge.
          - 'text-3xl md:text-4xl' scales font size.
      */}
      <div className="border-l-4 border-orange-600 pl-4 mb-8 md:mb-10 mx-4 md:mx-10">
        <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-foreground capitalize">
          {slug} News {searchQuery && <span className="text-orange-600 ml-2">| Search: {searchQuery}</span>}
        </h1>
      </div>

      {filteredAndSortedPosts.length === 0 ? (
        <EmptyState message={`No results in ${slug} for "${searchQuery}"`} />
      ) : (
        <>
          {/* MODIFICATION: Responsive Grid
              - grid-cols-1: Mobile
              - sm:grid-cols-2: Tablet
              - lg:grid-cols-3: Laptop
              - xl:grid-cols-4: Desktop (Your 4-column request)
              - px-4 md:px-10: Replaced 'px-15' with standard responsive padding.
          */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 mb-16 px-4 md:px-10">
            {paginatedPosts.map((article: any, index: number) => (
              <Card 
                key={article.id || index} 
                {...article} 
                onAction={() => window.open(article.url, "_blank")} 
              />
            ))}
          </div>

          {/* MODIFICATION: Responsive Pagination
              - flex-col sm:flex-row: Stacks buttons on mobile, horizontal on tablet+.
          */}
          {totalPages > 1 && (
            <div className="mt-10 flex flex-col items-center gap-6 px-4 md:px-10">
              <div className="flex flex-col sm:flex-row items-center justify-between w-full border-t border-gray-800 pt-8 gap-4">
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setCurrentPage(prev => Math.max(prev - 1, 1));
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }} 
                  disabled={currentPage === 1}
                  className={`w-full sm:w-auto cursor-pointer border-orange-600 text-orange-600 font-black uppercase px-6 rounded-lg ${
                    currentPage === 1 ? 'opacity-20 !cursor-not-allowed' : 'hover:bg-orange-600 hover:text-white'
                  }`}
                >
                  ← Prev
                </Button>

                <div className="text-sm font-black uppercase tracking-widest text-foreground order-first sm:order-none">
                  Page <span className="text-orange-600">{currentPage}</span> of {totalPages}
                </div>

                <Button 
                  variant="outline" 
                  onClick={() => {
                    setCurrentPage(prev => Math.min(prev + 1, totalPages));
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }} 
                  disabled={currentPage === totalPages}
                  className={`w-full sm:w-auto cursor-pointer border-orange-600 text-orange-600 font-black uppercase px-6 rounded-lg ${
                    currentPage === totalPages ? 'opacity-20 !cursor-not-allowed' : 'hover:bg-orange-600 hover:text-white'
                  }`}
                >
                  Next →
                </Button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

