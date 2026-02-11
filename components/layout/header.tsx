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
  
  // Custom Dropdown State
  const [isSortOpen, setIsSortOpen] = useState(false);
  const sortRef = useRef<HTMLDivElement>(null);

  const sortOptions = [
    { value: 'newest', label: 'Newest' },
    { value: 'oldest', label: 'Oldest' },
    { value: 'az', label: 'A - Z' },
    { value: 'za', label: 'Z - A' },
  ];

  useEffect(() => {
    setMounted(true);
    
    // Close dropdown when clicking outside
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
        
        {/* Logo and Sidebar Trigger */}
        <div className="flex items-center gap-3">
          <button 
            className="text-foreground hover:text-orange-600 transition-colors cursor-pointer" 
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu size={28} />
          </button>
          
          <Link href="/" className="flex items-center tracking-tighter uppercase shrink-0 hover:scale-105 transition-transform">
            <span className="text-orange-600 text-3xl md:text-4xl font-black italic">Daily</span>
            <span className="text-foreground text-xl md:text-2xl font-bold ml-1">News</span>
          </Link>
        </div>

        {/* Search and Controls */}
        <div className="flex items-center gap-2 flex-grow justify-end">
          <div className="hidden sm:flex items-center w-full max-w-[550px] gap-2">
            <form className="flex bg-nav items-center px-3 py-1 -skew-x-12 border border-gray-800 w-full group focus-within:border-orange-600 transition-colors">
              <input
                type="text"
                placeholder="Search news..."
                className="bg-transparent border-none outline-none text-foreground text-sm py-1 skew-x-12 w-full focus:ring-0"
                value={searchQuery || ""} 
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="bg-orange-600 text-white p-1.5 ml-2 hover:bg-orange-700 transition-colors rounded-sm cursor-pointer">
                <Search size={16} className="skew-x-12" />
              </button>
            </form>

            {/* Refresh Button */}
            <button 
              onClick={() => loadData(selectedCategory)}
              className="flex items-center justify-center bg-nav text-foreground p-2 -skew-x-12 border border-gray-800 hover:text-orange-600 transition-all cursor-pointer rounded-sm shrink-0"
            >
              <div className="skew-x-12"><RotateCw size={18} /></div>
            </button>

            {/* STRAIGHT CUSTOM SORTING DROPDOWN */}
            <div className="relative shrink-0" ref={sortRef}>
              <button 
                onClick={() => setIsSortOpen(!isSortOpen)}
                className={`flex items-center bg-nav border ${isSortOpen ? 'border-orange-600' : 'border-gray-800'} -skew-x-12 px-3 h-[38px] hover:border-orange-600 transition-colors group/sort cursor-pointer`}
              >
                <div className="skew-x-12 flex items-center gap-2">
                  <Filter size={14} className="text-orange-600" />
                  <span className="text-foreground text-[10px] font-black uppercase tracking-widest min-w-[60px] text-left">
                    {sortOptions.find(o => o.value === sortOrder)?.label || 'Sort'}
                  </span>
                  <ChevronDown size={12} className={`transition-transform duration-300 text-gray-500 ${isSortOpen ? 'rotate-180 text-orange-600' : ''}`} />
                </div>
              </button>

              {/* Straight Menu - No Skew for maximum clarity */}
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
                            : 'text-foreground hover:bg-orange-600 hover:text-white' // ORANGE HOVER BAR
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

          {/* Theme Toggle */}
          {mounted && (
            <button 
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="flex items-center justify-center bg-orange-600 text-white p-2 -skew-x-12 hover:bg-orange-700 transition-all border border-orange-700 rounded-sm shrink-0 cursor-pointer"
            >
              <div className="skew-x-12">
                {theme === "dark" ? <Sun size={18} strokeWidth={3} /> : <Moon size={18} strokeWidth={3} />}
              </div>
            </button>
          )}
        </div>
      </div>

      {/* Category Navigation */}
      <div className="md:block bg-nav border-t border-gray-800">
        <nav className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap items-center justify-center md:justify-start gap-x-8 gap-y-3">
          {categories.map((cat) => (
            <Link 
              key={cat} 
              href={cat === "home" ? "/" : `/category/${cat}`}
              className={`text-[11px] font-bold uppercase tracking-[0.15em] transition-all duration-300 relative group antialiased hover:scale-105 inline-block transform
                ${pathname === (cat === "home" ? "/" : `/category/${cat}`) ? 'text-orange-600' : 'text-foreground/70 hover:text-foreground'}`}
            >
              {cat}
              <span className={`absolute -bottom-1.5 left-0 h-[1.5px] bg-orange-600 transition-all duration-500 ${pathname === (cat === "home" ? "/" : `/category/${cat}`) ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
            </Link> 
          ))}
        </nav>
      </div>
    </header>
  );
}

