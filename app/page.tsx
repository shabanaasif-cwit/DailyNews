'use client';

import React from 'react';
import Link from 'next/link';
// MODIFICATION: Updated path to match your folder structure: components -> common -> card
import Card from '../components/common/card'; 

export default function Home() {
  
  return (
    <main className="min-h-screen bg-[#121417] overflow-x-hidden">
      
      {/* HERO SECTION */}
      <section className="min-h-[80vh] flex items-center justify-center px-6 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none select-none">
          <h1 className="text-[35vw] font-black italic">NEWS</h1>
        </div>

        <div className="max-w-4xl text-center relative z-10">
          <div className="inline-block bg-orange-600 -skew-x-12 px-4 py-1 mb-6">
            <span className="text-xs font-black tracking-[0.3em] text-white uppercase skew-x-12 block">
              Live Updates 24/7
            </span>
          </div>

          <h1 className="text-6xl md:text-8xl font-black text-white leading-none tracking-tighter uppercase italic cursor-pointer transition-transform duration-300 hover:scale-105">
            <span className="text-orange-600">Daily</span> News
          </h1>

          <p className="mt-8 text-xl md:text-2xl text-gray-400 font-medium max-w-2xl mx-auto leading-relaxed">
            The world moves fast. We move faster. Access real-time stories across 
            <span className="text-white"> Business</span>, <span className="text-white">Tech</span>, and <span className="text-white">Global Affairs</span>.
          </p>

          <div className="mt-12 flex flex-col sm:flex-row justify-center gap-6">
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
        </div>
      </section>

      {/* FEATURED SECTION */}
      <section className="max-w-7xl mx-auto px-6 py-20 border-t border-gray-800">
        <div className="flex items-center gap-4 mb-12">
          <div className="h-10 w-2 bg-orange-600 -skew-x-12"></div>
          <h2 className="text-3xl font-black uppercase tracking-tighter text-white italic">
            Featured <span className="text-orange-600">Stories</span>
          </h2>
        </div>

        {/* Using a 3-column grid for your cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          <Card 
            title="Global Markets Brace for Impact as Tech Giants Announce Merger" 
            subtitle="Business · 5 mins ago"
            excerpt="A massive shift is expected in the global stock market as the two biggest players in Silicon Valley finalize their historic deal..."
            author="Alex Rivers"
          />
          <Card 
            title="New Science Discovery: Ancient Life Found in Martian Ice Samples" 
            subtitle="Science · 2 hours ago"
            excerpt="NASA researchers have confirmed the presence of microbial life trapped in ice crystals from the Martian polar caps..."
            author="Dr. Sarah Chen"
          />
          <Card 
            title="Next-Gen Sports: How AI is Redefining Athlete Performance" 
            subtitle="Sport · Today"
            excerpt="From wearable tech to real-time data analysis, the landscape of professional sports is changing faster than ever before..."
            author="Marcus Vane"
          />
        </div>
      </section>
    </main>
  );
}

