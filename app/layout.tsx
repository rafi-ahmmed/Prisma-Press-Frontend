import type { Metadata } from 'next';
import { Geist, Geist_Mono, Roboto } from 'next/font/google';
import './globals.css';
import { cn } from '@/lib/utils';
import { Toaster } from 'sonner';
import { Navbar } from '@/components/shared/navbar';
import { getMe } from '@/service/getme';

const roboto = Roboto({ subsets: ['latin'], variable: '--font-sans' });

export default async function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html
         lang="en"
         className={cn('h-full', 'antialiased', 'font-sans', roboto.variable)}
      >
         <body className="min-h-full flex flex-col">
            {children}
            <Toaster position="top-right" richColors />
         </body>
      </html>
   );
}
