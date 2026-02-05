"use client";

import React from "react";
import Card from "../common/card"; // Adjusted path to match standard Next.js structure

export default function PostList({ posts }: { posts: any[] }) {
  // Logic: Handle cases where the API might return an empty list or be loading
  if (!posts || posts.length === 0) {
    return (
      <div className="w-full py-20 text-center">
        <p className="text-gray-500 dark:text-zinc-500 italic">
          No articles found for this category.
        </p>
      </div>
    );
  }

  return (
    <section className="w-full">
      {/* 'gap-8': Increased spacing for a cleaner, modern layout 
        'pb-20': Bottom padding to separate the grid from the footer
      */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
        {posts.map((post) => (
          <Card
            key={post.id}
            title={post.title}
            subtitle={post.subtitle}
            image={post.image}
            excerpt={post.excerpt}
            author={post.author}
            // Logic: window.open requires 'use client'
            onAction={() => {
              if (post.url) {
                window.open(post.url, "_blank", "noopener,noreferrer");
              }
            }}
          />
        ))}
      </div>
    </section>
  );
}