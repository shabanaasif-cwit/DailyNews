"use client";

import React, { useEffect } from "react";
import { Users, Globe, Award, ShieldCheck } from "lucide-react";

export default function About() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="w-full bg-background text-foreground min-h-screen transition-colors duration-500">
      <main className="max-w-6xl mx-auto px-4 py-16">
        
        {/* Hero Section */}
        {/* FIX: Used border-border-custom for theme-aware lines */}
        <div className="mb-16 border-b border-border-custom pb-12">
          <h2 className="text-5xl font-black text-foreground uppercase italic tracking-tighter mb-6 transition-colors duration-500">
            Inside <span className="text-orange-600">Daily</span> News
          </h2>
          {/* FIX: Removed dark:text-zinc-400. text-foreground/80 will look like a sharp soft-black in light mode */}
          <p className="text-xl text-foreground/80 leading-relaxed max-w-3xl transition-colors duration-500">
            Founded in 2026, Daily News has grown from a small digital startup into a leading 
            source of global information. We believe that independent journalism is the 
            heartbeat of a functioning society.
          </p>
        </div>

        {/* Mission Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-foreground uppercase tracking-tight flex items-center gap-3 transition-colors duration-500">
              <span className="h-8 w-1 bg-orange-600"></span>
              Our Mission
            </h3>
            {/* FIX: Removed dark:text-zinc-300 */}
            <p className="text-foreground/90 leading-loose transition-colors duration-500">
              Our mission is simple: to provide rigorous, real-time journalism and in-depth analysis on the stories that shape our world. We strive to be the most reliable and up-to-date news source for our global audience.
            </p>
          </div>

          {/* Quote Box */}
          {/* FIX: Swapped border-gray-200 for border-border-custom and removed dark zinc text */}
          <div className="bg-nav p-8 border border-border-custom italic text-foreground/70 relative shadow-lg transition-all duration-500">
            <span className="text-6xl text-orange-600/20 absolute -top-1 -left-2 font-serif select-none">"</span>
            <p className="relative z-10 transition-colors duration-500">
              We don't just report the news; we explain why it matters to your life, your business, and your future.
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: <Globe size={32} />, title: "Global Reach", text: "Reporting from over 50 countries to bring you local perspectives." },
            { icon: <ShieldCheck size={32} />, title: "Fact Checked", text: "Every story undergoes a rigorous multi-step verification process." },
            { icon: <Users size={32} />, title: "Community", text: "We prioritize the voices of our readers and the impact on local communities." },
            { icon: <Award size={32} />, title: "Integrity", text: "Honesty and transparency are the foundations of our editorial room." }
          ].map((value, idx) => (
            <div key={idx} className="text-center p-6 group border border-transparent hover:border-border-custom transition-all duration-500">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-600/10 text-orange-600 mb-4 shadow-sm transition-transform group-hover:scale-110">
                {value.icon}
              </div>
              <h4 className="font-bold text-foreground mb-2 uppercase transition-colors duration-500">{value.title}</h4>
              {/* FIX: text-foreground/60 is perfect for secondary value text */}
              <p className="text-sm text-foreground/60 transition-colors duration-500">{value.text}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
