'use client';
import React from "react";

export default function Card({
  title = "Breaking News Headline",
  subtitle = "World · Jan 29, 2026",
  image,
  excerpt = "Summary missing...",
  author = "Staff Reporter",
  onAction,
}: any) {

  const truncatedTitle =
    title?.split(" ").slice(0, 7).join(" ") +
    (title?.split(" ").length > 7 ? "..." : "");

  const truncatedExcerpt =
    excerpt?.split(" ").slice(0, 15).join(" ") +
    (excerpt?.split(" ").length > 15 ? "..." : "");

  const fallbackImage =
    "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=1000";

  return (
    <article
      onClick={onAction}
      className="
        group max-w-md w-full rounded-2xl overflow-hidden flex flex-col h-full cursor-pointer
        bg-[var(--card-bg)] border border-[var(--border-color)]
        shadow-xl transition-all duration-500
        hover:-translate-y-4 hover:shadow-[0_35px_60px_-15px_rgba(0,0,0,0.2)]
      "
    >
      <div className="h-48 w-full overflow-hidden bg-gray-200">
        <img
          src={image && image !== "" ? image : fallbackImage}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          onError={(e: any) => {
            e.target.src = fallbackImage;
          }}
        />
      </div>

      <div className="p-5 space-y-3 flex flex-col flex-grow">
        <p className="text-xs uppercase tracking-widest text-gray-500 group-hover:text-orange-600 transition-colors">
          {subtitle}
        </p>

        <h2 className="text-xl font-serif font-bold leading-tight text-[var(--foreground)] group-hover:text-orange-600 transition-colors">
          {truncatedTitle}
        </h2>

        {/* MODIFIED: text-foreground with opacity for better readability in light mode */}
        <p className="text-sm text-[var(--foreground)] opacity-80 leading-relaxed text-justify">
          {truncatedExcerpt}
        </p>

        <div className="pt-3 mt-auto border-t border-[var(--border-color)] flex items-center justify-between gap-4">
          <span className="text-[10px] italic text-gray-500 flex-1">
            By {author}
          </span>

          <button className="bg-orange-600 text-white px-4 py-2 text-xs font-bold uppercase rounded-sm hover:bg-black transition-all active:scale-95 shadow-md">
            Read more
          </button>
        </div>
      </div>
    </article>
  );
}


