"use client";

import React, { useEffect } from "react";
import { ShieldCheck, EyeOff, Lock, FileText } from "lucide-react";
import Link from "next/link"; 

export default function Privacy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    {
      icon: <EyeOff size={24} />,
      title: "Data Collection",
      content: "We collect minimal information necessary to provide our news services, such as email addresses for newsletters and browser cookies to improve your reading experience."
    },
    {
      icon: <Lock size={24} />,
      title: "Data Security",
      content: "Daily News employs industry-standard encryption and security protocols to protect your personal data from unauthorized access or disclosure."
    },
    {
      icon: <ShieldCheck size={24} />,
      title: "Third-Party Sharing",
      content: "We do not sell your personal data. Information is only shared with trusted partners essential for site functionality, such as analytics or email delivery services."
    }
  ];

  return (
    <div className="w-full bg-background text-foreground min-h-screen transition-colors duration-500">
      <main className="max-w-4xl mx-auto px-4 py-16">
        
        {/* Header Section */}
        {/* FIX: Used border-border-custom to ensure the line isn't too dark/light */}
        <div className="mb-12 border-b border-border-custom pb-8">
          <div className="flex items-center gap-3 text-orange-600 mb-4">
            <FileText size={32} />
            <span className="font-bold uppercase tracking-widest text-xs text-foreground/60 transition-colors duration-500">Legal Documentation</span>
          </div>
          <h2 className="text-4xl font-black text-foreground uppercase italic tracking-tighter transition-colors duration-500">
            Privacy <span className="text-orange-600">Policy</span>
          </h2>
          <p className="text-foreground/50 mt-4 text-sm transition-colors duration-500">Last Updated: January 31, 2026</p>
        </div>

        {/* Introduction */}
        <section className="mb-12">
          {/* FIX: Removed dark:text-zinc-300. text-foreground/90 will be 90% black in light mode. */}
          <p className="text-lg text-foreground/90 leading-relaxed transition-colors duration-500">
            At <span className="font-bold text-foreground">Daily News</span>, we value your trust. This policy outlines how we handle your information and our commitment to maintaining your privacy while you stay informed with our global reporting.
          </p>
        </section>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {sections.map((section, index) => (
            <div 
              key={index} 
              className="bg-nav p-6 border-t-4 border-orange-600 shadow-sm transition-all duration-500"
            >
              <div className="text-orange-600 mb-4">{section.icon}</div>
              <h3 className="font-bold text-foreground uppercase mb-2 text-sm">{section.title}</h3>
              {/* FIX: text-foreground/70 provides a clear 'soft black' for readability */}
              <p className="text-sm text-foreground/70 leading-relaxed transition-colors duration-500">{section.content}</p>
            </div>
          ))}
        </div>

        {/* Detailed Content */}
        {/* FIX: Applied text-foreground/80 to the parent container to fix all inner paragraphs */}
        <div className="max-w-none text-foreground/80 space-y-12 transition-colors duration-500">
          <article>
            <h3 className="text-xl font-bold text-foreground uppercase mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-orange-600 inline-block"></span>
              1. Information We Collect
            </h3>
            <p className="leading-7">
              We may collect personal identification information from Users in a variety of ways, including, but not limited to, when Users visit our site, register on the site, and subscribe to the newsletter.
            </p>
          </article>

          <article>
            <h3 className="text-xl font-bold text-foreground uppercase mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-orange-600 inline-block"></span>
              2. Cookies and Tracking
            </h3>
            <p className="leading-7">
              Our site may use "cookies" to enhance User experience. User's web browser places cookies on their hard drive for record-keeping purposes and sometimes to track information about them.
            </p>
          </article>

          <article>
            <h3 className="text-xl font-bold text-foreground uppercase mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-orange-600 inline-block"></span>
              3. Contacting Us
            </h3>
            <p className="leading-7">
              If you have any questions about this Privacy Policy, please contact our editorial team via our{" "}
              <Link href="/contact" className="text-orange-600 font-bold hover:underline">
                Contact Page
              </Link>.
            </p>
          </article>
        </div>
      </main>
    </div>
  );
}


