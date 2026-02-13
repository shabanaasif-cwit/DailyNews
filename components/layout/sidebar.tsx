'use client';

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  X, Home, Briefcase, Film, Newspaper, HeartPulse, 
  FlaskConical, Trophy, Cpu, Search, RotateCw,
  FileText, ShieldCheck, Mail, Info, ChevronDown, ChevronUp, Layers
} from "lucide-react";
import { useNews } from "../../context/newcontext"; 

interface SidebarProps {
  isOpen: boolean;
  //nop return value
  onClose: () => void;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  //If your website is www.dailynews.com/category/technology
  //usePathname() will return the string: "/category/technology
  const pathname = usePathname();
  const { searchQuery, setSearchQuery, loadData, selectedCategory } = useNews();
  
  // State for the click-to-reveal category list
  //false means this state is currently off or hidden
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);

  const categories = [
    { name: "Home", icon: Home, path: "/" },
    { name: "Business", icon: Briefcase, path: "/category/business" },
    { name: "Entertainment", icon: Film, path: "/category/entertainment" },
    { name: "General", icon: Newspaper, path: "/category/general" },
    { name: "Health", icon: HeartPulse, path: "/category/health" },
    { name: "Science", icon: FlaskConical, path: "/category/science" },
    { name: "Sport", icon: Trophy, path: "/category/sport" },
    { name: "Technology", icon: Cpu, path: "/category/technology" },
  ];

  const legalLinks = [
    { name: "Terms Of Service", icon: FileText, path: "/terms" },
    { name: "Privacy Policy", icon: ShieldCheck, path: "/privacy" },
    { name: "Contact Us", icon: Mail, path: "/contact" },
    { name: "About Us", icon: Info, path: "/about" },
  ];

  return (
    <>
      {/* Blur Backdrop Overlay */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-md z-[100] transition-opacity duration-300 ${
          isOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={onClose}
      />

      <aside className={`fixed top-0 left-0 h-full w-[300px] bg-background border-r border-gray-800 z-[110] transition-transform duration-300 ease-in-out transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}>
        <div className="flex flex-col h-full p-6">
          {/* Sidebar Header */}
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-lg font-bold uppercase tracking-widest text-orange-600">Menu</h2>
            <button 
              onClick={onClose} 
              className="text-foreground/70 hover:text-orange-600 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-orange-600 rounded"
              aria-label="Close search" // ADDED: Accessible name for screen readers
            >
              <X size={24} aria-hidden="true" /> {/* Hide the icon itself from screen readers */}
            </button>
          </div>

          {/* Search & Refresh (Visible only on Mobile) */}
          <div className="space-y-4 mb-8 md:hidden cursor-pointer">
            <form className="flex bg-nav items-center px-3 py-1 -skew-x-12 border border-gray-800 w-full focus-within:border-orange-600">
              <input
                type="text"
                id="search-news"       
                name="search-news"  
                placeholder="Search news..."
                className="bg-transparent border-none outline-none text-foreground text-sm py-1 skew-x-12 w-full focus:ring-0"
                value={searchQuery || ""} 
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search size={16} className="text-orange-600 skew-x-12" />
            </form>

            <button 
              onClick={() => { loadData(selectedCategory); onClose(); }}
              className="w-full flex items-center justify-center gap-3 bg-nav text-foreground py-2.5 -skew-x-12 border border-gray-800 hover:text-orange-600 rounded-sm"
            >
              <RotateCw size={18} className="skew-x-12" />
              <span className="skew-x-12 font-bold uppercase text-[10px] tracking-widest">Refresh Feed</span>
            </button>
          </div>

          <nav className="flex-grow space-y-2 overflow-y-auto pr-2 custom-scrollbar">
            
            {/* CLICK-TO-REVEAL CATEGORY SECTION */}
            <div className="flex flex-col">
              <button 
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                className={`flex items-center justify-between px-3 py-3 rounded-md text-sm font-bold transition-all duration-300 cursor-pointer ${
                  isCategoryOpen 
                    ? "text-orange-600 bg-orange-600/5 border border-orange-600/20" 
                    : "text-foreground/70 hover:text-orange-600 border border-transparent"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Layers size={18} />
                  <span>Category</span>
                </div>
                {isCategoryOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
              </button>

              {/* Collapsible UL/LI List */}
              {/*its a fence that say if any content inside this box tries to growlarger than itself chop or hide it */}
              <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
                isCategoryOpen ? "max-h-[500px] opacity-100 mt-2" : "max-h-0 opacity-0"
              }`}>
                <ul className="pl-6 space-y-1 border-l-2 border-orange-600 ml-5">
                  {categories.map((cat) => {
                    const isActive = pathname === cat.path;
                    return (
                      <li key={cat.name}>
                        <Link
                          href={cat.path}
                          onClick={onClose}
                          className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-semibold transition-all duration-200 ${
                            isActive ? "text-orange-600" : "text-foreground/60 hover:text-orange-600"
                          }`}
                        >
                          <cat.icon size={16} className={isActive ? "text-orange-600" : ""} />
                          {cat.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
 
            {/* Support & Legal (Always Visible) */}
            <div className="pt-4 space-y-1">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500 mb-3 px-3">Support & Info</p>
              {legalLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.path}
                  onClick={onClose}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md text-sm font-semibold transition-all duration-300 ${
                    pathname === link.path ? "bg-orange-600 text-white" : "text-foreground/70 hover:bg-orange-600/10 hover:text-orange-600"
                  }`}
                >
                  <link.icon size={18} />
                  {link.name}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </aside>
    </>
  );
}

