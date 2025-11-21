import React, { useEffect, useState } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

// Helper function to convert text to CamelCase
// Helper function to convert text to CamelCase
const toCamelCase = (text) => {
  if (!text) return '';
  if (typeof text !== 'string') return text; // if not string, return as is
  return text
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};


const JobDescription = () => {
  const { singleJob } = useSelector((store) => store.job);
  const { user } = useSelector((store) => store.auth);
  const isIntiallyApplied = singleJob?.application?.some(app => app.applicant === user?._id) || false;
  const [isApplied, setIsApplied] = useState(isIntiallyApplied);

  const params = useParams();
  const jobId = params.id;
  const dispatch = useDispatch();

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });
      if (res.data.success) {
        setIsApplied(true);
        const updatedSingleJob = { ...singleJob, application: [...(singleJob.application || []), { applicant: user?._id }] };
        dispatch(setSingleJob(updatedSingleJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || 'Something went wrong');
    }
  };

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(res.data.job.application.some(app => app.applicant === user?._id) || false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat flex items-center justify-center"
      style={{
        backgroundImage: 'url(https://images.unsplash.com/photo-1521737604893-d14cc237f11d)',
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="bg-white/20 backdrop-blur-md rounded-2xl p-8 max-w-4xl w-full shadow-2xl"
      >
        <div className='flex items-center justify-between flex-wrap'>
          <div>
            <motion.h1
              whileHover={{ scale: 1.05, color: '#4F46E5' }}
              className='font-bold text-2xl text-yellow-500 drop-shadow-md'
            >{singleJob?.title && toCamelCase(singleJob?.title)}</motion.h1>
            <div className='flex items-center gap-2 mt-4 flex-wrap'>
              <Badge className='text-black font-bold bg-white/50 backdrop-blur-lg border-none'>{singleJob?.position && toCamelCase(singleJob?.position)} Positions</Badge>
              <Badge className='text-black font-bold bg-white/50 backdrop-blur-lg border-none'>{singleJob?.jobType && toCamelCase(singleJob?.jobType)}</Badge>
              <Badge className='text-black font-bold bg-white/50 backdrop-blur-lg border-none'>{singleJob?.salary} LPA</Badge>
            </div>
          </div>
          <Button
            onClick={isApplied ? null : applyJobHandler}
            disabled={isApplied}
            className={`rounded-lg mt-4 ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#7209b7] hover:bg-[#5f32ad] transition-all duration-300'}`}
          >
            {isApplied ? 'Already Applied' : 'Apply Now'}
          </Button>
        </div>

        <motion.h1
          whileHover={{ scale: 1.02, color: '#4F46E5' }}
          className='border-b-2 border-b-gray-300 font-medium py-4 mt-8 text-black drop-shadow-md'
        >Job Description</motion.h1>

        <div className='my-4 space-y-2'>
          {singleJob && Object.entries({
            Role: singleJob?.title,
            Location: singleJob?.location,
            Description: singleJob?.description,
            Experience: `${singleJob?.experienceLevel} yrs`,
            Salary: `${singleJob?.salary} LPA`,
            'Total Applicants': singleJob?.application?.length,
            'Posted Date': singleJob?.createdAt?.split('T')[0]
          }).map(([key, value]) => (
            <motion.h1
              key={key}
              whileHover={{ scale: 1.02, color: '#FACC15' }}
              className='font-bold my-1 text-black drop-shadow-md'
            >
              {key}: <span className='pl-4 font-normal text-black'>{toCamelCase(value)}</span>
            </motion.h1>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default JobDescription;