import React from 'react';
import { Settings } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-gray-800 bg-opacity-50 rounded-lg shadow-lg p-6 backdrop-blur-lg">
        <div className="flex items-center space-x-4 mb-6">
          <Settings className="h-8 w-8 text-blue-400" />
          <h1 className="text-3xl font-bold text-white">Account Settings</h1>
        </div>
        <p className="text-gray-300 mb-6">Manage your account preferences and personal information.</p>
        
        {/* Add settings components here */}
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold text-white mb-2">Profile Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full px-4 py-2 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white mb-2">Preferences</h2>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="emailNotifications" className="form-checkbox h-5 w-5 text-blue-400" />
              <label htmlFor="emailNotifications" className="text-white">Receive email notifications</label>
            </div>
          </div>
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
