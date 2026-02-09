'use client';

import React, { useState, useEffect } from "react";
import { Search, Menu, X, Sun, Moon } from "lucide-react"; 
import { useTheme } from "next-themes"; // Import this
import Link from "next/link"; 
import { usePathname } from "next/navigation"; 
import { useNews } from "../../context/newcontext"; 


export default function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { searchQuery, setSearchQuery, setSelectedCategory } = useNews();
  const pathname = usePathname(); 
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Prevents hydration mismatch (Ensures button only shows on client)
  useEffect(() => setMounted(true), []);

  const categories = [
    "home", "business", "entertainment", "general", 
    "health", "science", "sport", "technology"
  ];

  return (
    /* MODIFICATION: Used 'bg-background' and 'border-gray-800' */
    <header className="w-full bg-background border-b border-gray-800 sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center gap-8">
        
        <Link href="/" className="flex items-center tracking-tighter uppercase shrink-0 hover:scale-110">
          <span className="text-orange-600 text-3xl md:text-4xl font-black italic">Daily</span>
          <span className="text-foreground text-xl md:text-2xl font-bold ml-1">News</span>
        </Link>

        <div className="flex items-center gap-3 flex-grow justify-end">
          
         
          {/* --- NEW TOGGLE BUTTON END --- */}

          <div className="hidden sm:flex items-center w-full max-w-[400px]">
            <form className="flex bg-nav items-center px-3 py-1 -skew-x-12 border border-gray-800 w-full group focus-within:border-orange-600">
              <input
                type="text"
                placeholder="Search for news..."
                className="bg-transparent border-none outline-none text-foreground text-sm py-1 skew-x-12 w-full focus:ring-0"
                value={searchQuery || ""} 
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="bg-orange-600 text-white p-1.5 ml-2 hover:bg-orange-700 transition-colors rounded-sm">
                <Search size={18} className="skew-x-12" />
              </button>
            </form>
             {/* --- STYLED TOGGLE BUTTON --- */}
                  {mounted && (
                    <button 
                      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                      className="
                        flex items-center justify-center
                        bg-orange-600 text-white 
                        p-2 ml-2 
                        -skew-x-12 
                        hover:bg-orange-700 hover:scale-105
                        transition-all duration-300 
                        cursor-pointer 
                        border border-orange-700
                        shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)]
                        active:shadow-none active:translate-x-[1px] active:translate-y-[1px] rounded-sm
                      "
                      aria-label="Toggle Theme"
                    >
                      <div className="skew-x-12">
                        {theme === "dark" ? (
                          <Sun size={18} strokeWidth={3} />
                        ) : (
                          <Moon size={18} strokeWidth={3} />
                        )}
                      </div>
                    </button>
                  )}
          </div>

          <button className="md:hidden text-foreground ml-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Navigation section */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:block bg-nav border-t border-gray-800`}>
        <nav className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap items-center justify-center md:justify-start gap-x-8 gap-y-3">
          {categories.map((cat) => (
          
               <Link 
                key={cat} 
                href={cat === "home" ? "/" : `/category/${cat}`}
                className={`text-[11px] font-bold uppercase tracking-[0.15em] transition-all duration-300 relative group antialiased hover:scale-105 inline-block transform
                  ${pathname === (cat === "home" ? "/" : `/category/${cat}`) 
                    ? 'text-orange-600' 
                    /* MODIFICATION: Swapped 'text-gray-400' for 'text-foreground/70' 
                      In your light mode, this will now be a very dark charcoal/black 
                      instead of a light gray. 
                    */
                    : 'text-foreground/70 hover:text-foreground' 
                  }`}
              >
                {cat}
                <span className={`absolute -bottom-1.5 left-0 h-[1.5px] bg-orange-600 transition-all duration-500 ${
                  pathname === (cat === "home" ? "/" : `/category/${cat}`) ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></span>
              </Link> 



          ))}
        </nav>
      </div>
    </header>
  );
}

