'use client';

import React from 'react';

interface SearchFiltersProps {
  onFilterChange: (filters: Partial<FilterOptions>) => void;
}

export interface FilterOptions {
  jobType: string;
  remoteWork: string;
  experienceLevel: string;
  salary: string;
  postedDate: string;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({ onFilterChange }) => {
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    onFilterChange({ [name]: value });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
      <select name="jobType" onChange={handleFilterChange} className="bg-gray-700 text-white rounded-lg px-3 py-2">
        <option value="">Job Type</option>
        <option value="full-time">Full-time</option>
        <option value="part-time">Part-time</option>
        <option value="contract">Contract</option>
      </select>
      
      <select name="remoteWork" onChange={handleFilterChange} className="bg-gray-700 text-white rounded-lg px-3 py-2">
        <option value="">Remote Work</option>
        <option value="remote">Remote</option>
        <option value="on-site">On-site</option>
        <option value="hybrid">Hybrid</option>
      </select>
      
      <select name="experienceLevel" onChange={handleFilterChange} className="bg-gray-700 text-white rounded-lg px-3 py-2">
        <option value="">Experience Level</option>
        <option value="entry">Entry</option>
        <option value="mid">Mid-level</option>
        <option value="senior">Senior</option>
      </select>
      
      <select name="salary" onChange={handleFilterChange} className="bg-gray-700 text-white rounded-lg px-3 py-2">
        <option value="">Salary Range</option>
        <option value="0-50000">$0 - $50,000</option>
        <option value="50000-100000">$50,000 - $100,000</option>
        <option value="100000+">$100,000+</option>
      </select>
      
      <select name="postedDate" onChange={handleFilterChange} className="bg-gray-700 text-white rounded-lg px-3 py-2">
        <option value="">Posted Date</option>
        <option value="1">Last 24 hours</option>
        <option value="7">Last 7 days</option>
        <option value="30">Last 30 days</option>
      </select>
    </div>
  );
};

export default SearchFilters;
