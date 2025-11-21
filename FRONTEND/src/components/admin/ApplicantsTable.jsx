import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { motion } from 'framer-motion';

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
    const { applicants } = useSelector(store => store.application);

    const statusHandler = async (status, id) => {
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status });
            if (res.data.success) {
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong");
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <Table>
                <TableCaption>A list of your recently applied users</TableCaption>
                <TableHeader>
                    <TableRow className="hover:bg-white/20 transition duration-300">
                        <TableHead className="text-gray-800">Full Name</TableHead>
                        <TableHead className="text-gray-800">Email</TableHead>
                        <TableHead className="text-gray-800">Contact</TableHead>
                        <TableHead className="text-gray-800">Resume</TableHead>
                        <TableHead className="text-gray-800">Date</TableHead>
                        <TableHead className="text-right text-gray-800">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {applicants && applicants?.application?.map((item) => (
                        <motion.tr
                            key={item._id}
                            whileHover={{ scale: 1.01, backgroundColor: "rgba(255,255,255,0.4)" }}
                            transition={{ duration: 0.2 }}
                        >
                            <TableCell className="text-gray-900 hover:text-black transition">{item?.applicant?.fullname}</TableCell>
                            <TableCell className="text-gray-900 hover:text-black transition">{item?.applicant?.email}</TableCell>
                            <TableCell className="text-gray-900 hover:text-black transition">{item?.applicant?.phoneNumber}</TableCell>
                            <TableCell>
                                {item.applicant?.profile?.resume ? (
                                    <a
                                        className="text-blue-600 hover:underline cursor-pointer"
                                        href={item?.applicant?.profile?.resume}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {item?.applicant?.profile?.resumeOriginalName}
                                    </a>
                                ) : (
                                    <span className="text-gray-700">NA</span>
                                )}
                            </TableCell>
                            <TableCell className="text-gray-900">{item?.applicant.createdAt.split("T")[0]}</TableCell>
                            <TableCell className="float-right cursor-pointer">
                                <Popover>
                                    <PopoverTrigger>
                                        <MoreHorizontal className="hover:scale-110 transition" />
                                    </PopoverTrigger>
                                    <PopoverContent className="w-32 glass-effect bg-white/70 backdrop-blur-lg shadow-lg">
                                        {shortlistingStatus.map((status, index) => (
                                            <div
                                                onClick={() => statusHandler(status, item?._id)}
                                                key={index}
                                                className='flex w-fit items-center my-2 cursor-pointer hover:text-black transition'
                                            >
                                                <span>{status}</span>
                                            </div>
                                        ))}
                                    </PopoverContent>
                                </Popover>
                            </TableCell>
                        </motion.tr>
                    ))}
                </TableBody>
            </Table>
        </motion.div>
    )
}

export default ApplicantsTable;
