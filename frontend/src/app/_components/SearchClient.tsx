"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";

interface SearchClientProps {
  onSearch: (keyword: string) => void;
}

export default function SearchClient({ onSearch }: SearchClientProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  return (
    <div className="rounded-lg bg-gray-800 bg-opacity-50 p-6 shadow-lg backdrop-blur-lg">
      <div className="mb-6 flex items-center space-x-4">
        <Search className="h-8 w-8 text-blue-400" />
        <h1 className="text-3xl font-bold text-white">Job Search</h1>
      </div>
      <p className="mb-6 text-gray-300">
        Use our search to find your perfect job match.
      </p>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Enter job title, skills, or company"
          className="w-full rounded-lg bg-gray-700 px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <button
        className="w-full rounded-lg bg-blue-600 px-4 py-2 font-bold text-white transition-colors hover:bg-blue-700"
        onClick={handleSearch}
      >
        Search Jobs
      </button>

      <div className="mt-8">
        <h2 className="mb-4 text-xl font-semibold text-white"></h2>
      </div>
    </div>
  );
}
