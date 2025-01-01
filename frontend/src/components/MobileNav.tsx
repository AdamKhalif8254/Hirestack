import { useState } from "react";
import Link from "next/link";
import { Menu, X, LogIn } from "lucide-react";

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      {/* Hamburger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-white focus:outline-none"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-2 rounded-lg bg-gray-900 bg-opacity-95 p-4 backdrop-blur-lg">
          <nav className="flex flex-col space-y-4">
            <Link
              href="/dashboard/home"
              className="text-lg text-white transition-colors hover:text-blue-400"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/dashboard/search"
              className="text-lg text-white transition-colors hover:text-blue-400"
              onClick={() => setIsOpen(false)}
            >
              Search
            </Link>
            <Link
              href="/dashboard/settings"
              className="text-lg text-white transition-colors hover:text-blue-400"
              onClick={() => setIsOpen(false)}
            >
              Settings
            </Link>
            <Link
              href="/api/auth/signout"
              className="flex items-center space-x-2 text-lg text-white transition-colors hover:text-blue-400"
              onClick={() => setIsOpen(false)}
            >
              <LogIn className="h-4 w-4" />
              <span>Sign Out</span>
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
}
