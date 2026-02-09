"use client";

import React, { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
    alert("Thank you! Your message has been sent to the Daily News team.");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    /* MODIFICATION: Used global variables bg-background and text-foreground */
    <div className="w-full bg-background text-foreground min-h-screen transition-colors duration-300">
      <main className="max-w-6xl mx-auto px-4 py-16">
        
        {/* Header Section */}
        <div className="mb-12">
          <h2 className="text-4xl font-extrabold text-foreground flex flex-col">
            Get In Touch
            <span className="h-1.5 w-24 bg-orange-600 mt-2"></span>
          </h2>
          {/* MODIFICATION: text-foreground/70 ensures high-contrast black in light mode */}
          <p className="text-foreground/70 dark:text-zinc-400 mt-6 text-lg max-w-2xl">
            Have a news tip, a correction, or just want to say hello? We'd love to hear from you. 
            Our team typically responds within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Contact Information Cards */}
          <div className="space-y-6"> 
            {[
              { icon: Mail, title: "Email Us", details: ["editorial@dailynews.com", "support@dailynews.com"] },
              { icon: Phone, title: "Call Us", details: ["+1 (555) 123-4567", "Mon - Fri, 9am - 6pm EST"] },
              { icon: MapPin, title: "Visit Us", details: ["123 News Plaza, Media District", "Lahore, Pakistan"] }
            ].map((item, idx) => (
              /* MODIFICATION: Changed bg-gray-50 to bg-nav for secondary background consistency */
              <div key={idx} className="bg-nav p-6 border-l-4 border-orange-600 shadow-sm transition-colors">
                <div className="flex items-center gap-4 mb-2">
                  <item.icon className="text-orange-600" size={24} />
                  <h3 className="font-bold text-lg text-foreground">{item.title}</h3>
                </div>
                {item.details.map((line, i) => (
                  <p key={i} className="text-foreground/80 dark:text-zinc-400">{line}</p>
                ))}
              </div>
            ))}
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <form 
              onSubmit={handleSubmit} 
              /* MODIFICATION: bg-background for the form container, border-gray-200 for light mode */
              className="space-y-6 bg-background border border-gray-200 dark:border-zinc-800 p-8 shadow-sm rounded-sm transition-colors"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-foreground uppercase mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    /* MODIFICATION: Used bg-nav and text-foreground for input fields */
                    className="w-full p-3 border border-gray-200 dark:border-zinc-700 bg-nav text-foreground focus:border-orange-600 outline-none transition-all placeholder:text-foreground/40"
                    placeholder="Shabana Asif"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-foreground uppercase mb-2">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-200 dark:border-zinc-700 bg-nav text-foreground focus:border-orange-600 outline-none transition-all placeholder:text-foreground/40"
                    placeholder="shabana@example.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-foreground uppercase mb-2">Subject</label>
                <input
                  type="text"
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-200 dark:border-zinc-700 bg-nav text-foreground focus:border-orange-600 outline-none transition-all placeholder:text-foreground/40"
                  placeholder="News Tip / Feedback"
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-foreground uppercase mb-2">Your Message</label>
                <textarea
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-200 dark:border-zinc-700 bg-nav text-foreground focus:border-orange-600 outline-none transition-all resize-none placeholder:text-foreground/40"
                  placeholder="Write your message here..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="bg-orange-600 text-white px-8 py-4 font-bold flex items-center gap-3 hover:bg-black dark:hover:bg-white dark:hover:text-black transition-all uppercase tracking-widest shadow-md rounded-lg cursor-pointer"
              >
                Send Message <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}


