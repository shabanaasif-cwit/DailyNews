"use client";

import React from "react";
import { Facebook, Twitter, Instagram, Youtube, Mail } from "lucide-react";
import { useRouter } from "next/navigation"; 
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const router = useRouter();

  return (
    /* Key Changes: 
       - bg-background and text-foreground connect to your CSS variables.
       - transition-all duration-500 ease-in-out ensures the smooth fade.
    */
    <footer className="w-full bg-background text-foreground border-t border-border-custom pt-12 pb-6 mt-auto transition-all duration-500 ease-in-out">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-1">
            <div 
              className="flex items-center tracking-tighter uppercase mb-4 cursor-pointer hover:opacity-80 transition-opacity hover:scale-105"
              onClick={() => router.push("/")}
            >
              <span className="text-orange-600 text-3xl font-black italic">Daily</span>
              <span className="text-foreground text-xl font-bold ml-1">News</span>
            </div>
            <p className="text-foreground/60 dark:text-zinc-400 text-sm leading-relaxed transition-colors duration-500">
              Bringing you the most reliable and up-to-date news from around the world. Stay informed, stay ahead.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-bold mb-4 uppercase text-orange-600">Categories</h4>
            <ul className="space-y-2 text-sm text-foreground/70 dark:text-zinc-400 transition-colors duration-500">
              <li><Link href="/category/business" className="hover:text-orange-600 transition-colors">Business</Link></li>
              <li><Link href="/category/technology" className="hover:text-orange-600 transition-colors">Technology</Link></li>
              <li><Link href="/category/science" className="hover:text-orange-600 transition-colors">Science</Link></li>
              <li><Link href="/category/sport" className="hover:text-orange-600 transition-colors">Sports</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-bold mb-4 uppercase text-orange-600">Support</h4>
            <ul className="space-y-2 text-sm text-foreground/70 dark:text-zinc-400 transition-colors duration-500">
              <li><Link href="/contact" className="hover:text-orange-600 transition-colors">Contact Us</Link></li>
              <li><Link href="/about" className="hover:text-orange-600 transition-colors">About Us</Link></li>
              <li><Link href="/privacy" className="hover:text-orange-600 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-orange-600 transition-colors">Terms of Service</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-lg font-bold mb-4 uppercase text-orange-600 mb-4">Newsletter</h4>
            <div className="flex bg-nav border border-border-custom p-1 transition-all duration-500">
              <input 
                type="email" 
                placeholder="Email address" 
                className="bg-transparent border-none outline-none text-sm p-2 w-full text-foreground placeholder:text-foreground/30"
              />
              <button className="bg-orange-600 text-white p-2 hover:bg-orange-700 transition-colors cursor-pointer">
                <Mail size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border-custom pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-foreground/50 text-xs transition-colors duration-500">
            © {currentYear} Daily News Media Group. All rights reserved.
          </p>

          <div className="flex gap-4 items-center">
            {[
              { Icon: Facebook, color: "hover:text-blue-600", url: "https://facebook.com" },
              { Icon: Twitter, color: "hover:text-blue-400", url: "https://twitter.com" },
              { Icon: Instagram, color: "hover:text-pink-500", url: "https://instagram.com" },
              { Icon: Youtube, color: "hover:text-red-600", url: "https://youtube.com" },
            ].map(({ Icon, color, url }, i) => (
              <a 
                key={i} 
                href={url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={`text-foreground/60 transition-all duration-500 hover:scale-110 ${color}`}
              >
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

