import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Edit2, Eye, MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const AdminJobsTable = () => {
  const { allAdminJobs, searchJobByText } = useSelector((store) => store.job);

  const [filterJobs, setFilterJobs] = useState(allAdminJobs);
  const navigate = useNavigate();

  useEffect(() => {
    const filteredJobs = allAdminJobs.filter((job) => {
      if (!searchJobByText) return true;
      return (
        job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
        job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase())
      );
    });
    setFilterJobs(filteredJobs);
  }, [allAdminJobs, searchJobByText]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
      <Table>
        <TableCaption className="text-white font-semibold drop-shadow-[0_1.5px_6px_rgba(0,0,0,0.35)] tracking-wide">
          A list of your recently posted jobs
        </TableCaption>

        <TableHeader>
          <TableRow className="text-gray-800 drop-shadow-sm border-white/20">
            <TableHead className="text-gray-800 drop-shadow-sm">Company Name</TableHead>
            <TableHead className="text-gray-800 drop-shadow-sm">Role</TableHead>
            <TableHead className="text-gray-800 drop-shadow-sm">Date</TableHead>
            <TableHead className="text-right text-gray-800 drop-shadow-sm">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {filterJobs?.map((job, index) => (
            <motion.tr
              key={job._id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="hover:bg-white/10 transition-all duration-300 cursor-pointer backdrop-blur-sm border-b border-white/10"
            >
              <TableCell className="text-gray-800 drop-shadow-sm/90 hover:text-gray-800 drop-shadow-sm transition-all">
                {job?.company?.name}
              </TableCell>
              <TableCell className="text-gray-800 drop-shadow-sm/90 hover:text-gray-800 drop-shadow-sm transition-all">
                {job?.title}
              </TableCell>
              <TableCell className="text-gray-800 drop-shadow-sm/90 hover:text-gray-800 drop-shadow-sm transition-all">
                {job?.createdAt.split('T')[0]}
              </TableCell>

              <TableCell className="text-right text-gray-800 drop-shadow-sm">
                <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal className="hover:text-gray-200 transition-all" />
                  </PopoverTrigger>

                  <PopoverContent className="w-32 bg-white/10 text-gray-800 drop-shadow-sm backdrop-blur-lg border border-white/20 shadow-xl rounded-xl">
                    <div
                      onClick={() => navigate(`/admin/companies/${job._id}`)}
                      className="flex items-center gap-2 cursor-pointer hover:text-yellow-300 transition-all"
                    >
                      <Edit2 className="w-4" />
                      <span>Edit</span>
                    </div>

                    <div
                      onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)}
                      className="flex items-center gap-2 cursor-pointer mt-3 hover:text-yellow-300 transition-all"
                    >
                      <Eye className="w-4" />
                      <span>Applicants</span>
                    </div>
                  </PopoverContent>
                </Popover>
              </TableCell>
            </motion.tr>
          ))}
        </TableBody>
      </Table>
    </motion.div>
  );
};

export default AdminJobsTable;
