import Link from 'next/link';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="fixed inset-0 z-0 bg-gradient-to-br from-gray-900 to-gray-800"></div>

      <div className="fixed inset-0 z-10 opacity-10">
        {Array.from({ length: 100 }).map((_, i) => (
          <div
            key={i}
            className="absolute h-1 w-1 rounded-full bg-white"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="container relative z-20 mx-auto flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <h1 className="mb-6 text-5xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
          404 - Page Not Found
        </h1>
        <p className="mb-8 max-w-2xl text-xl bg-gradient-to-r from-blue-200 to-green-200 bg-clip-text text-transparent">
          Oops! The page you are looking for does not exist or has been moved.
        </p>
        <Link href="/" className="hover:shadow-neon flex items-center space-x-2 rounded-full bg-blue-600 px-6 py-3 text-lg font-bold text-white transition-colors hover:bg-blue-700">
          <Home className="h-5 w-5" />
          <span>Back to Home</span>
        </Link>
      </div>
    </div>
  );
}