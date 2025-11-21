import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/description/${job._id}`)}
      className="relative group p-6 rounded-2xl shadow-2xl bg-white/10 border border-white/20 backdrop-blur-md cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)] overflow-hidden"
    >
      {/* Soft glow on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"></div>

      <div>
        <h1 className="font-semibold text-xl text-white drop-shadow-md">{job?.company?.name}</h1>
        <p className="text-sm text-gray-200/80">India</p>
      </div>

      <div className="mt-3">
        <h1 className="font-bold text-xl text-[#FFD700] drop-shadow-md">{job?.title}</h1>
        <p className="text-sm text-gray-100/90 line-clamp-2">{job?.description}</p>
      </div>

      <div className="flex flex-wrap items-center gap-2 mt-5">
        <Badge className="text-black-200 font-bold bg-white/10 border border-blue-300/40 backdrop-blur-sm group-hover:bg-blue-500/20 transition-all duration-300">{job?.position} Positions</Badge>
        <Badge className="text-black-200  font-bold bg-white/10 border border-red-400/40 backdrop-blur-sm group-hover:bg-red-500/20 transition-all duration-300">{job?.jobType}</Badge>
        <Badge className="text-black-200  font-bold bg-white/10 border border-purple-300/40 backdrop-blur-sm group-hover:bg-purple-500/20 transition-all duration-300">{job?.salary} LPA</Badge>
      </div>
    </div>
  );
};

export default LatestJobCards;
