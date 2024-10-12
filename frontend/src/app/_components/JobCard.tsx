// components/JobCard.tsx
import React from 'react';
import { formatDistanceToNow } from 'date-fns';

interface JobCardProps {
  id: string;
  job_title: string;
  company: string;
  city: string;
  province: string;
  salary?: string | number;
  job_type: string;
  posted_date: string;
  remote_work: boolean | string;
}

const JobCard: React.FC<JobCardProps> = ({
  id,
  job_title,
  company,
  city,
  province,
  salary,
  job_type,
  posted_date,
  remote_work,
}) => {
  return (
    <div className="bg-transparent rounded-lg p-6 mb-4 transition-all duration-300 hover:shadow-lg border border-gray-200">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-800 mb-2">{job_title}</h2>
          <p className="text-gray-600">{company}</p>
        </div>
        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
          {remote_work === true ? 'Remote' : remote_work === false ? 'On-site' : remote_work}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2 mb-4">
        <p className="text-gray-600">{`${city}, ${province}`}</p>
        {salary && <p className="text-gray-600">{`Salary: ${salary}`}</p>}
        <p className="text-gray-600">{job_type}</p>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-sm text-gray-500">
          Posted {formatDistanceToNow(new Date(posted_date))} ago
        </p>
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300">
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default JobCard;
