"use client";

import React, { useEffect, useState } from "react";
import { Home } from "lucide-react";
import JobCard from "../../_components/JobCard";
import { marked } from "marked";

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

function JobCardSkeleton() {
  return (
    <div className="rounded-lg bg-gray-800 p-6 shadow-lg">
      <div className="animate-pulse">
        <div className="h-4 w-3/4 rounded bg-gray-700"></div>
        <div className="mt-4 h-3 w-1/2 rounded bg-gray-700"></div>
        <div className="mt-2 h-3 w-1/3 rounded bg-gray-700"></div>
        <div className="mt-4 space-y-2">
          <div className="h-2 rounded bg-gray-700"></div>
          <div className="h-2 rounded bg-gray-700"></div>
          <div className="h-2 w-4/5 rounded bg-gray-700"></div>
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("/api/jobs?keyword=developer");
        if (!response.ok) {
          throw new Error("Failed to fetch jobs");
        }
        const data = (await response.json()) as Job[];
        const processedJobs = await Promise.all(
          data.map(async (job) => ({
            ...job,
            description:
              (await marked(job.description)).substring(0, 300) + "...",
          })),
        );
        setJobs(processedJobs);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch jobs");
      } finally {
        setLoading(false);
      }
    };

    void fetchJobs();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="rounded-lg bg-gray-800 bg-opacity-50 p-6 shadow-lg backdrop-blur-lg">
        <div className="mb-6 flex items-center space-x-4">
          <Home className="h-8 w-8 text-blue-400" />
          <h1 className="text-3xl font-bold text-white">Home</h1>
        </div>

        <div className="mt-12">
          <h2 className="mb-6 text-2xl font-semibold text-white">
            Featured Job Listings
          </h2>
          {loading ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[...Array<null>(6)].map((_, index) => (
                <JobCardSkeleton key={index} />
              ))}
            </div>
          ) : error ? (
            <div className="text-center text-red-400">{error}</div>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {jobs.map((job) => (
                <JobCard key={job.id} {...job} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
