'use client';

import React from 'react';
import { Home } from 'lucide-react';
import JobCard from '../../_components/JobCard';

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  city: string;
  province: string;
  date_posted: string;
  description: string;
  job_url: string;
  site: string;
}

const mockJobs: Job[] = [
  {
    id: "MJBPorgaP1FFanvZfIuZOQ",
    title: "Software Developer",
    company: "Scotiabank",
    location: "Toronto, ON, Canada",
    city: "Toronto",
    province: "ON",
    date_posted: "2024-10-10",
    description: "As a Software Developer, you will be responsible for designing, developing, and maintaining software applications. You will work collaboratively with cross-functional teams to deliver high-quality solutions in the banking technology domain and your ...",
    job_url: "https://www.ziprecruiter.com/jobs/scotiabank-software-developer-MJBPorgaP1FFanvZfIuZOQ",
    site: "zip_recruiter"
  },
  {
    id: "NKLMnopqR2GGbowYgJvYPR",
    title: "Frontend Developer",
    company: "TechCorp",
    location: "Toronto, ON, Canada",
    city: "Toronto",
    province: "ON",
    date_posted: "2024-10-11",
    description: "TechCorp is seeking a talented Frontend Developer to join our innovative team. You'll be responsible for creating responsive and user-friendly web applications using modern frameworks and technologies...",
    job_url: "https://www.example.com/jobs/techcorp-frontend-developer",
    site: "example_job_board"
  },
  {
    id: "STUVwxyzA3HHcpxZhKwZQS",
    title: "Full Stack Developer",
    company: "InnovateTech",
    location: "Toronto, ON, Canada",
    city: "Toronto",
    province: "ON",
    date_posted: "2024-10-12",
    description: "Join InnovateTech as a Full Stack Developer and work on cutting-edge projects. You'll be involved in all aspects of software development, from database design to frontend implementation...",
    job_url: "https://www.example.com/jobs/innovatetech-full-stack-developer",
    site: "example_job_board"
  }
];

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-gray-800 bg-opacity-50 rounded-lg shadow-lg p-6 backdrop-blur-lg">
        <div className="flex items-center space-x-4 mb-6">
          <Home className="h-8 w-8 text-blue-400" />
          <h1 className="text-3xl font-bold text-white">Home</h1>
        </div>
        {/* <p className="text-gray-300 mb-8">
          Welcome to your personalized dashboard. Here you can view your job search progress, recent activities, and
          quick links to important features.
        </p> */}

        {/* <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-700 bg-opacity-50 rounded-lg p-4">
            <h2 className="text-xl font-semibold text-white mb-2">Recent Activity</h2>
            <p className="text-gray-300">Your recent job search activities will appear here.</p>
          </div>
          <div className="bg-gray-700 bg-opacity-50 rounded-lg p-4">
            <h2 className="text-xl font-semibold text-white mb-2">Job Recommendations</h2>
            <p className="text-gray-300">Personalized job recommendations based on your profile.</p>
          </div>
        </div> */}

        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-white mb-6">Featured Job Listings</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockJobs.map((job) => (
              <JobCard key={job.id} {...job} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
