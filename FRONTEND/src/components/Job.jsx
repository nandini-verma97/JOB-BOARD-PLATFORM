import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Avatar, AvatarImage } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'

const Job = ({ job }) => {
  const navigate = useNavigate();

  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference / (1000 * 24 * 60 * 60));
  };

  return (
    <div
      className="p-6 rounded-2xl shadow-xl border border-white/20 bg-white/20 backdrop-blur-md
                 transition-all duration-300 hover:scale-[1.03] hover:-translate-y-1 hover:shadow-2xl
                 hover:bg-white/30 cursor-pointer animate-fadeInSlow"
    >
      <div className="flex items-center justify-between">
        <p className="text-sm text-black drop-shadow">
          {daysAgoFunction(job?.createdAt) === 0
            ? 'Today'
            : `${daysAgoFunction(job?.createdAt)} days ago`}
        </p>
        <Button
          variant="outline"
          className="rounded-full bg-black backdrop-blur-lg border-white/40 hover:bg-white/50"
          size="icon"
        >
          <Bookmark className="text-white" />
        </Button>
      </div>

      <div className="flex items-center gap-3 my-4">
        <Button
          className="p-6 rounded-full bg-black backdrop-blur-lg border-white/40 hover:bg-white/60"
          variant="outline"
          size="icon"
        >
          <Avatar className="h-10 w-10">
            <AvatarImage src={job?.company?.logo} />
          </Avatar>
        </Button>
        <div>
          <h1 className="font-semibold text-lg text-black drop-shadow-md">{job?.company?.name}</h1>
          <p className="text-sm text-black">India</p>
        </div>
      </div>

      <div>
        <h1 className="font-bold text-xl my-2 text-yellow-500 drop-shadow-md">{job?.title}</h1>
        <p className="text-sm text-black line-clamp-3">{job?.description}</p>
      </div>

      <div className="flex items-center gap-2 mt-4 flex-wrap">
        <Badge className="text-black font-bold bg-white/60 backdrop-blur-xl border-none">
          {job?.position} Positions
        </Badge>
        <Badge className="text-black font-bold bg-white/60 backdrop-blur-xl border-none">
          {job?.jobType}
        </Badge>
        <Badge className="text-black font-bold bg-white/60 backdrop-blur-xl border-none">
          {job?.salary} LPA
        </Badge>
      </div>

      <div className="flex items-center gap-4 mt-5">
        <Button
          onClick={() => navigate(`/description/${job?._id}`)}
          variant="outline"
          className="border-white/60 bg-black text-white hover:bg-white/40 hover:text-black"
        >
          Details
        </Button>
        <Button className="bg-yellow-500 hover:bg-[#5f0793] transition-all duration-300">
          Save For Later
        </Button>
      </div>
    </div>
  );
};

export default Job;