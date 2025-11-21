import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch } from 'react-redux'
import { setSingleCompany } from '@/redux/CompanySlice'
import { motion } from 'framer-motion'

const CompanyCreate = () => {
    const navigate = useNavigate();
    const [companyName, setCompanyName] = useState();
    const dispatch = useDispatch();

    const registerNewCompany = async () => {
        try {
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`, { companyName }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });
            if (res?.data?.success) {
                dispatch(setSingleCompany(res.data.company));
                toast.success(res.data.message);
                const companyId = res?.data?.company?._id;
                navigate(`/admin/companies/${companyId}`);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div 
            className="min-h-screen bg-[url('https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg')] bg-cover bg-center bg-fixed overflow-hidden"
        >
            <Navbar />

            {/* Floating Card */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="pt-14 max-w-4xl mx-auto mt-14 p-10 rounded-3xl shadow-2xl bg-white/25 backdrop-blur-xl border border-white/40 relative overflow-hidden"
            >
                {/* Glass Reflection Shine */}
                <motion.div
                    className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-white/10 to-transparent opacity-0"
                    whileHover={{ opacity: 1, x: 200 }}
                    transition={{ duration: 1.2 }}
                />

                {/* Floating Animation */}
                <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="group"
                    >
                        <h1 className="font-extrabold text-3xl text-gray-900 mb-2 tracking-wide 
                            transition-all duration-300 group-hover:text-yellow-500 group-hover:scale-[1.02] cursor-default">
                            Your Company Name
                        </h1>

                        <p className="text-gray-700 font-medium transition-all duration-300 
                            group-hover:text-gray-900 group-hover:scale-[1.01] cursor-default">
                            What would you like to name your company? 
                            <span className="text-gray-900 font-semibold"> You can change this later.</span>
                        </p>
                    </motion.div>

                    <Label className="mt-6 block text-gray-800 font-semibold">Company Name</Label>
                    <Input
                        type="text"
                        className="my-3 bg-white/60 border-gray-300 rounded-xl
                            transition-all duration-300 focus:border-yellow-500
                            focus:ring-2 focus:ring-yellow-400
                            hover:border-black hover:bg-white/80
                            hover:shadow-lg hover:scale-[1.01]"
                        placeholder="JobHunt, Microsoft etc."
                        onChange={(e) => setCompanyName(e.target.value)}
                    />

                    {/* Buttons with fade-in and hover animations */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="flex items-center gap-3 mt-10"
                    >
                        <motion.div whileHover={{ scale: 1.05 }}>
                            <Button variant="outline" onClick={() => navigate("/admin/companies")}
                                className="transition-all duration-300 hover:bg-white hover:text-black"
                            >
                                Cancel
                            </Button>
                        </motion.div>

                        <motion.div whileHover={{ scale: 1.07 }}>
                            <Button onClick={registerNewCompany}
                                className="bg-yellow-500 text-black font-semibold hover:bg-yellow-600 transition-all duration-300 shadow-md hover:shadow-xl"
                            >
                                Continue
                            </Button>
                        </motion.div>
                    </motion.div>
                </motion.div>
            </motion.div>
        </div>
    )
}

export default CompanyCreate;