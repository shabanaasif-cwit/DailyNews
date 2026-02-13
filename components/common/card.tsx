'use client';
import React, { useState, useMemo } from "react";
import Image from "next/image";

export default function Card({
  title = "Breaking News Headline",
  subtitle = "World · Jan 29, 2026",
  image,
  excerpt = "Summary missing...",
  author = "Staff Reporter",
  onAction,
  isPriority = false, 
}: any) {
  const fallbackImage = "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&q=80&w=1000";
  const [imgSrc, setImgSrc] = useState(image && image !== "" ? image : fallbackImage);

  const memoizedContent = useMemo(() => {
    const simpleId = title.toLowerCase().substring(0, 20).replace(/\s/g, '-');
    const truncatedTitle = title.length > 60 ? title.substring(0, 60) + "..." : title;
    const truncatedExcerpt = excerpt.length > 110 ? excerpt.substring(0, 110) + "..." : excerpt;

    return { simpleId, truncatedTitle, truncatedExcerpt };
  }, [title, excerpt]);

  return (
    <article
      onClick={onAction}
      aria-labelledby={memoizedContent.simpleId}
      className="group w-full m-0 rounded-2xl overflow-hidden flex flex-col h-full bg-[var(--card-bg)] border border-[var(--border-color)] shadow-lg transition-transform"
    >
      <div className="relative aspect-video w-full overflow-hidden bg-gray-200">
        <Image
          src={imgSrc}
          alt="" 
          fill
          priority={isPriority} 
          /* MODIFICATION: 
             1. Added 'unoptimized' to bypass 403 Forbidden errors from external domains.
             2. Removed manual 'loading' attribute as 'priority' handles it.
          */
          unoptimized 
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
          onError={() => setImgSrc(fallbackImage)}
        />
      </div>

      <div className="py-5 px-4 space-y-3 flex flex-col flex-grow">
        <p className="text-xs uppercase text-gray-accessible font-bold">{subtitle}</p>
        
        <h2 id={memoizedContent.simpleId} className="text-xl font-bold leading-tight text-[var(--foreground)]">
          {memoizedContent.truncatedTitle}
        </h2>

        <p className="text-sm text-[var(--foreground)] leading-relaxed">
          {memoizedContent.truncatedExcerpt}
        </p>

        <div className="pt-3 mt-auto border-t flex items-center justify-between">
          <span className="text-[10px] italic text-gray-accessible">By {author}</span>
          <button 
            type="button"
            aria-label={`Read full article: ${title}`}
            className="bg-orange-600 text-black px-4 py-3 text-xs font-bold uppercase rounded-sm hover:bg-white transition-all active:scale-95 shadow-md cursor-pointer min-h-[44px]"
          >
            Read more
          </button>
        </div>
      </div>
    </article>  
  );
}

