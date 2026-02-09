// app/layout.tsx
import "./globals.css";
import { Metadata } from "next";
import Header from "@/components/layout/header";
import { NewsProvider } from "@/context/newcontext";
import Footer from "@/components/layout/footer";
import { ThemeProvider } from 'next-themes';
// MODIFICATION: Import NextTopLoader to provide the navigation progress bar
import NextTopLoader from 'nextjs-toploader';

export const metadata: Metadata = {
  title: {
    default: "Daily News | Breaking Stories",
    template: "%s | Daily News" 
  },
  description: "Stay updated with the latest stories from Daily News",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased bg-white dark:bg-[#121417] text-black dark:text-white min-h-screen flex flex-col transition-colors duration-300">
        <ThemeProvider attribute="class" defaultTheme="dark">
          <NewsProvider>
            {/* MODIFICATION: Added NextTopLoader. 
              This creates the orange loading line at the top of the viewport 
              whenever a user clicks a category or search.
            */}
            <NextTopLoader 
              color="#ea580c"       // Matches your orange-600 branding
              showSpinner={false}    // Removes the spinning circle for a cleaner 'line' look
              height={3}             // Thickness of the loading bar
              crawl={true} 
              easing="ease" 
              speed={200} 
            />

            <Header />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </NewsProvider>
        </ThemeProvider>
      </body>
    </html>
  );
} 