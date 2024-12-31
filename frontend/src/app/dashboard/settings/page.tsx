import React from "react";
import { Settings } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="rounded-lg bg-gray-800 bg-opacity-50 p-6 shadow-lg backdrop-blur-lg">
        <div className="mb-6 flex items-center space-x-4">
          <Settings className="h-8 w-8 text-blue-400" />
          <h1 className="text-3xl font-bold text-white">Account Settings</h1>
        </div>
        <p className="mb-6 text-gray-300">
          Manage your account preferences and personal information.
        </p>

        {/* Add settings components here */}
        <div className="space-y-6">
          <div>
            <h2 className="mb-2 text-xl font-semibold text-white">
              Profile Information
            </h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full rounded-lg bg-gray-700 px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <input
                type="email"
                placeholder="Email Address"
                className="w-full rounded-lg bg-gray-700 px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>
          <div>
            <h2 className="mb-2 text-xl font-semibold text-white">
              Preferences
            </h2>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="emailNotifications"
                className="form-checkbox h-5 w-5 text-blue-400"
              />
              <label htmlFor="emailNotifications" className="text-white">
                Receive email notifications
              </label>
            </div>
          </div>
          <button className="w-full rounded-lg bg-blue-600 px-4 py-2 font-bold text-white transition-colors hover:bg-blue-700">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
