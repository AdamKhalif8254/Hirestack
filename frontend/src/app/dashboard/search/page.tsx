import React from 'react';
import { Search } from 'lucide-react';

export default function SearchPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-gray-800 bg-opacity-50 rounded-lg shadow-lg p-6 backdrop-blur-lg">
        <div className="flex items-center space-x-4 mb-6">
          <Search className="h-8 w-8 text-blue-400" />
          <h1 className="text-3xl font-bold text-white">Job Search</h1>
        </div>
        <p className="text-gray-300 mb-6">Use our advanced search features to find your perfect job match.</p>
        
        {/* Add search components here */}
        <div className="mb-6">
          <input
            type="text"
            placeholder="Enter job title, skills, or company"
            className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">
          Search Jobs
        </button>
        
        {/* Add search results component here */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-white mb-4">Search Results</h2>
          <p className="text-gray-300">Your search results will appear here.</p>
        </div>
      </div>
    </div>
  );
}
