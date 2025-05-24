import React from 'react';
import Navigation from '../components/Navigation';
import { AuthProvider } from '../contexts/AuthContext';
import '../styles/globals.css';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <html lang="en">
            <body>
                <AuthProvider>
                    <div className="min-h-screen flex flex-col bg-gradient-to-b from-purple-900 via-violet-800 to-indigo-900 text-white">
                        <header className="p-4 shadow-lg bg-black/20 backdrop-blur-sm">
                            <Navigation />
                        </header>
                        <main className="flex-grow p-6">
                            {children}
                        </main>
                        <footer className="p-4 text-center bg-black/20 backdrop-blur-sm">
                            <p>&copy; {new Date().getFullYear()} Mystic Palm Readings. All rights reserved.</p>
                        </footer>
                    </div>
                </AuthProvider>
            </body>
        </html>
    );
};

export default Layout;