"use client";

import Link from "next/link";
import Image from "next/image";
import { LogIn, Menu } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="fixed left-1/2 top-4 z-50 w-11/12 max-w-6xl -translate-x-1/2 transform rounded-full bg-gray-900 bg-opacity-80 px-4 py-2 shadow-lg backdrop-blur-lg backdrop-filter sm:px-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Image
            src="/Logo.svg"
            alt="HireStack Logo"
            width={40}
            height={40}
            className=""
          />
          <h1 className="text-lg font-bold sm:text-xl">
            <span className="text-blue-400">Hire</span>Stack
          </h1>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden space-x-20 md:flex">
          <Link
            href="/dashboard/home"
            className="text-lg text-white transition-colors hover:text-blue-400"
          >
            Home
          </Link>
          <Link
            href="/dashboard/search"
            className="text-lg text-white transition-colors hover:text-blue-400"
          >
            Search
          </Link>
          <Link
            href="/dashboard/settings"
            className="text-lg text-white transition-colors hover:text-blue-400"
          >
            Settings
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          <Link href="/api/auth/signout">
            <button className="flex items-center space-x-1 rounded-full bg-blue-600 px-3 py-1.5 text-sm font-bold text-white transition-colors hover:bg-blue-700 sm:space-x-2 sm:px-4 sm:py-2 sm:text-base">
              <LogIn className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="max-w-[100px] truncate sm:max-w-none">
                Sign Out
              </span>
            </button>
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div className={`md:hidden ${isMobileMenuOpen ? "block" : "hidden"}`}>
        <nav className="mt-4 space-y-2 rounded-lg bg-gray-800 p-4">
          <Link
            href="/dashboard/home"
            className="block py-2 text-lg text-white transition-colors hover:text-blue-400"
          >
            Home
          </Link>
          <Link
            href="/dashboard/search"
            className="block py-2 text-lg text-white transition-colors hover:text-blue-400"
          >
            Search
          </Link>
          <Link
            href="/dashboard/settings"
            className="block py-2 text-lg text-white transition-colors hover:text-blue-400"
          >
            Settings
          </Link>
        </nav>
      </div>
    </header>
  );
}
