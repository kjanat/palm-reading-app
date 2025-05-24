import React from 'react';
import Navigation from '../components/Navigation';
import './globals.css';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-purple-500 to-blue-500 text-white">
            <header className="p-4 shadow-lg">
                <Navigation />
            </header>
            <main className="flex-grow p-6">
                {children}
            </main>
            <footer className="p-4 text-center">
                <p>&copy; {new Date().getFullYear()} Palm Reading App. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default Layout;