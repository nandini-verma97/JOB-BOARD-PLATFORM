import React from 'react';
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';

const LatestJobs = () => {
  const { allJobs } = useSelector(store => store.job);

  return (
    <section className="relative w-full py-20 px-4 sm:px-6 lg:px-8">
      {/* Soft translucent overlay (same tone as HeroSection overlay) */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px]"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <h2 className="text-4xl font-extrabold text-center text-white mb-10 drop-shadow-lg">
          <span className="text-[#FFD700]">Latest & Top </span>Job Openings
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {allJobs.length <= 0 ? (
            <div className="flex flex-col items-center justify-center text-center col-span-full py-12 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/10">
              <img
                src="https://cdn-icons-png.flaticon.com/512/4076/4076505.png"
                alt="No jobs found"
                className="w-32 h-32 mb-4 opacity-90"
              />
              <h3 className="text-xl font-semibold text-slate-100 mb-2">
                No Jobs Available Right Now
              </h3>
              <p className="text-slate-100">
                Check back later or explore other categories.
              </p>
            </div>
          ) : (
            allJobs.slice(0, 6).map((job) => (
              <LatestJobCards key={job._id} job={job} />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default LatestJobs;
