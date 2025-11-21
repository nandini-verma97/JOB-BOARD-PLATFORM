import React, { useEffect, useState } from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '../ui/table'
import { Avatar, AvatarImage } from '../ui/avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const CompaniesTable = () => {
    const { companies, searchCompanyByText } = useSelector(store => store.company);
    const [filterCompany, setFilterCompany] = useState(companies);
    const navigate = useNavigate();

    useEffect(() => {
        const filteredCompany =
            companies.length >= 0 &&
            companies.filter(company => {
                if (!searchCompanyByText) return true;
                return company?.name
                    ?.toLowerCase()
                    .includes(searchCompanyByText.toLowerCase());
            });

        setFilterCompany(filteredCompany);
    }, [companies, searchCompanyByText]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
        >
            <Table>
                <TableCaption className="text-gray-900 font-semibold tracking-wide">
                    A list of your recent registered companies
                </TableCaption>

                <TableHeader>
                    <TableRow className="hover:bg-white/30 transition">
                        <TableHead className="text-gray-800">Logo</TableHead>
                        <TableHead className="text-gray-800">Name</TableHead>
                        <TableHead className="text-gray-800">Date</TableHead>
                        <TableHead className="text-right text-gray-800">Action</TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    {filterCompany?.map(company => (
                        <motion.tr
                            key={company._id}
                            whileHover={{ scale: 1.01, backgroundColor: "rgba(255,255,255,0.45)" }}
                            transition={{ duration: 0.2 }}
                            className="cursor-pointer"
                        >
                            <TableCell>
                                <motion.div whileHover={{ scale: 1.15 }} transition={{ duration: 0.2 }}>
                                    <Avatar className="shadow-md border border-gray-300">
                                        <AvatarImage src={company.logo} />
                                    </Avatar>
                                </motion.div>
                            </TableCell>

                            <TableCell className="text-gray-900 hover:text-black transition font-medium">
                                {company.name}
                            </TableCell>

                            <TableCell className="text-gray-900">
                                {company.createdAt.split("T")[0]}
                            </TableCell>

                            <TableCell className="text-right cursor-pointer">
                                <Popover>
                                    <PopoverTrigger>
                                        <MoreHorizontal className="hover:scale-125 transition" />
                                    </PopoverTrigger>

                                    <PopoverContent className="w-36 bg-white/70 shadow-xl backdrop-blur-lg rounded-xl p-3">
                                        <div
                                            onClick={() =>
                                                navigate(`/admin/companies/${company._id}`)
                                            }
                                            className="flex items-center gap-2 cursor-pointer hover:text-black transition"
                                        >
                                            <Edit2 className="w-4" />
                                            <span>Edit</span>
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

export default CompaniesTable;
