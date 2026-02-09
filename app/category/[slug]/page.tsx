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
  
  // MODIFICATION: Destructured 'selectedCategory' and 'searchQuery' from context to enable dynamic labels and filtering
  const { posts, loading, error, setSelectedCategory, selectedCategory, searchQuery } = useNews();
  
  // MODIFICATION: Set itemsPerPage to 12 as requested for the grid
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // MODIFICATION: Effect to sync the URL slug with the NewsContext state
  useEffect(() => {
    if (slug) {
      const formatted = slug.toString().charAt(0).toUpperCase() + slug.toString().slice(1);
      setSelectedCategory(formatted);
    }
  }, [slug, setSelectedCategory]);

  // MODIFICATION: Automatically reset pagination to page 1 whenever the user types in the search bar
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // MODIFICATION: Search filtering logic (checks both title and excerpt)
  const filteredPosts = useMemo(() => {
    if (!posts) return [];
    const query = searchQuery.toLowerCase();
    return posts.filter((post: any) =>
      post.title?.toLowerCase().includes(query) ||
      post.excerpt?.toLowerCase().includes(query)
    );
  }, [posts, searchQuery]);

  // MODIFICATION: Pagination calculation based on the FILTERED results, not the raw posts
  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);
  
  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredPosts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredPosts, currentPage]);

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="max-w-6xl mx-auto px-4 py-12 bg-white dark:bg-[#121417]">
      {/* Header Section */}
      <div className="border-l-4 border-orange-600 pl-4 mb-10">
        <h1 className="text-4xl font-black uppercase tracking-tighter text-[#121417] dark:text-white capitalize">
          {slug} News {searchQuery && `| Searching: ${searchQuery}`}
        </h1>
      </div>

      {/* MODIFICATION: Integrated EmptyState for zero search results */}
      {filteredPosts.length === 0 ? (
        <EmptyState message={`No results in ${slug} for "${searchQuery}"`} />
      ) : (
        <>
          {/* Main Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {paginatedPosts.map((article: any, index: number) => (
              <Card 
                key={article.id || index} 
                {...article} 
                onAction={() => window.open(article.url, "_blank")} 
              />
            ))}
          </div>

          {/* Pagination UI - Only displays if there is more than 1 page */}
          {totalPages > 1 && (
            <div className="mt-10 flex flex-col items-center gap-6">
              <div className="flex items-center justify-between w-full border-t border-gray-100 dark:border-gray-800 pt-8">
                
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setCurrentPage(prev => Math.max(prev - 1, 1));
                    window.scrollTo({ top: 0, behavior: 'smooth' }); // MODIFICATION: Smooth scroll to top on page change
                  }} 
                  disabled={currentPage === 1}
                  className={`cursor-pointer border-orange-600 text-orange-600 font-black uppercase px-6 rounded-lg ${
                    currentPage === 1 ? 'opacity-20 !cursor-not-allowed' : 'hover:bg-orange-600 hover:text-white'
                  }`}
                >
                  ← Prev
                </Button>

                <div className="text-sm font-black uppercase tracking-widest dark:text-white">
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
              
              {/* MODIFICATION: Dynamically injected 'selectedCategory' into the results summary string */}
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-[0.2em]">
                Showing {paginatedPosts.length} of {filteredPosts.length} {selectedCategory} Results
              </p>
            </div>
          )}
        </>
      )}
    </div>
  );
}

