"use client";

import React, { useEffect } from "react";
import { Users, Globe, Award, ShieldCheck } from "lucide-react";

export default function About() {
  // Reset scroll on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    // transition-colors ensures a smooth shift when toggling the sun/moon icon
    <div className="w-full bg-white dark:bg-[#121417] min-h-screen transition-colors duration-300">
      <main className="max-w-6xl mx-auto px-4 py-16">
        
        {/* Hero Section */}
        <div className="mb-16 border-b border-gray-100 dark:border-zinc-800 pb-12">
          <h2 className="text-5xl font-black text-[#121417] dark:text-white uppercase italic tracking-tighter mb-6">
            Inside <span className="text-orange-600">Daily</span> News
          </h2>
          <p className="text-xl text-gray-600 dark:text-zinc-400 leading-relaxed max-w-3xl">
            Founded in 2026, Daily News has grown from a small digital startup into a leading 
            source of global information. We believe that independent journalism is the 
            heartbeat of a functioning society.
          </p>
        </div>

        {/* Mission Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-[#121417] dark:text-white uppercase tracking-tight flex items-center gap-3">
              <span className="h-8 w-1 bg-orange-600"></span>
              Our Mission
            </h3>
            <p className="text-gray-700 dark:text-zinc-300 leading-loose">
              Our mission is simple: to provide rigorous, real-time journalism and in-depth analysis on the stories that shape our world. We strive to be the most reliable and up-to-date news source for our global audience.
            </p>
          </div>

          {/* Quote Box - Updated for Dark Mode */}
          <div className="bg-gray-100 dark:bg-[#1a1d21] p-8 border border-gray-100 dark:border-zinc-800 italic text-gray-600 dark:text-zinc-400 relative shadow-lg">
            <span className="text-6xl text-orange-200 dark:text-orange-900/30 absolute -top-1 -left-2 font-serif opacity-70">"</span>
            <p className="relative z-10">
              We don't just report the news; we explain why it matters to your life, your business, and your future.
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 shadow-xl">
          {[
            { icon: <Globe size={32} />, title: "Global Reach", text: "Reporting from over 50 countries to bring you local perspectives." },
            { icon: <ShieldCheck size={32} />, title: "Fact Checked", text: "Every story undergoes a rigorous multi-step verification process." },
            { icon: <Users size={32} />, title: "Community", text: "We prioritize the voices of our readers and the impact on local communities." },
            { icon: <Award size={32} />, title: "Integrity", text: "Honesty and transparency are the foundations of our editorial room." }
          ].map((value, idx) => (
            <div key={idx} className="text-center p-6 group">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-50 dark:bg-orange-900/10 text-orange-600 mb-4 shadow-lg transition-transform group-hover:scale-110">
                {value.icon}
              </div>
              <h4 className="font-bold text-[#121417] dark:text-white mb-2 uppercase">{value.title}</h4>
              <p className="text-sm text-gray-500 dark:text-zinc-500">{value.text}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
