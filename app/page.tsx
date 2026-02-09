'use client';

import React from 'react';
import Link from 'next/link';

export default function Home() {


  return (
    // MODIFICATION: Switched to dark theme background to match your site's aesthetic
    <main className="min-h-[80vh] bg-[#121417] flex items-center justify-center px-6 overflow-hidden relative">
      
      {/* BACKGROUND DECORATION: Subtle large text behind the content for a "News" feel */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none select-none">
        <h1 className="text-[40vw] font-black italic">NEWS</h1>
      </div>

      <section className="max-w-4xl text-center relative z-10">
        {/* MODIFICATION: Used your brand's skewed orange badge style */}
        <div className="inline-block bg-orange-600 -skew-x-12 px-4 py-1 mb-6">
          <span className="text-xs font-black tracking-[0.3em] text-white uppercase skew-x-12 block">
            Live Updates 24/7
          </span>
        </div>

        {/* MODIFICATION: High-contrast typography with the "Daily" brand accent */}
        <h1 className="text-6xl md:text-8xl font-black text-white leading-none tracking-tighter uppercase italic cursor-pointer hover:scale-105 ">
          <span className="text-orange-600">Daily</span> News
        </h1>

        <p className="mt-8 text-xl md:text-2xl text-gray-400 font-medium max-w-2xl mx-auto leading-relaxed">
          The world moves fast. We move faster. Access real-time stories across 
          <span className="text-white"> Business</span>, <span className="text-white">Tech</span>, and <span className="text-white">Global Affairs</span>.
        </p>

        <div className="mt-12 flex flex-col sm:flex-row justify-center gap-6">
          {/* MODIFICATION: Button style matches your 'Search' and 'Explore' buttons with the skew effect */}
          <Link
            href="/category/business"
            className="group relative px-10 py-4 bg-orange-600 text-white font-black uppercase tracking-widest -skew-x-12 hover:bg-white hover:text-orange-600 transition-all duration-300"
          >
            <span className="block skew-x-12 group-hover:scale-110 transition-transform">
              Start Exploring
            </span>
          </Link>

          <Link
            href="/about"
            className="group px-10 py-4 border-2 border-white text-white font-black uppercase tracking-widest -skew-x-12 hover:bg-white hover:text-[#121417] transition-all duration-300"
          >
            <span className="block skew-x-12">Our Story</span>
          </Link>
        </div>
        
        {/* MODIFICATION: Added a "Trending Categories" quick-link strip below the main buttons */}
        <div className="mt-16 pt-8 border-t border-gray-800 flex flex-wrap justify-center gap-8 text-gray-500 font-bold text-xs uppercase tracking-widest">
          <Link href="/category/technology" className="hover:text-orange-600 transition-colors  hover:scale-110">#Technology</Link>
          <Link href="/category/science" className="hover:text-orange-600 transition-colors  hover:scale-110">#Science</Link>
          <Link href="/category/sport" className="hover:text-orange-600 transition-colors  hover:scale-110">#Sports</Link>
        </div>
      </section>
    </main>
  );
}

