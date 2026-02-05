'use client'; // CRITICAL: Fixes "Event handlers cannot be passed to Client Component props"
import React from "react";

export default function Card({
  title = "Breaking News Headline",
  subtitle = "World · Jan 29, 2026",
  image,
  excerpt = "Summary missing...",
  author = "Staff Reporter",
  onAction,
}: any) {
  
  const truncatedTitle = title?.split(" ").slice(0, 7).join(" ") + (title?.split(" ").length > 8 ? "..." : "");
  const truncatedExcerpt = excerpt?.split(" ").slice(0, 15).join(" ") + (excerpt?.split(" ").length > 16 ? "..." : "");
  const fallbackImage = "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=1000";

  return (
    <article 
      className="group max-w-md w-full bg-white dark:bg-[#1a1d21] border border-gray-200 dark:border-zinc-800 rounded-2xl overflow-hidden transition-all duration-500 flex flex-col h-full hover:shadow-lg hover:-translate-y-2 cursor-pointer"
      onClick={onAction}
    >
      <div className="h-48 w-full overflow-hidden bg-gray-100 dark:bg-zinc-900">
        <img
          src={image && image !== "" ? image : fallbackImage}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
          onError={(e: any) => { e.target.src = fallbackImage; }} // This handler requires 'use client'
        />
      </div>

      <div className="p-5 space-y-3 flex flex-col flex-grow">
        <p className="text-xs uppercase tracking-widest text-gray-500 dark:text-zinc-400 group-hover:text-orange-600 transition-colors duration-300">
          {subtitle}
        </p>
        {/* text-gray-900 dark:text-white ensures visibility in both modes */}
        <h2 className="text-xl font-serif font-bold leading-tight text-gray-900 dark:text-white transition-colors duration-300 group-hover:text-orange-600">
          {truncatedTitle}
        </h2>
        <p className="text-sm text-gray-700 dark:text-zinc-400 leading-relaxed text-justify">
          {truncatedExcerpt}
        </p>
        <div className="pt-3 mt-auto border-t border-gray-200 dark:border-zinc-800 flex items-center justify-between gap-4">
          <span className="text-[10px] italic text-gray-600 dark:text-zinc-500 flex-1">By {author}</span>
          <button className="bg-orange-600 text-white px-4 py-2 text-xs font-bold uppercase rounded-sm hover:bg-black transition-all transform active:scale-95 shadow-md">
            Read more
          </button>
        </div>
      </div>
    </article>
  );
}
