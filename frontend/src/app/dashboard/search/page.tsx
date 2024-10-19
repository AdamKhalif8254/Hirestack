import React from 'react';
import SearchClient from '../../_components/SearchClient';
import JobCard from '../../_components/JobCard';



function getJobs() {
  // Fetch jobs from your API or database
  // This is just a placeholder
  return [
    {
      id: '1',
      job_title: 'Software Engineer',
      company: 'Tech Co',
      city: 'Toronto',
      province: 'ON',
      salary: '100,000 - 130,000 CAD',
      job_type: 'Full-time',
      posted_date: '2023-05-01T00:00:00Z',
      remote_work: true,
    },
    // ... more jobs
  ];
}

export default function SearchPage() {
    const jobs = getJobs();

  return (
    <div className="container mx-auto px-4 py-8">
      <SearchClient />
      <>
            {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {jobs.map((job) => (
          <JobCard key={job.id} {...job} />
        ))}
      </div> */}

      </>
      
    </div>
  );
}
