"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { LogIn } from "lucide-react";
import type { Session } from "next-auth";

export default function DashboardClient({
  session,
}: {
  session: Session | null;
}) {
  if (!session) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="mb-4 text-3xl font-bold">Access Denied</h2>
          <p className="mb-4 text-xl">Please sign in to view your dashboard.</p>
          <Link href="/api/auth/signin">
            <button className="flex items-center space-x-2 rounded-full bg-blue-600 px-6 py-3 text-lg font-bold text-white transition-colors hover:bg-blue-700">
              <LogIn className="h-5 w-5" />
              <span>Sign In</span>
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      {/* Fixed Background */}
      <div className="fixed inset-0 z-0 bg-gradient-to-br from-gray-900 to-gray-800"></div>

      {/* Dot Pattern Background */}
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

      {/* Floating Header */}
      <header className="fixed left-1/2 top-4 z-50 w-11/12 max-w-6xl -translate-x-1/2 transform rounded-full bg-gray-900 bg-opacity-80 px-4 py-4 shadow-lg backdrop-blur-lg backdrop-filter sm:px-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Image
              src="/Logo.svg"
              alt="HireStack Logo"
              width={32}
              height={32}
              className=""
            />
            <h1 className="text-xl font-bold sm:text-2xl">
              <span className="text-blue-400">Hire</span>Stack
            </h1>
          </div>
          <nav className="hidden space-x-20 md:flex">
            <Link
              href="/home"
              className="text-white transition-colors hover:text-blue-400"
            >
              Home
            </Link>
            <Link
              href="/search"
              className="text-white transition-colors hover:text-blue-400"
            >
              Search
            </Link>
            <Link
              href="/settings"
              className="text-white transition-colors hover:text-blue-400"
            >
              Settings
            </Link>
          </nav>
          <Link href="/api/auth/signout">
            <button className="flex items-center space-x-1 rounded-full bg-blue-600 px-3 py-1.5 text-sm font-bold text-white transition-colors hover:bg-blue-700 sm:space-x-2 sm:px-4 sm:py-2 sm:text-base">
              <LogIn className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="max-w-[100px] truncate sm:max-w-none">
                Sign Out
              </span>
            </button>
          </Link>
        </div>
      </header>

      {/* Dashboard Content */}
      <div className="container relative z-20 mx-auto flex min-h-screen items-center justify-center px-4 py-20">
        <div className="text-center">
          <h2 className="mb-4 text-3xl font-bold">
            Welcome to your HireStack dashboard, {session.user?.name}!
          </h2>
          <p className="text-xl">
            Here you can manage your job search, view applications, and more.
          </p>
          {/* Add more dashboard components here */}
        </div>
      </div>
    </div>
  );
}
