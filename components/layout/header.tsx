'use client';

import React, { useState, useEffect, useRef } from "react";
import { Search, Menu, RotateCw, Filter, Sun, Moon, ChevronDown } from "lucide-react"; 
import { useTheme } from "next-themes"; 
import Link from "next/link"; 
import { usePathname } from "next/navigation"; 
import { useNews } from "../../context/newcontext"; 
import Sidebar from "./sidebar"; 

export default function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { searchQuery, setSearchQuery, loadData, selectedCategory, sortOrder, setSortOrder } = useNews();
  const pathname = usePathname(); 
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  
  const sortOptions = [
    { value: 'newest', label: 'Newest' },
    { value: 'oldest', label: 'Oldest' },
    { value: 'a-z', label: 'A - Z' },
    { value: 'z-a', label: 'Z - A' },
  ];

  useEffect(() => {
    setMounted(true);
    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setIsSortOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const categories = ["home", "business", "entertainment", "general", "health", "science", "sport", "technology"];

  return (
    <header className="w-full bg-background border-b border-gray-800 sticky top-0 z-50 transition-colors duration-300">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          {/* FIX: Added aria-label for Menu button */}
          <button 
            className="text-foreground hover:text-orange-600 transition-colors cursor-pointer" 
            aria-label="Open navigation menu"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu size={28} />
          </button>
          
          <Link href="/" className="flex items-center tracking-tighter uppercase shrink-0 hover:scale-105 transition-transform" aria-label="Daily News Home">
            <span className="text-orange-600 text-3xl md:text-4xl font-black italic">Daily</span>
            <span className="text-foreground text-xl md:text-2xl font-bold ml-1">News</span>
          </Link>
        </div>

        <div className="flex items-center gap-2 flex-grow justify-end">
          <div className="hidden sm:flex items-center w-full max-w-[550px] gap-2">
            <form className="flex bg-nav items-center px-3 py-1 -skew-x-12 border border-gray-800 w-full group focus-within:border-orange-600 transition-colors">
              <input 
                type="search"          
                id="search-news"       
                name="search-news"    
                placeholder="Search news..." 
                className="bg-transparent border-none outline-none text-foreground text-sm py-1 skew-x-12 w-full focus:ring-0"
                value={searchQuery || ""} 
                onChange={(e) => setSearchQuery(e.target.value)}
                aria-label="Search news"
              />
              {/* FIX: Added aria-label for Search button */}
              <button 
                type="submit" 
                className="bg-orange-600 text-white p-1.5 ml-2 hover:bg-orange-700 transition-colors rounded-sm cursor-pointer"
                aria-label="Submit search"
              >
                <Search size={16} className="skew-x-12" />
              </button>
            </form>

            {/* FIX: Added aria-label for Refresh button */}
            <button 
              onClick={() => loadData(selectedCategory)}
              className="flex items-center justify-center bg-nav text-foreground p-2 -skew-x-12 border border-gray-800 hover:text-orange-600 transition-all cursor-pointer rounded-sm shrink-0"
              aria-label="Refresh news feed"
            >
              <div className="skew-x-12"><RotateCw size={18} /></div>
            </button>

            <div className="relative shrink-0" ref={sortRef}>
              {/* FIX: Added aria-label for Sort button */}
              <button 
                onClick={() => setIsSortOpen(!isSortOpen)}
                className={`flex items-center bg-nav border ${isSortOpen ? 'border-orange-600' : 'border-gray-800'} -skew-x-12 px-3 h-[38px] hover:border-orange-600 transition-colors group/sort cursor-pointer`}
                aria-label="Sort options"
              >
                <div className="skew-x-12 flex items-center gap-2">
                  <Filter size={14} className="text-orange-600" />
                  <span className="text-foreground text-[10px] font-black uppercase tracking-widest min-w-[60px] text-left">
                    {sortOptions.find(o => o.value === sortOrder)?.label || 'Sort'}
                  </span>
                  <ChevronDown size={12} className={`transition-transform duration-300 text-gray-500 ${isSortOpen ? 'rotate-180 text-orange-600' : ''}`} />
                </div>
              </button>

              {isSortOpen && (
                <ul className="absolute top-[42px] left-0 w-full min-w-[120px] bg-nav border border-gray-800 z-50 shadow-2xl animate-in fade-in zoom-in-95 duration-150">
                  {sortOptions.map((option) => (
                    <li key={option.value}>
                      <button
                        onClick={() => {
                          setSortOrder(option.value);
                          setIsSortOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2.5 text-[10px] font-black uppercase tracking-widest transition-colors
                          ${sortOrder === option.value 
                            ? 'bg-orange-600 text-white' 
                            : 'text-foreground hover:bg-orange-600 hover:text-white'
                          }`}
                      >
                        {option.label}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {mounted && (
            /* FIX: Added dynamic aria-label for Theme Toggle */
            <button 
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")} 
              className="flex items-center justify-center bg-orange-600 text-white p-2 -skew-x-12 hover:bg-orange-700 transition-all border border-orange-700 rounded-sm shrink-0 cursor-pointer"
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            >
              <div className="skew-x-12">
                {theme === "dark" ? <Sun size={18} strokeWidth={3} /> : <Moon size={18} strokeWidth={3} />}
              </div>
            </button>
          )}
        </div>
      </div>

      <div className="bg-nav border-t border-gray-800 w-full">
        <nav className="max-w-6xl mx-auto px-2 py-3 flex flex-row items-center justify-between gap-x-1 md:justify-start md:gap-x-8">
          {categories.map((cat) => (
            //by modifing this the best practice should be 100
           <Link 
                key={cat} 
                href={cat === "home" ? "/" : `/category/${cat}`}
                /* FIX: Ensure the label is clear and descriptive */
                aria-label={`View all posts in the ${cat} category`}
                className={`text-[9px] md:text-[11px] font-bold uppercase tracking-tighter md:tracking-[0.15em] transition-all duration-300 relative group antialiased hover:scale-105
                  ${pathname === (cat === "home" ? "/" : `/category/${cat}`) 
                    ? 'text-orange-600' 
                    : 'text-foreground/90 hover:text-foreground' // MODIFICATION: Increased opacity from /70 to /90 for contrast compliance
                  }`}
              >
                {cat}
                <span className={`absolute -bottom-1.5 left-0 h-[1.5px] bg-orange-600 transition-all duration-500 
                  ${pathname === (cat === "home" ? "/" : `/category/${cat}`) ? 'w-full' : 'w-0 group-hover:w-full'}`}>
                </span>
            </Link>     
          ))}
        </nav>
      </div>
    </header>
  );
}


