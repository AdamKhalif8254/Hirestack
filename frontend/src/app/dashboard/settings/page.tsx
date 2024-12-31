import React from "react";
import { Settings } from "lucide-react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "~/server/auth";
import { db } from "~/server/db";

export default async function SettingsPage() {
  const session = await getServerSession(authOptions);

  const user = session?.user?.email
    ? await db.user.findUnique({
        where: { email: session.user.email },
        select: { name: true, email: true },
      })
    : null;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="rounded-lg bg-gray-800 bg-opacity-50 p-6 shadow-lg backdrop-blur-lg">
        <div className="mb-6 flex items-center space-x-4">
          <Settings className="h-8 w-8 text-blue-400" />
          <h1 className="text-3xl font-bold text-white">Account Information</h1>
        </div>
        <p className="mb-6 text-gray-300">
          Your account details and personal information.
        </p>

        <div className="space-y-6">
          <div>
            <h2 className="mb-2 text-xl font-semibold text-white">
              Profile Information
            </h2>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="rounded-lg bg-gray-700 px-4 py-2">
                <p className="text-sm text-gray-400">Name</p>
                <p className="text-white">{user?.name ?? "Not set"}</p>
              </div>
              <div className="rounded-lg bg-gray-700 px-4 py-2">
                <p className="text-sm text-gray-400">Email</p>
                <p className="text-white">{user?.email ?? "Not set"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
