'use client';

import React, { useEffect, useState } from 'react';
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

export default function HomePage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      console.log('Fetching jobs...');
      try {
        const url = 'https://yrzq6ukjo8.execute-api.ca-central-1.amazonaws.com/dev?keyword=developer&province=ON&city=Toronto';
        console.log('Fetching from URL:', url);

        const response = await fetch(url);
        console.log('Response status:', response.status);

        if (!response.ok) {
          throw new Error(`Failed to fetch jobs: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Received data:', data);

        // Convert object of objects to array
        const jobsArray = Object.values(data) as Job[];
        console.log('Parsed jobs array:', jobsArray);

        setJobs(jobsArray);
      } catch (err) {
        console.error('Error fetching jobs:', err);
        setError(`Failed to fetch jobs. Error: ${err instanceof Error ? err.message : String(err)}`);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJobs();
  }, []);

  console.log('Current state - jobs:', jobs, 'isLoading:', isLoading, 'error:', error);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-gray-800 bg-opacity-50 rounded-lg shadow-lg p-6 backdrop-blur-lg">
        <div className="flex items-center space-x-4 mb-6">
          <Home className="h-8 w-8 text-blue-400" />
          <h1 className="text-3xl font-bold text-white">Dashboard Home</h1>
        </div>
        <p className="text-gray-300 mb-8">
          Welcome to your personalized dashboard. Here you can view your job search progress, recent activities, and
          quick links to important features.
        </p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-700 bg-opacity-50 rounded-lg p-4">
            <h2 className="text-xl font-semibold text-white mb-2">Recent Activity</h2>
            <p className="text-gray-300">Your recent job search activities will appear here.</p>
          </div>
          <div className="bg-gray-700 bg-opacity-50 rounded-lg p-4">
            <h2 className="text-xl font-semibold text-white mb-2">Job Recommendations</h2>
            <p className="text-gray-300">Personalized job recommendations based on your profile.</p>
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-white mb-6">Featured Job Listings</h2>
          {isLoading ? (
            <p className="text-white">Loading jobs...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobs.length > 0 ? (
                jobs.map((job) => <JobCard key={job.id} {...job} />)
              ) : (
                <p className="text-white">No jobs found.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
