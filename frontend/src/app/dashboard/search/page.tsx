"use client";

import React, { useState, useEffect } from "react";
import SearchClient from "../../_components/SearchClient";
import JobCard from "../../_components/JobCard";
import { marked } from "marked";
import JobCardSkeleton from "../../_components/JobCardSkeleton";

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

export default function SearchPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchKeyword, setSearchKeyword] = useState("developer");
  const [sortByDate, setSortByDate] = useState(false);
  const [selectedCities, setSelectedCities] = useState<string[]>([]);

  const cities = [
    "Toronto",
    "Ottawa",
    "London",
    "Mississauga",
    "Hamilton",
    "Kitchener",
  ];

  const handleSort = () => {
    setSortByDate(!sortByDate);
  };

  const toggleCity = (city: string) => {
    setSelectedCities((prev) =>
      prev.includes(city) ? prev.filter((c) => c !== city) : [...prev, city],
    );
  };

  const handleSearch = (keyword: string) => {
    setLoading(true);
    setSearchKeyword(keyword);
  };

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const encodedKeyword = encodeURIComponent(searchKeyword);
        const response = await fetch(`/api/jobs?keyword=${encodedKeyword}`);
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
        console.error("Fetch error details:", err);
        setError(err instanceof Error ? err.message : "Failed to fetch jobs");
      } finally {
        setLoading(false);
      }
    };

    void fetchJobs();
  }, [searchKeyword]);

  const filteredAndSortedJobs = React.useMemo(() => {
    let filtered = [...jobs];

    if (selectedCities.length > 0) {
      filtered = filtered.filter((job) => selectedCities.includes(job.city));
    }

    if (sortByDate) {
      filtered.sort(
        (a, b) =>
          new Date(b.date_posted).getTime() - new Date(a.date_posted).getTime(),
      );
    }

    return filtered;
  }, [jobs, selectedCities, sortByDate]);

  return (
    <div className="container mx-auto px-4 py-8">
      <SearchClient onSearch={handleSearch} />

      <div className="mt-4 flex flex-wrap items-center gap-4">
        <button
          onClick={handleSort}
          className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
        >
          {sortByDate ? "Clear Sort" : "Sort by Date"}
        </button>

        <div className="flex flex-wrap gap-2">
          {cities.map((city) => (
            <button
              key={city}
              onClick={() => toggleCity(city)}
              className={`rounded px-3 py-1 text-sm ${
                selectedCities.includes(city)
                  ? "bg-blue-500 text-white"
                  : "bg-gray-700 text-gray-300"
              }`}
            >
              {city}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-12">
        <h2 className="mb-6 text-2xl font-semibold text-white">
          Search Results
        </h2>
        {loading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <JobCardSkeleton key={index} />
            ))}
          </div>
        ) : error ? (
          <div className="text-center text-red-400">{error}</div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredAndSortedJobs.map((job) => (
              <JobCard key={job.id} {...job} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
