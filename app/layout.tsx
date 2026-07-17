import type { Metadata } from 'next';
import { Geist, Geist_Mono, Roboto } from 'next/font/google';
import './globals.css';
import { cn } from "@/lib/utils";

const roboto = Roboto({subsets:['latin'],variable:'--font-sans'});


export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html lang="en" className={cn("h-full", "antialiased", "font-sans", roboto.variable)}>
         <body className="min-h-full flex flex-col">
          
            {children}
         </body>
      </html>
   );
}
