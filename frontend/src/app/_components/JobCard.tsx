// components/JobCard.tsx
import React from "react";
import { formatDistanceToNow } from "date-fns";
import { MapPin, Building, CalendarDays, ExternalLink } from "lucide-react";

interface JobCardProps {
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

const JobCard: React.FC<JobCardProps> = ({
  title,
  company,
  location,
  city,
  province,
  date_posted,
  description,
  job_url,
  site,
}) => {
  return (
    <div className="group relative flex min-h-[400px] transform flex-col overflow-hidden rounded-lg bg-gray-800 bg-opacity-50 p-6 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
      <div className="card-content relative z-10 flex-grow space-y-4">
        <h4 className="text-xl font-semibold text-blue-400">{title}</h4>
        <p className="text-gray-300">{company}</p>
        <div className="flex items-center space-x-2">
          <MapPin className="h-5 w-5 text-yellow-400" />
          <span className="text-gray-300">
            {location || `${city}, ${province}`}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <Building className="h-5 w-5 text-purple-400" />
          <span className="text-gray-300">Posted on {site}</span>
        </div>
        <div className="flex items-center space-x-2">
          <CalendarDays className="h-5 w-5 text-green-400" />
          <span className="text-gray-300">
            Posted {formatDistanceToNow(new Date(date_posted))} ago
          </span>
        </div>
        <div>
          <h5 className="mb-2 font-semibold text-gray-300">Job Description:</h5>
          <div
            className="description"
            dangerouslySetInnerHTML={{ __html: description }}
          />
        </div>
      </div>
      <div className="relative z-10 mt-6">
        <a
          href={job_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-full items-center justify-center rounded-full bg-blue-600 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-blue-700"
        >
          Apply Now
          <ExternalLink className="ml-2 h-4 w-4" />
        </a>
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-green-400 opacity-0 transition-opacity duration-300 group-hover:opacity-20"></div>
    </div>
  );
};

export default JobCard;
