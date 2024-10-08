import React from 'react';
import { Home } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-gray-800 bg-opacity-50 rounded-lg shadow-lg p-6 backdrop-blur-lg">
        <div className="flex items-center space-x-4 mb-6">
          <Home className="h-8 w-8 text-blue-400" />
          <h1 className="text-3xl font-bold text-white">Dashboard Home</h1>
        </div>
        <p className="text-gray-300">Welcome to your personalized dashboard. Here you can view your job search progress, recent activities, and quick links to important features.</p>
        
        {/* Add more dashboard components here */}
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
      </div>
    </div>
  );
}
