"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Search,
  BookOpen,
  LogIn,
  Zap,
  TrendingUp,
  Award,
  Code,
  Globe,
} from "lucide-react";
import Image from "next/image";
import RecentPostings from "./RecentPostings";

// Add this type for the session
import type { Session } from "next-auth";

// Update the component to accept session as a prop
export default function HomeClient({ session }: { session: Session | null }) {
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/dashboard/home");
    }
  }, [session, router]);

  const techCompanies = [
    {
      name: "Google",
      logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
    },
    {
      name: "Apple",
      logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
    },
    {
      name: "Meta",
      logo: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg",
    },
    {
      name: "Amazon",
      logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
    },
    {
      name: "Microsoft",
      logo: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg",
    },
    {
      name: "Tesla",
      logo: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Tesla_Motors.svg",
    },
    {
      name: "Nvidia",
      logo: "https://upload.wikimedia.org/wikipedia/sco/2/21/Nvidia_logo.svg",
    },
  ];

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

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
      {session ? (
        <></>
      ) : (
        <header className="fixed left-1/2 top-4 z-50 w-11/12 max-w-6xl -translate-x-1/2 transform rounded-full bg-gray-900 bg-opacity-80 px-4 py-4 shadow-lg backdrop-blur-lg backdrop-filter sm:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Image
                src="/Logo.svg"
                alt="HireStack Logo"
                width={64}
                height={64}
                className=""
              />
              <h1 className="text-xl font-bold sm:text-2xl">
                <span className="text-blue-400">Hire</span>Stack
              </h1>
            </div>
            <nav className="hidden space-x-20 md:flex">
              <button
                onClick={() => scrollToSection("home")}
                className="text-lg text-white transition-colors hover:text-blue-400"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("features")}
                className="text-lg text-white transition-colors hover:text-blue-400"
              >
                Features
              </button>
              <button
                onClick={() => scrollToSection("jobs")}
                className="text-lg text-white transition-colors hover:text-blue-400"
              >
                Jobs
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-lg text-white transition-colors hover:text-blue-400"
              >
                Contact
              </button>
            </nav>
            <Link href="/api/auth/signin">
              <button className="flex items-center space-x-1 rounded-full bg-blue-600 px-3 py-1.5 text-sm font-bold text-white transition-colors hover:bg-blue-700 sm:space-x-2 sm:px-4 sm:py-2 sm:text-base">
                <LogIn className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="max-w-[100px] truncate sm:max-w-none">
                  Login
                </span>
              </button>
            </Link>
          </div>
        </header>
      )}

      {session ? (
        <div></div>
      ) : (
        <>
          {/* Hero Section with Scrolling Logo Bar */}
          <section
            id="home"
            className="container relative z-20 mx-auto flex h-screen flex-col items-center justify-between px-4 text-center"
          >
            {/* Main Hero Content */}
            <div className="flex flex-1 flex-col items-center justify-center">
              <h2 className="mb-6 bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-5xl font-bold text-transparent">
                Find Your Dream Developer Job in Real-Time docker
              </h2>
              <p className="mb-8 max-w-2xl bg-gradient-to-r from-blue-200 to-green-200 bg-clip-text text-xl text-transparent">
                HireStack aggregates job postings from top sites, providing
                real-time updates, comprehensive stats, and interview prep
                resources.
              </p>
              <Link href="/api/auth/signin">
                <button className="hover:shadow-neon flex items-center space-x-2 rounded-full bg-blue-600 px-6 py-3 text-lg font-bold text-white transition-colors hover:bg-blue-700">
                  <Search className="h-5 w-5" />
                  <span>Start Your Job Search</span>
                </button>
              </Link>
            </div>

            {/* Scrolling Logo Bar */}
            <div className="mb-4 w-full overflow-hidden">
              <div className="animate-scroll inline-flex">
                {[...techCompanies, ...techCompanies, ...techCompanies].map(
                  (company, index) => (
                    <div
                      key={index}
                      className="mx-10 flex items-center space-x-2"
                    >
                      <Image
                        src={company.logo}
                        alt={`${company.name} logo`}
                        width={32}
                        height={32}
                        className="object-contain"
                      />
                      <span className="text-lg font-semibold text-gray-400">
                        {company.name}
                      </span>
                    </div>
                  ),
                )}
              </div>
            </div>
          </section>

          {/* Bento Style Information Cards */}
          <section id="features" className="relative z-20 py-20">
            <div className="container mx-auto px-8">
              <h3 className="mb-10 text-center text-3xl font-bold">
                Why Choose HireStack?
              </h3>
              <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                {[
                  {
                    icon: Zap,
                    color: "text-yellow-400",
                    title: "Real-time Updates",
                    description:
                      "Get instant notifications for new job postings that match your skills and preferences.",
                    span: "md:col-span-1",
                  },
                  {
                    icon: TrendingUp,
                    color: "text-green-400",
                    title: "AI-Powered Matching",
                    description:
                      "Our advanced algorithms ensure you only see the most relevant opportunities, saving you time and increasing your chances of landing the perfect job.",
                    span: "md:col-span-2",
                  },
                  {
                    icon: BookOpen,
                    color: "text-blue-400",
                    title: "Interview Prep Resources",
                    description:
                      "Access a wealth of resources including practice questions, mock interviews, and tips from industry experts to help you ace your interviews.",
                    span: "md:col-span-2",
                  },
                  {
                    icon: Award,
                    color: "text-purple-400",
                    title: "Career Growth Tools",
                    description:
                      "Utilize our career growth tools to track your progress, set goals, and advance your developer career.",
                    span: "md:col-span-1",
                  },
                  {
                    icon: Code,
                    color: "text-pink-400",
                    title: "Skill Assessments",
                    description:
                      "Showcase your coding skills with our built-in assessments and stand out to potential employers.",
                    span: "md:col-span-1",
                  },
                  {
                    icon: Globe,
                    color: "text-indigo-400",
                    title: "Global Opportunities",
                    description:
                      "Access job opportunities from around the world, including remote positions and international roles.",
                    span: "md:col-span-1",
                  },
                ].map((item, index) => (
                  <div
                    key={index}
                    className={`group relative transform overflow-hidden rounded-lg bg-gray-800 bg-opacity-50 p-6 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${item.span}`}
                  >
                    <div className="relative z-10">
                      <item.icon className={`mb-4 h-12 w-12 ${item.color}`} />
                      <h4 className="mb-2 text-xl font-semibold">
                        {item.title}
                      </h4>
                      <p>{item.description}</p>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-green-400 opacity-0 transition-opacity duration-300 group-hover:opacity-20"></div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Real-time Job Listings */}
          <section id="jobs" className="container relative z-10 mx-auto py-20">
            <RecentPostings />
          </section>

          {/* CTA Section */}
          <section className="container relative z-20 mx-auto px-4 py-20">
            <div className="rounded-lg bg-gray-800 bg-opacity-50 p-8 text-center shadow-lg">
              <h3 className="mb-4 text-3xl font-bold">
                Ready to Supercharge Your Job Search?
              </h3>
              <p className="mb-6 text-xl">
                Join thousands of developers who have found their perfect job
                through HireStack.
              </p>
              <Link href="/api/auth/signin">
                <button className="hover:shadow-neon rounded-full bg-blue-600 px-8 py-3 text-lg font-bold text-white transition-colors hover:bg-blue-700">
                  Sign Up Now
                </button>
              </Link>
            </div>
          </section>

          {/* Footer */}
          <footer id="contact" className="relative z-20 bg-gray-900 py-12">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                <div>
                  <h4 className="mb-4 text-xl font-bold">HireStack</h4>
                  <p className="text-gray-400">
                    Connecting developers with their dream jobs.
                  </p>
                </div>
                <div>
                  <h5 className="mb-4 text-lg font-semibold">Quick Links</h5>
                  <ul className="space-y-2">
                    <li>
                      <button
                        onClick={() => scrollToSection("home")}
                        className="text-gray-400 transition-colors hover:text-white"
                      >
                        Home
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => scrollToSection("features")}
                        className="text-gray-400 transition-colors hover:text-white"
                      >
                        Features
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => scrollToSection("jobs")}
                        className="text-gray-400 transition-colors hover:text-white"
                      >
                        Jobs
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => scrollToSection("contact")}
                        className="text-gray-400 transition-colors hover:text-white"
                      >
                        Contact
                      </button>
                    </li>
                  </ul>
                </div>
                <div>
                  <h5 className="mb-4 text-lg font-semibold">Connect</h5>
                  <ul className="space-y-2">
                    <li>
                      <a
                        href="#"
                        className="text-gray-400 transition-colors hover:text-white"
                      >
                        Twitter
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-gray-400 transition-colors hover:text-white"
                      >
                        LinkedIn
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-gray-400 transition-colors hover:text-white"
                      >
                        GitHub
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-gray-400 transition-colors hover:text-white"
                      >
                        Discord
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="mt-8 border-t border-gray-800 pt-8 text-center">
                <p className="text-gray-400">
                  &copy; 2023 HireStack. All rights reserved.
                </p>
              </div>
            </div>
          </footer>

          <style jsx>{`
            @keyframes fadeInUp {
              from {
                opacity: 0;
                transform: translateY(20px);
              }
              to {
                opacity: 1;
                transform: translateY(0);
              }
            }

            .animate-fade-in-up {
              animation: fadeInUp 0.6s ease-out forwards;
            }

            .animation-delay-300 {
              animation-delay: 300ms;
            }

            .animation-delay-600 {
              animation-delay: 600ms;
            }

            .hover\\:shadow-neon:hover {
              box-shadow: 0 0 15px rgba(59, 130, 246, 0.5);
            }

            @keyframes gradient {
              0% {
                background-position: 0% 50%;
              }
              50% {
                background-position: 100% 50%;
              }
              100% {
                background-position: 0% 50%;
              }
            }

            .animate-gradient-text {
              background: linear-gradient(135deg, #3b82f6, #10b981);
              background-size: 200% 200%;
              background-clip: text;
              -webkit-background-clip: text;
              -webkit-text-fill-color: transparent;
              animation: gradient 5s ease-in-out infinite;
            }

            @keyframes scroll {
              0% {
                transform: translateX(0);
              }
              100% {
                transform: translateX(-33.33%);
              }
            }

            .animate-scroll {
              animation: scroll 30s linear infinite;
              width: 300%; /* Tripled width */
            }
          `}</style>
        </>
      )}
    </div>
  );
}
