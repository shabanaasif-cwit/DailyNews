"use client";



import React, { useEffect } from "react";
import { Scale, AlertCircle, CheckCircle, FileWarning } from "lucide-react";

export default function Terms() {
  // Ensure the page starts at the top when navigated from footer
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const guidelines = [
    {
      icon: <CheckCircle size={20} />,
      title: "Acceptable Use",
      text: "Users must use Daily News for personal, non-commercial information purposes only."
    },
    {
      icon: <FileWarning size={20} />,
      title: "Intellectual Property",
      text: "All articles, images, and logos are the property of Daily News and protected by copyright."
    },
    {
      icon: <AlertCircle size={20} />,
      title: "Limitations",
      text: "We provide news 'as is' and are not liable for any inaccuracies or external links."
    }
  ];

  return (
    // Updated bg-white to support dark mode
    <div className="w-full bg-white dark:bg-[#121417] min-h-screen transition-colors duration-300">
      <main className="max-w-4xl mx-auto px-4 py-16">
        
        {/* Header Section */}
        <div className="mb-12 border-b-2 border-orange-600 pb-8">
          <div className="flex items-center gap-2 text-[#121417] dark:text-white mb-4">
            <Scale className="text-orange-600" size={28} />
            <span className="font-bold uppercase tracking-tighter text-xl">Legal Agreement</span>
          </div>
          <h2 className="text-4xl font-black text-[#121417] dark:text-white uppercase italic tracking-tighter">
            Terms of <span className="text-orange-600">Service</span>
          </h2>
          <p className="text-gray-500 dark:text-zinc-400 mt-2">Effective Date: January 31, 2026</p>
        </div>

        {/* Quick Summary Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {guidelines.map((item, index) => (
            // Added dark:bg and dark:border classes
            <div key={index} className="p-6 bg-gray-50 dark:bg-[#1a1d21] border border-gray-100 dark:border-zinc-800 rounded-sm shadow-sm transition-colors">
              <div className="text-orange-600 mb-3">{item.icon}</div>
              <h4 className="font-bold text-[#121417] dark:text-white text-sm uppercase mb-2">{item.title}</h4>
              <p className="text-xs text-gray-600 dark:text-zinc-400 leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>

        {/* Full Terms Content */}
        <div className="space-y-10 text-gray-700 dark:text-zinc-300 leading-7">
          <section>
            <h3 className="text-lg font-black text-[#121417] dark:text-white uppercase mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-orange-600 inline-block"></span>
              1. User Agreement
            </h3>
            <p>
              By accessing or using the Daily News website, you agree to be bound by these Terms of Service. 
              If you do not agree with any part of these terms, you must not use our services.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-black text-[#121417] dark:text-white uppercase mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-orange-600 inline-block"></span>
              2. Content Ownership
            </h3>
            <p>
              The content provided on Daily News—including text, graphics, and code—is the intellectual property 
              of Daily News Media Group. Reproduction or redistribution of this content without 
              express written permission is strictly prohibited.
            </p>
          </section>

          <section>
            <h3 className="text-lg font-black text-[#121417] dark:text-white uppercase mb-4 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-orange-600 inline-block"></span>
              3. Account Responsibility
            </h3>
            <p>
              Users are responsible for maintaining the confidentiality of any account information and for 
              all activities that occur under their credentials while browsing our global reporting.
            </p>
          </section>

          {/* Alert box styling for Dark Mode */}
          <section className="bg-orange-50 dark:bg-orange-900/20 p-6 border-l-4 border-orange-600 italic shadow-lg transition-colors">
            <p className="text-sm dark:text-orange-200">
              Note: Daily News reserves the right to modify these terms at any time. We recommend checking 
              this page regularly for updates to ensure you stay informed.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
}