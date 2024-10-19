// components/JobCard.tsx
import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { MapPin, Building, CalendarDays, ExternalLink } from 'lucide-react';

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
  id,
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
    <div className="group relative overflow-hidden transform rounded-lg bg-gray-800 bg-opacity-50 p-6 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
      <div className="relative z-10 card-content space-y-4">
        <h4 className="text-xl font-semibold text-blue-400">{title}</h4>
        <p className="text-gray-300">{company}</p>
        <div className="flex items-center space-x-2">
          <MapPin className="w-5 h-5 text-yellow-400" />
          <span className="text-gray-300">{location || `${city}, ${province}`}</span>
        </div>
        <div className="flex items-center space-x-2">
          <Building className="w-5 h-5 text-purple-400" />
          <span className="text-gray-300">Posted on {site}</span>
        </div>
        <div className="flex items-center space-x-2">
          <CalendarDays className="w-5 h-5 text-green-400" />
          <span className="text-gray-300">
            Posted {formatDistanceToNow(new Date(date_posted))} ago
          </span>
        </div>
        <div>
          <h5 className="font-semibold mb-2 text-gray-300">Job Description:</h5>
          <p className="text-gray-400 line-clamp-3">{description}</p>
        </div>
        <a 
          href={job_url} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="mt-4 inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full transition-colors text-sm"
        >
          Apply Now
          <ExternalLink className="ml-2 w-4 h-4" />
        </a>
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-green-400 opacity-0 transition-opacity duration-300 group-hover:opacity-20"></div>
    </div>
  );
};

export default JobCard;
