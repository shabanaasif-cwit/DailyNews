'use client';

import React, { useState } from "react";
import { Search, Moon, Sun, Menu, X } from "lucide-react"; 
import Link from "next/link"; 
import { usePathname, useRouter } from "next/navigation"; 
import { useNews } from "../../context/newcontext"; 


export default function Header() {
  const { searchQuery, setSearchQuery, setSelectedCategory } = useNews();

  const pathname = usePathname(); 
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const categories = [
    "home", "business", "entertainment", "general", 
    "health", "science", "sport", "technology"
  ];

  // Fixed React.FormEvent<HTMLFormElement>
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery?.trim()) {
      console.log("Searching for:", searchQuery);
    }
  };

  return (
    <header className="w-full bg-[#121417] border-b border-gray-800 sticky top-0 z-50 ">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center gap-8">
        
        <Link 
          href="/" 
          className="flex items-center tracking-tighter uppercase shrink-0 hover:scale-110" 
          onClick={() => setSelectedCategory("Home")}
        >
          <span className="text-orange-600 text-3xl md:text-4xl font-black italic">Daily</span>
          <span className="text-white text-xl md:text-2xl font-bold ml-1">News</span>
        </Link>

        <div className="flex items-center gap-3 flex-grow justify-end">
          <div className="hidden sm:flex items-center w-full max-w-[400px]">
            <form 
              onSubmit={handleSearch} 
              className="flex bg-[#1a1d21] items-center px-3 py-1 -skew-x-12 border border-gray-800 w-full group focus-within:border-orange-600"
            >
              <input
                type="text"
                placeholder="Search for news..."
                className="bg-transparent border-none outline-none text-gray-300 text-sm py-1 skew-x-12 w-full focus:ring-0"
                // Fallback to empty string to prevent errors
                value={searchQuery || ""} 
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="bg-orange-600 text-white p-1.5 ml-2 hover:bg-orange-700 transition-colors cursor-pointer rounded-sm">
                <Search size={18} className="skew-x-12" />
              </button>
            </form>
          </div>


          <button className="md:hidden text-white ml-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:block bg-[#1a1d21] border-t border-gray-800`}>
        <nav className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap items-center justify-center md:justify-start gap-x-8 gap-y-3">
          {categories.map((cat) => {
            const categoryPath = cat === "home" ? "/" : `/category/${cat}`;
            const isActive = pathname === categoryPath;

            return (
                <Link 
                  key={cat} 
                  href={categoryPath}
                  onClick={() => {
                    setSelectedCategory(cat.charAt(0).toUpperCase() + cat.slice(1));
                    setIsMenuOpen(false);
                  }}
                  className={`text-[11px] font-bold uppercase tracking-[0.15em] transition-all duration-300 relative group antialiased 
                    ${isActive ? 'text-orange-600' : 'text-gray-400 hover:text-white'}
                    
                    /* MODIFICATION: 
                      1. Added hover:scale-110 for the zoom effect.
                      2. Added inline-block to allow the scale transform to apply correctly.
                      3. Added transform class to ensure hardware acceleration for the animation.
                    */
                    hover:scale-105 inline-block transform`} 
                  
                  style={{ fontStretch: "condensed" }}
                >
                  {cat}
                  <span className={`absolute -bottom-1.5 left-0 h-[1.5px] bg-orange-600 transition-all duration-500 ${
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}></span>
                </Link>

            );
          })}
        </nav>
      </div>
    </header>
  );
}

