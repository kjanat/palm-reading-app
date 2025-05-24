import React from 'react';
import { Cinzel, Crimson_Text } from 'next/font/google';
import Navigation from '../components/Navigation';
import { AuthProvider } from '../contexts/AuthContext';
import '../styles/globals.css';

// Configure the fonts
const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cinzel',
  display: 'swap',
});

const crimsonText = Crimson_Text({
  subsets: ['latin'],
  weight: ['400', '600'],
  style: ['normal', 'italic'],
  variable: '--font-crimson-text',
  display: 'swap',
});

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <html lang="en" className={`${cinzel.variable} ${crimsonText.variable}`}>
      <body className={crimsonText.className}>
        <AuthProvider>
          <div className="min-h-screen flex flex-col bg-gradient-to-b from-purple-900 via-violet-800 to-indigo-900 text-white">
            <header className="p-4 shadow-lg bg-black/20 backdrop-blur-sm">
              <Navigation />
            </header>
            <main className="flex-grow p-6">{children}</main>
            <footer className="p-4 text-center bg-black/20 backdrop-blur-sm">
              <p>
                &copy; {new Date().getFullYear()} Mystic Palm Readings. All
                rights reserved.
              </p>
            </footer>
          </div>
        </AuthProvider>
      </body>
    </html>
  );
};

export default Layout;
