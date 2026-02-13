"use client";

import React from "react";
import { Facebook, Twitter, Instagram, Youtube, Mail } from "lucide-react";
import { useRouter } from "next/navigation"; 
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const router = useRouter();

  return (
    <footer className="w-full bg-background text-foreground border-t border-border-custom pt-12 pb-6 mt-auto transition-all duration-500 ease-in-out">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-1">
            {/* MODIFICATION: Added 'button' role to the div because it has an onClick, making it keyboard accessible */}
            <div 
              role="button"
              tabIndex={0}
              className="flex items-center tracking-tighter uppercase mb-4 cursor-pointer hover:opacity-80 transition-opacity hover:scale-105 outline-none focus-visible:ring-2 focus-visible:ring-orange-600 rounded"
              onClick={() => router.push("/")}
              onKeyDown={(e) => e.key === 'Enter' && router.push("/")}
              aria-label="Daily News Home"
            >
              <span className="text-orange-600 text-3xl font-black italic">Daily</span>
              <span className="text-foreground text-xl font-bold ml-1 transition-colors duration-500">News</span>
            </div>
            {/* MODIFICATION: Changed foreground/60 to foreground/80 for better contrast (WCAG Compliance) */}
            <p className="text-foreground/80 text-sm leading-relaxed transition-colors duration-500">
              Bringing you the most reliable and up-to-date news from around the world. Stay informed, stay ahead.
            </p>
          </div>

          {/* Categories */}
          <div>
            <h2 className="text-lg font-bold mb-4 uppercase text-orange-600">Categories</h2>
            {/* MODIFICATION: Use foreground/90 for links to ensure they are readable in Light Mode */}
            <ul className="space-y-2 text-sm text-foreground/90 transition-colors duration-500">
              <li><Link href="/category/business" className="hover:text-orange-600 transition-colors">Business</Link></li>
              <li><Link href="/category/technology" className="hover:text-orange-600 transition-colors">Technology</Link></li>
              <li><Link href="/category/science" className="hover:text-orange-600 transition-colors">Science</Link></li>
              <li><Link href="/category/sport" className="hover:text-orange-600 transition-colors">Sports</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h2 className="text-lg font-bold mb-4 uppercase text-orange-600">Support</h2>
            <ul className="space-y-2 text-sm text-foreground/90 transition-colors duration-500">
              <li><Link href="/terms" className="hover:text-orange-600 transition-colors">Terms of Service</Link></li>
              <li><Link href="/privacy" className="hover:text-orange-600 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/contact" className="hover:text-orange-600 transition-colors">Contact Us</Link></li>
              <li><Link href="/about" className="hover:text-orange-600 transition-colors">About Us</Link></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h2 className="text-lg font-bold mb-4 uppercase text-orange-600">Newsletter</h2>
            <form className="flex bg-nav border border-border-custom p-1 transition-all duration-500 focus-within:border-orange-600" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                id="newsletter-email"  // ADDED: Unique ID
                name="newsletter-email" // ADDED: Name attribute for browser autofill
                placeholder="Email address" 
                aria-label="Email address for newsletter"
                className="bg-transparent border-none outline-none text-sm p-2 w-full text-foreground placeholder:text-foreground/50 transition-colors duration-500"
              />
              <button 
                type="submit"
                aria-label="Subscribe to newsletter"
                className="bg-orange-600 text-white p-2 hover:bg-orange-700 transition-colors cursor-pointer focus-visible:bg-black outline-none"
              >
                <Mail size={18} />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border-custom pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          {/* MODIFICATION: Using gray-accessible from your CSS for the copyright text */}
          <p className="text-gray-accessible text-xs transition-colors duration-500 font-medium">
            © {currentYear} Daily News Media Group. All rights reserved.
          </p>

          <div className="flex gap-4 items-center">
            {[
              { Icon: Facebook, color: "hover:text-blue-600", url: "https://facebook.com", label: "Facebook" },
              { Icon: Twitter, color: "hover:text-blue-400", url: "https://twitter.com", label: "Twitter" },
              { Icon: Instagram, color: "hover:text-pink-500", url: "https://instagram.com", label: "Instagram" },
              { Icon: Youtube, color: "hover:text-red-600", url: "https://youtube.com", label: "YouTube" },
            ].map(({ Icon, color, url, label }, i) => (
              <a 
                key={i} 
                href={url} 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label={`Visit our ${label} page`}
                className={`text-foreground/70 transition-all duration-500 hover:scale-110 ${color} focus-visible:text-orange-600 outline-none`}
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

