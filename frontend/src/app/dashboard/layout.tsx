import "~/styles/globals.css";
import React from "react";
import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import { getServerAuthSession } from "~/server/auth";
import Link from "next/link";
import { LogIn } from "lucide-react";
import Header from "~/components/Header";
import { TRPCReactProvider } from "~/trpc/react";

export const metadata: Metadata = {
  title: "Hire Stack Real Time Job Search",
  description: "real-time job postings",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerAuthSession();

  if (!session) {
    return (
      <html lang="en" className={`${GeistSans.variable}`}>
        <body>
          <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 text-white">
            <div className="text-center">
              <h2 className="mb-4 text-3xl font-bold">Access Denied</h2>
              <p className="mb-4 text-xl">
                Please sign in to view your dashboard.
              </p>
              <Link href="/api/auth/signin">
                <button className="flex items-center space-x-2 rounded-full bg-blue-600 px-6 py-3 text-lg font-bold text-white transition-colors hover:bg-blue-700">
                  <LogIn className="h-5 w-5" />
                  <span>Sign In</span>
                </button>
              </Link>
            </div>
          </div>
        </body>
      </html>
    );
  }

  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <TRPCReactProvider>
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

            {/* Use the Header component */}
            <Header />

            {/* Main content */}
            <main className="relative z-20 pt-24">{children}</main>
          </div>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
