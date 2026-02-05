'use client';

import React, { useState } from "react";
import { Search, Moon, Menu, X } from "lucide-react"; 
import Link from "next/link"; 
import { usePathname } from "next/navigation"; 
import { useNews } from "../../context/newcontext"; 

export default function Header() {
  const { searchQuery, setSearchQuery } = useNews();
  const pathname = usePathname(); 
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const categories = [
    "home", "business", "entertainment", "general", 
    "health", "science", "sport", "technology"
  ];

  return (
    <header className="w-full bg-[#121417] border-b border-gray-800 sticky top-0 z-50">
      {/* ROW 1: Logo and Search */}
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center gap-8">
        
        {/* LOGO */}
        <Link href="/" className="flex items-center tracking-tighter uppercase shrink-0">
          <span className="text-orange-600 text-3xl md:text-4xl font-black italic">Daily</span>
          <span className="text-white text-xl md:text-2xl font-bold ml-1">News</span>
        </Link>

        {/* SEARCH & THEME TOGGLE */}
        <div className="flex items-center gap-3 flex-grow justify-end">
          <div className="hidden sm:flex items-center w-full max-w-[400px]">
            <div className="flex bg-[#1a1d21] items-center px-3 py-1 -skew-x-12 border border-gray-800 w-full group focus-within:border-orange-600">
              <input
                type="text"
                placeholder="Search for news..."
                className="bg-transparent border-none outline-none text-gray-300 text-sm py-1 skew-x-12 w-full focus:ring-0"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="bg-orange-600 text-white p-1.5 ml-2 hover:bg-orange-700 transition-colors">
                <Search size={18} className="skew-x-12" />
              </button>
            </div>
          </div>
          
          <button className="bg-orange-600 p-2 rounded-md text-white hover:bg-orange-700 transition-colors shrink-0">
            <Moon size={20} />
          </button>

          {/* Mobile Menu Icon */}
          <button className="md:hidden text-white ml-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* ROW 2: Categories (Below Search) */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:block bg-[#1a1d21] border-t border-gray-800`}>
        <nav className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap items-center justify-center md:justify-start gap-x-8 gap-y-3">
          {categories.map((cat) => (
            <Link 
              key={cat} 
              href={`/category/${cat}`}
              className={`text-[11px] font-black uppercase tracking-[0.2em] transition-all duration-200 hover:text-orange-600 relative group ${
                pathname === `/category/${cat}` ? 'text-orange-600' : 'text-gray-400'
              }`}
            >
              {cat}
              {/* Animated underline effect */}
              <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-orange-600 transition-all group-hover:w-full ${pathname === `/category/${cat}` ? 'w-full' : ''}`}></span>
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

