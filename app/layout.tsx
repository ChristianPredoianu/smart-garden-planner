import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navigation from '@/app/components/Navigation';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Smart Garden Planner',
  description: 'Plan and manage your garden efficiently',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body className={`${inter.className} bg-green-50`}>
        <div className='min-h-screen flex flex-col'>
          <Navigation />
          <main className='flex-1 container mx-auto px-4 py-8'>{children}</main>
          <footer className='bg-green-800 text-white py-6 mt-12'>
            <div className='container mx-auto px-4 text-center'>
              <p>Smart Garden Planner &copy; {new Date().getFullYear()}</p>
              <p className='text-sm mt-2 text-green-200'>Plan your perfect garden</p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
