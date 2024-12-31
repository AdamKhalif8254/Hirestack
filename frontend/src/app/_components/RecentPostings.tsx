"use client";
import React, { useEffect, useState } from "react";
import JobCard from "./JobCard";

interface JobListing {
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

export default function RecentPostings() {
  const [jobs, setJobs] = useState<JobListing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await fetch("/api/jobs");
        if (!response.ok) {
          throw new Error("Failed to fetch jobs");
        }
        const data = (await response.json()) as JobListing[];
        setJobs(data.slice(0, 6)); // Only take first 6 jobs
      } catch (error) {
        console.error("Error fetching jobs:", error);
      } finally {
        setLoading(false);
      }
    };

    void fetchJobs();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {[...Array<number>(6)].map((_, i) => (
            <div
              key={i}
              className="h-[400px] animate-pulse rounded-lg bg-gray-700"
            ></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <h3 className="animate-fade-in-up mb-10 text-center text-3xl font-bold">
        Latest Job Opportunities
      </h3>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {jobs.map((job) => (
          <JobCard key={job.id} {...job} />
        ))}
      </div>
    </div>
  );
}
