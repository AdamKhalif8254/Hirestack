'use client';
import React, { useRef } from "react";
import Link from 'next/link';
import {
  ChevronUp,
  Search,
  Briefcase,
  DollarSign,
  Users,
  BookOpen,
  LogIn,
  Zap,
  TrendingUp,
  Award,
  Code,
  Globe,
} from "lucide-react";
import Image from 'next/image';

// Add this type for the session
import type { Session } from "next-auth";

// Update the component to accept session as a prop
export default function HomeClient({ session }: { session: Session | null }) {
  const jobData = [
    {
      id: 1,
      title: "Senior React Developer",
      company: "TechCorp",
      salary: "$120k-$150k",
      employees: 5,
      leetcodeQuestions: ["Two Sum", "Reverse Linked List"],
      credentials: ["5+ years React", "CS Degree"],
    },
    {
      id: 2,
      title: "Full Stack Engineer",
      company: "WebSolutions",
      salary: "$100k-$130k",
      employees: 3,
      leetcodeQuestions: ["Valid Parentheses", "Merge Intervals"],
      credentials: ["3+ years Full Stack", "Node.js experience"],
    },
    {
      id: 3,
      title: "Data Scientist",
      company: "AI Innovations",
      salary: "$130k-$160k",
      employees: 2,
      leetcodeQuestions: ["K-Means Clustering", "Linear Regression"],
      credentials: ["PhD in ML/AI", "Python expertise"],
    },
    {
      id: 4,
      title: "DevOps Engineer",
      company: "CloudTech",
      salary: "$110k-$140k",
      employees: 4,
      leetcodeQuestions: ["Design CircularQueue", "Implement Trie"],
      credentials: ["AWS Certified", "Kubernetes experience"],
    },
    {
      id: 5,
      title: "UI/UX Designer",
      company: "DesignPro",
      salary: "$90k-$120k",
      employees: 6,
      leetcodeQuestions: ["N/A"],
      credentials: ["5+ years UX experience", "Figma proficiency"],
    },
    {
      id: 6,
      title: "Mobile App Developer",
      company: "AppWizards",
      salary: "$100k-$130k",
      employees: 4,
      leetcodeQuestions: ["LRU Cache", "Word Search II"],
      credentials: ["iOS & Android experience", "React Native skills"],
    },
  ];

  const techCompanies = [
    { name: "Google", logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" },
    { name: "Apple", logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" },
    { name: "Meta", logo: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg" },
    { name: "Amazon", logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" },
    { name: "Microsoft", logo: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg" },
    { name: "Tesla", logo: "https://upload.wikimedia.org/wikipedia/commons/b/bd/Tesla_Motors.svg" },
    { name: "Nvidia", logo: "https://upload.wikimedia.org/wikipedia/sco/2/21/Nvidia_logo.svg" },
  ];

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

    const cardsRef = useRef<HTMLDivElement | null>(null)
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
      <header className="fixed left-1/2 top-4 z-50 w-11/12 max-w-6xl -translate-x-1/2 transform rounded-full bg-gray-900 bg-opacity-80 px-4 sm:px-8 py-4 shadow-lg backdrop-blur-lg backdrop-filter">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Image src="/Logo.svg" alt="HireStack Logo" width={32} height={32} className="" />
            <h1 className="text-xl sm:text-2xl font-bold">
              <span className="text-blue-400">Hire</span>Stack
            </h1>
          </div>
          <nav className="hidden md:flex space-x-20">
            {session ? (
                <>
                  <Link href="/dashboard" className="text-white hover:text-blue-400 transition-colors">Dashboard</Link>
                <Link href="/search" className="text-white hover:text-blue-400 transition-colors">Search</Link>
                <Link href="/settings" className="text-white hover:text-blue-400 transition-colors">Settings</Link>
              </>
              
            ) : (
              <>
                <button onClick={() => scrollToSection('home')} className="text-white hover:text-blue-400 transition-colors">Home</button>
                <button onClick={() => scrollToSection('features')} className="text-white hover:text-blue-400 transition-colors">Features</button>
                <button onClick={() => scrollToSection('jobs')} className="text-white hover:text-blue-400 transition-colors">Jobs</button>
                <button onClick={() => scrollToSection('contact')} className="text-white hover:text-blue-400 transition-colors">Contact</button>
              </>
            )}
          </nav>
          <Link href={session ? "/api/auth/signout" : "/api/auth/signin"}>
            <button className="flex items-center space-x-1 sm:space-x-2 rounded-full bg-blue-600 px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base font-bold text-white transition-colors hover:bg-blue-700">
              <LogIn className="h-3 w-3 sm:h-4 sm:w-4" />
              <span className="truncate max-w-[100px] sm:max-w-none">
                {session ? `Sign Out` : "Login"}
              </span>
            </button>
          </Link>
        </div>
      </header>

      {session ? (
          <div className="container mx-auto px-4 py-20 relative z-20 flex items-center justify-center min-h-screen">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">Welcome to your HireStack dashboard, {session.user.name}!</h2>
              <p className="text-xl">Here you can manage your job search, view applications, and more.</p>
            </div>
          </div>
      ) : (
        <>
          {/* Hero Section with Scrolling Logo Bar */}
          <section
            id="home"
            className="container relative z-20 mx-auto flex flex-col items-center justify-between px-4 h-screen text-center"
          >
            {/* Main Hero Content */}
            <div className="flex flex-col items-center justify-center flex-1">
              <h2 className="mb-6 text-5xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                Find Your Dream Developer Job in Real-Time
              </h2>
              <p className="mb-8 max-w-2xl text-xl bg-gradient-to-r from-blue-200 to-green-200 bg-clip-text text-transparent">
                HireStack aggregates job postings from top sites, providing real-time
                updates, comprehensive stats, and interview prep resources.
              </p>
              <button className="hover:shadow-neon flex items-center space-x-2 rounded-full bg-blue-600 px-6 py-3 text-lg font-bold text-white transition-colors hover:bg-blue-700">
                <Search className="h-5 w-5" />
                <span>Start Your Job Search</span>
              </button>
            </div>

            {/* Scrolling Logo Bar */}
            <div className="mb-4 overflow-hidden w-full">
              <div className="animate-scroll inline-flex">
                {[...techCompanies, ...techCompanies, ...techCompanies].map((company, index) => (
                  <div key={index} className="mx-10 flex items-center space-x-2">
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
                ))}
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
                  { icon: Zap, color: "text-yellow-400", title: "Real-time Updates", description: "Get instant notifications for new job postings that match your skills and preferences.", span: "md:col-span-1" },
                  { icon: TrendingUp, color: "text-green-400", title: "AI-Powered Matching", description: "Our advanced algorithms ensure you only see the most relevant opportunities, saving you time and increasing your chances of landing the perfect job.", span: "md:col-span-2" },
                  { icon: BookOpen, color: "text-blue-400", title: "Interview Prep Resources", description: "Access a wealth of resources including practice questions, mock interviews, and tips from industry experts to help you ace your interviews.", span: "md:col-span-2" },
                  { icon: Award, color: "text-purple-400", title: "Career Growth Tools", description: "Utilize our career growth tools to track your progress, set goals, and advance your developer career.", span: "md:col-span-1" },
                  { icon: Code, color: "text-pink-400", title: "Skill Assessments", description: "Showcase your coding skills with our built-in assessments and stand out to potential employers.", span: "md:col-span-1" },
                  { icon: Globe, color: "text-indigo-400", title: "Global Opportunities", description: "Access job opportunities from around the world, including remote positions and international roles.", span: "md:col-span-1" },
                ].map((item, index) => (
                  <div key={index} className={`group relative overflow-hidden transform rounded-lg bg-gray-800 bg-opacity-50 p-6 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${item.span}`}>
                    <div className="relative z-10">
                      <item.icon className={`mb-4 h-12 w-12 ${item.color}`} />
                      <h4 className="mb-2 text-xl font-semibold">
                        {item.title}
                      </h4>
                      <p>
                        {item.description}
                      </p>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-green-400 opacity-0 transition-opacity duration-300 group-hover:opacity-20"></div>
                  </div>
                ))}
              </div>
            </div>
          </section>

     {/* Real-time Job Listings */}
          <section id="jobs" className="container mx-auto px-4 py-20 relative z-10">
            <h3 className="text-3xl font-bold mb-10 text-center animate-fade-in-up">
              Latest Job Opportunities
            </h3>
            <div ref={cardsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {jobData.map((job) => (
                <div key={job.id} className="group relative overflow-hidden transform rounded-lg bg-gray-800 bg-opacity-50 p-6 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                  <div className="relative z-10 card-content space-y-4">
                    <h4 className="text-xl font-semibold text-blue-400">{job.title}</h4>
                    <p className="text-gray-300">{job.company}</p>
                    <div className="flex items-center space-x-2">
                      <DollarSign className="w-5 h-5 text-green-400" />
                      <span>{job.salary}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-5 h-5 text-yellow-400" />
                      <span>{job.employees} previous employees on LinkedIn</span>
                    </div>
                    <div>
                      <h5 className="font-semibold mb-2">Required Credentials:</h5>
                      <ul className="list-disc list-inside">
                        {job.credentials.map((cred, index) => (
                          <li key={index}>{cred}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-semibold mb-2">Recommended LeetCode Questions:</h5>
                      <ul className="list-disc list-inside">
                        {job.leetcodeQuestions.map((question, index) => (
                          <li key={index}>{question}</li>
                        ))}
                      </ul>
                    </div>
                    <button className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition-colors text-sm">
                      Apply Now
                    </button>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-green-400 opacity-0 transition-opacity duration-300 group-hover:opacity-20"></div>
                </div>
              ))}
            </div>
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
              <button className="hover:shadow-neon rounded-full bg-blue-600 px-8 py-3 text-lg font-bold text-white transition-colors hover:bg-blue-700">
                Sign Up Now
              </button>
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
                        onClick={() => scrollToSection('home')}
                        className="text-gray-400 transition-colors hover:text-white"
                      >
                        Home
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => scrollToSection('features')}
                        className="text-gray-400 transition-colors hover:text-white"
                      >
                        Features
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => scrollToSection('jobs')}
                        className="text-gray-400 transition-colors hover:text-white"
                      >
                        Jobs
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => scrollToSection('contact')}
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
