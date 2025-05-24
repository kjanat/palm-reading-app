import React from 'react';
import Link from 'next/link';
import { useEffect } from 'react';

const HomePage = () => {
  useEffect(() => {
    document.title = "Palm Reading - Discover Your Future";
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-500 to-pink-500 text-white">
      <h1 className="text-5xl font-bold mb-4">Welcome to Palm Reading</h1>
      <p className="text-lg mb-8">Unlock the secrets of your future through the art of palmistry.</p>
      <div className="flex space-x-4">
        <Link href="/login">
          <a className="bg-white text-purple-500 px-4 py-2 rounded shadow hover:bg-gray-200 transition">Login</a>
        </Link>
        <Link href="/signup">
          <a className="bg-white text-purple-500 px-4 py-2 rounded shadow hover:bg-gray-200 transition">Sign Up</a>
        </Link>
      </div>
    </div>
  );
};

export default HomePage;