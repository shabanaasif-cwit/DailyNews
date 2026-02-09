// app/layout.tsx
import "./globals.css";
import { Metadata } from "next";
import Header from "@/components/layout/header";
import { NewsProvider } from "@/context/newcontext";
import Footer from "@/components/layout/footer";
import { ThemeProvider } from 'next-themes';

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
