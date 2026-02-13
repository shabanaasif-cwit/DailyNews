// app/layout.tsx
// the layout.tsx file is like the "frame" of your website.
// It’s the place where you put things that should stay on the screen even when the user moves from one page to another.
import "./globals.css";
import { Metadata } from "next";
import Header from "@/components/layout/header";
import { NewsProvider } from "@/context/newcontext";
import Footer from "@/components/layout/footer";
import { ThemeProvider } from 'next-themes';
import NextTopLoader from 'nextjs-toploader';

export const metadata: Metadata = {
  title: {
    default: "Daily News | Get Updated ",
    //%s placeholder for string
    template: "%s | Daily News" 
  },
  description: "Stay updated with the latest stories from Daily News",
  icons: {
    //use that same name
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  //Without children, your layout would be a static box that couldn't hold any pages
  children,
}: {
  //The screen will be blank in the middle. Your pages (page.tsx) will never render because you never told the layout where to put them.
  children: React.ReactNode;
}) {
  return (
    /* suppressHydrationWarning is vital when using ThemeProvider */
    <html lang="en" suppressHydrationWarning>
      {/* MODIFICATION: Removed "bg-white dark:bg-[#121417]".
          We now use "bg-background" and "text-foreground" which are 
          linked to our CSS variables in globals.css antialiased how fonts are rendered
      */}

      {/*text look smoother, cleaner, and more professional*/}
      <body className="antialiased bg-background text-foreground min-h-screen flex flex-col transition-colors duration-75">
        <ThemeProvider 
          attribute="class" 
          defaultTheme="dark" 
          enableSystem={true}
          /* CORE MECHANISM: This tells the app that 'dark' is the base state (no class),
             and 'light' is the modifier that adds the .light class.
          */
          value={{
            light: "light",
            dark: "dark-mode-base" // This can be empty or a dummy class since Dark is our :root
          }}
        >
          
          <NewsProvider>
       
            <NextTopLoader 
              color="#ea580c"
              showSpinner={false}
              height={3}
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

