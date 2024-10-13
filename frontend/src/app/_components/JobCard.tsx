import React from "react";
import Image from "next/image";
// Custom Card Component
import { DollarSign } from "lucide-react";
import { Users } from "lucide-react";

interface Job {
  id: number; // Add the id field
  title?: string; // Refers to the job position or role
  company: string;
  salary: number;
  imageUrl: string;
  requiredCredentials: string[]; // List of required credentials/qualifications
  leetcodeProblems: string[]; // List of relevant coding challenges
}

interface JobCardProps {
  jobData: Job[];
}

const JobCard = ({ jobData }: JobCardProps) => {
  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {jobData.map((job) => (
          <div
            key={job.id}
            className="bg-opacity-150 group relative w-full max-w-xs transform overflow-hidden rounded-lg bg-gray-800 p-6 shadow-lg transition-all duration-300"
          >
            <div>
              <Image
                src={job.imageUrl}
                alt={`${job.company} Logo`}
                width={80}
                height={80}
                className=""
              />
            </div>
            <div className="card-hover-area group-hover: transition-transform">
              <div className="card-content relative z-10 space-y-4">
                <h4 className="text-xl font-semibold text-blue-400">
                  {job.title}
                </h4>
                <p className="text-gray-300">{job.company}</p>
                <div className="flex items-center">
                  <DollarSign className="text-green-400" />
                  <span>{job.salary}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-yellow-400" />
                </div>
                <button className="mt-4 rounded-full bg-blue-600 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-blue-700">
                  Apply Now
                </button>
                <div>
                  <h5 className="font-semibold">Required Credentials:</h5>
                  <ul className="list-inside list-disc">
                    {job.requiredCredentials.map((cred, index) => (
                      <li key={index}>{cred}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h5 className="mb-2 font-semibold">
                    Recommended LeetCode Questions:
                  </h5>
                  <ul className="list-inside list-disc">
                    {job.leetcodeProblems.map((question, index) => (
                      <li key={index}>{question}</li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-green-400 opacity-0 transition-opacity duration-300 group-hover:opacity-20"></div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default JobCard;
