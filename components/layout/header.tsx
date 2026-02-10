'use client';

import React, { useState, useEffect } from "react";
import { Search, Menu, X, Sun, Moon, RotateCw, Filter } from "lucide-react"; 
import { useTheme } from "next-themes"; 
import Link from "next/link"; 
import { usePathname } from "next/navigation"; 
import { useNews } from "../../context/newcontext"; 
 
export default function Header() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const { searchQuery, setSearchQuery, loadData, selectedCategory, sortOrder, setSortOrder } = useNews();
  const pathname = usePathname(); 
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Prevents hydration mismatch (Ensures button only shows on client)
  useEffect(() => setMounted(true), []);

  const categories = ["home", "business", "entertainment", "general", "health", "science", "sport", "technology"];

  return (
    /* MODIFICATION: Used 'bg-background' and 'border-gray-800' */
    <header className="w-full bg-background border-b border-gray-800 sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center gap-4">
        
        <Link href="/" className="flex items-center tracking-tighter uppercase shrink-0 hover:scale-110">
          <span className="text-orange-600 text-3xl md:text-4xl font-black italic">Daily</span>
          <span className="text-foreground text-xl md:text-2xl font-bold ml-1">News</span>
        </Link>

        <div className="flex items-center gap-2 flex-grow justify-end">
          
          {/* DESKTOP CONTROLS (Hidden on Mobile) */}
          <div className="hidden sm:flex items-center w-full max-w-[550px] gap-2">
            <form className="flex bg-nav items-center px-3 py-1 -skew-x-12 border border-gray-800 w-full group focus-within:border-orange-600">
              <input
                type="text"
                placeholder="Search news..."
                className="bg-transparent border-none outline-none text-foreground text-sm py-1 skew-x-12 w-full focus:ring-0"
                value={searchQuery || ""} 
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="bg-orange-600 text-white p-1.5 ml-2 hover:bg-orange-700 transition-colors rounded-sm">
                <Search size={16} className="skew-x-12" />
              </button>
            </form>

            <button 
              onClick={() => loadData(selectedCategory)}
              className="flex items-center justify-center bg-nav text-foreground p-2 -skew-x-12 border border-gray-800 hover:text-orange-600 transition-all cursor-pointer rounded-sm shrink-0"
              title="Refresh Feed"
            >
              <div className="skew-x-12"><RotateCw size={18} /></div>
            </button>

            <div className="relative flex items-center bg-nav border border-gray-800 -skew-x-12 px-2 h-[38px] shrink-0">
               <div className="skew-x-12 flex items-center gap-2">
                 <Filter size={14} className="text-orange-600" />
                 <select 
                   value={sortOrder} 
                   onChange={(e) => setSortOrder(e.target.value)}
                   className="bg-transparent text-foreground text-[10px] font-black uppercase tracking-widest outline-none cursor-pointer pr-2"
                 >
                   <option className="text-black" value="newest">Newest</option>
                   <option className="text-black" value="oldest">Oldest</option>
                   <option className="text-black" value="a-z">A-Z</option>
                   <option className="text-black" value="z-a">Z-A</option>
                 </select>
               </div>
            </div>
          </div>

          {/* MOBILE & DESKTOP THEME TOGGLE (Always Visible) */}
          {mounted && (
            <button 
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="flex items-center justify-center bg-orange-600 text-white p-2 -skew-x-12 hover:bg-orange-700 transition-all border border-orange-700 shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)] rounded-sm shrink-0 cursor-pointer"
            >
              <div className="skew-x-12">
                {theme === "dark" ? <Sun size={18} strokeWidth={3} /> : <Moon size={18} strokeWidth={3} />}
              </div>
            </button>
          )}
          
          <button className="md:hidden text-foreground ml-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* MOBILE NAVIGATION MENU */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} md:block bg-nav border-t border-gray-800`}>
        {/* Mobile-only Search and Sort (Visible only when menu is open on small screens) */}
        <div className="sm:hidden px-4 py-4 space-y-4 border-b border-gray-800">
           <form className="flex bg-background items-center px-3 py-2 border border-gray-800 w-full rounded-sm">
              <input
                type="text"
                placeholder="Search news..."
                className="bg-transparent border-none outline-none text-foreground text-sm w-full"
                value={searchQuery || ""} 
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search size={18} className="text-orange-600" />
           </form>
           
           <div className="flex gap-2">
              <button 
                onClick={() => loadData(selectedCategory)}
                className="flex-1 flex items-center justify-center gap-2 bg-background border border-gray-800 py-2 text-xs font-bold uppercase tracking-widest text-foreground"
              >
                <RotateCw size={14} /> Refresh
              </button>
              
              <div className="flex-1 flex items-center justify-center bg-background border border-gray-800 px-2">
                <Filter size={14} className="text-orange-600 mr-2" />
                <select 
                   value={sortOrder} 
                   onChange={(e) => setSortOrder(e.target.value)}
                   className="bg-transparent text-foreground text-[10px] font-black uppercase outline-none w-full py-2"
                 >
                   <option value="newest">Newest</option>
                   <option value="oldest">Oldest</option>
                 </select>
              </div>
           </div>
        </div>

        <nav className="max-w-6xl mx-auto px-4 py-3 flex flex-wrap items-center justify-center md:justify-start gap-x-8 gap-y-3">
          {categories.map((cat) => (
          
               <Link 
                key={cat} 
                href={cat === "home" ? "/" : `/category/${cat}`}
                onClick={() => setIsMenuOpen(false)}
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



