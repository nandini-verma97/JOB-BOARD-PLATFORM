import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { useDispatch } from 'react-redux'
import { setSearchCompanyByText } from '@/redux/CompanySlice'
import { motion } from 'framer-motion'

const Companies = () => {
    useGetAllCompanies();
    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setSearchCompanyByText(input));
    }, [input]);

    return (
        <div
            className="min-h-screen bg-cover bg-center bg-no-repeat"
            style={{
                backgroundImage:
                    "url('https://images.pexels.com/photos/3183186/pexels-photo-3183186.jpeg')" // Professional corporate background
            }}
        >
            <div className="bg-white/2 backdrop-blur-md min-h-screen">
                <Navbar />
                <div style={{ height: "5px" }}></div>

                <motion.div
                    className='pt-10 max-w-6xl mx-auto my-10'
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <div className='flex items-center justify-between my-5'>
                        <motion.div whileHover={{ scale: 1.03 }} transition={{ duration: 0.3 }}>
                            <Input
                                className="w-fit text-gray-900 drop-shadow-sm"
                                placeholder="Filter by name"
                                onChange={(e) => setInput(e.target.value)}
                            />
                        </motion.div>

                        <motion.div whileHover={{ scale: 1.05 }}>
                            <Button
                                className="bg-yellow-300  text-black font-semibold tracking-wide shadow-md hover:shadow-xl transition-all"
                                onClick={() => navigate("/admin/companies/create")}
                            >
                                New Company
                            </Button>
                        </motion.div>
                    </div>

                    <CompaniesTable />
                </motion.div>
            </div>
        </div>
    )
}

export default Companies