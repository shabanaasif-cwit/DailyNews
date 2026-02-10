'use client';

import React from 'react';
import Link from 'next/link';
import Card from '../components/common/card'; 

export default function Home() {
  // Define the 3 specific news stories
  const featuredNews = [
    {
      id: "global-economy-2026",
      title: "The Shift in Global Markets",
      subtitle: "Economy",
      excerpt: "As we move further into 2026, central banks are signaling a massive pivot in interest rate policies...",
      author: "Sarah Jenkins"
    },
    {
      id: "ai-breakthrough-tech",
      title: "Beyond the LLM: What's Next?",
      subtitle: "Technology",
      excerpt: "New neural architectures are outperforming standard transformers in efficiency and reasoning capabilities...",
      author: "Marcus Chen"
    },
    {
      id: "sustainable-cities-future",
      title: "Green Infrastructure in Lahore",
      subtitle: "Urban Development",
      excerpt: "How local initiatives are transforming the media district into a model for sustainable urban living...",
      author: "Shabana Asif"
    }
  ];

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden transition-colors duration-300">
      
      {/* HERO SECTION - Keep as is */}
      <section className="min-h-[80vh] flex items-center justify-center px-6 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] dark:opacity-[0.02] pointer-events-none select-none">
          <h1 className="text-[35vw] font-black italic text-foreground">NEWS</h1>
        </div>

        <div className="max-w-4xl text-center relative z-10">
          <div className="inline-block bg-orange-600 -skew-x-12 px-4 py-1 mb-6">
            <span className="text-xs font-black tracking-[0.3em] text-white uppercase skew-x-12 block">Live Updates 24/7</span>
          </div>

          <h1 className="text-6xl md:text-8xl font-black leading-none tracking-tighter uppercase italic transition-transform duration-300 hover:scale-105 text-foreground cursor-pointer">
            <span className="text-orange-600">Daily</span> News
          </h1>

          <p className="mt-8 text-xl md:text-2xl text-gray-500 dark:text-gray-400 font-medium max-w-2xl mx-auto leading-relaxed">
            The world moves fast. We move faster. Access real-time stories across 
            <span className="text-foreground"> Business</span>, <span className="text-foreground">Tech</span>, and <span className="text-foreground">Global Affairs</span>.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row justify-center gap-6">
            <Link href="/category/business" className="group relative px-10 py-4 bg-orange-600 text-white font-black uppercase tracking-widest -skew-x-12 hover:bg-foreground hover:text-background transition-all duration-300">
              <span className="block skew-x-12 group-hover:scale-110 transition-transform">Start Exploring</span>
            </Link>

            <Link href="/about" className="group px-10 py-4 border-2 border-foreground text-foreground font-black uppercase tracking-widest -skew-x-12 hover:bg-foreground hover:text-background transition-all duration-300">
              <span className="block skew-x-12">Our Story</span>
            </Link>
          </div>
        </div>
      </section>

      {/* FEATURED SECTION - Now with 3 specific news links */}
      <section className="max-w-7xl mx-auto px-6 py-20 border-t border-gray-200 dark:border-gray-800">
        <div className="flex items-center gap-4 mb-12">
          <div className="h-10 w-2 bg-orange-600 -skew-x-12"></div>
          <h2 className="text-3xl font-black uppercase tracking-tighter italic text-foreground">
            Featured <span className="text-orange-600">Stories</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {featuredNews.map((news) => (
            <Link key={news.id} href={`/news/${news.id}`} className="group block">
              <div className="transition-transform duration-300 group-hover:-translate-y-2">
                <Card 
                  title={news.title} 
                  subtitle={news.subtitle} 
                  excerpt={news.excerpt} 
                  author={news.author} 
                />
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}




