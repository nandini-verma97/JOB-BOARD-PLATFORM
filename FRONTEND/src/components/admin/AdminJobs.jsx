import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import AdminJobsTable from './AdminJobsTable';
import useGetAllAdminJobs from '@/hooks/useGetAllAdminJobs';
import { setSearchJobByText } from '@/redux/jobSlice';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

const AdminJobs = () => {
  useGetAllAdminJobs();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchJobByText(input));
  }, [input]);

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          'url(https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg)',
      }}
    >
      <div className="backdrop-blur-sm min-h-screen">
        <Navbar />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto py-12"
        >
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="pt-10 text-4xl font-bold text-black drop-shadow-lg mb-6 tracking-wide hover:text-yellow-300 transition-all duration-300 cursor-default"
          >
            Recruiter Dashboard
          </motion.h1>

          <div className="flex items-center justify-between my-5">
            <motion.div
              whileHover={{ scale: 1.03 }}
              transition={{ type: 'spring', stiffness: 200, damping: 12 }}
              className="relative w-1/2"
            >
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-black" />
              <Input
                className="w-full pl-10 bg-white/20 text-white placeholder:text-black border-black focus:border-white/50 backdrop-blur-md transition-all"
                placeholder="Filter by name, role"
                onChange={(e) => setInput(e.target.value)}
              />
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }}>
              <Button
                className="bg-yellow-200 backdrop-blur-lg text-black hover:bg-white/30 transition-all"
                onClick={() => navigate('/admin/jobs/create')}
              >
                New Job
              </Button>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-xl border border-white/20 hover:shadow-2xl transition-all"
          >
            <AdminJobsTable />
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminJobs;
