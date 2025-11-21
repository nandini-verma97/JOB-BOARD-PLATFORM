import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useSelector } from 'react-redux'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select'
import axios from 'axios'
import { JOB_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'

const PostJob = () => {
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        salary: "",
        location: "",
        jobType: "",
        experience: "",
        position: 0,
        companyId: ""
    });

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { companies } = useSelector(store => store.company);

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const selectChangeHandler = (value) => {
        const selectedCompany = companies.find((company) => company.name.toLowerCase() === value);
        setInput({ ...input, companyId: selectedCompany._id });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            });

            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/jobs");
            }
        } catch (error) {
            toast.error(error.response.data.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <Navbar />

            <div className="min-h-screen w-full flex items-center justify-center 
                bg-gradient-to-br from-[#e3f0ff] via-[#eef7ff] to-[#d9e6f7] 
                py-12 px-4">

                <form
                    onSubmit={submitHandler}
                    className="
                        relative
                        max-w-4xl w-full p-10 rounded-3xl 
                        bg-white/20 backdrop-blur-2xl 
                        border border-white/40 shadow-2xl 

                        transition-all duration-300 
                        hover:shadow-[0_0_40px_rgba(255,255,255,0.45)]
                        hover:-translate-y-2
                        overflow-hidden
                    "
                >

                    {/* Shine Effect */}
                    <div className="absolute top-0 left-0 w-full h-full pointer-events-none shine-effect"></div>

                    <h2 className="
                        text-4xl font-bold mb-10 text-gray-800 text-center tracking-wide 
                        transition-all duration-300 
                        hover:text-yellow-600 
                        hover:scale-105 
                        cursor-default
                    ">
                        Post a New Job
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {[
                            { label: "Title", name: "title" },
                            { label: "Description", name: "description" },
                            { label: "Requirements", name: "requirements" },
                            { label: "Salary", name: "salary" },
                            { label: "Location", name: "location" },
                            { label: "Job Type", name: "jobType" },
                            { label: "Experience Level", name: "experience" },
                        ].map((item) => (
                            <div key={item.name} className="group transition-all">
                                <Label className="text-gray-700">{item.label}</Label>
                                <Input
                                    type="text"
                                    name={item.name}
                                    value={input[item.name]}
                                    onChange={changeEventHandler}
                                    className="beauty-input my-1"
                                />
                            </div>
                        ))}

                        <div>
                            <Label className="text-gray-700">No. of Positions</Label>
                            <Input
                                type="number"
                                name="position"
                                value={input.position}
                                onChange={changeEventHandler}
                                className="beauty-input my-1"
                            />
                        </div>

                        {companies.length > 0 && (
                            <div className="md:col-span-2">
                                <Label className="text-gray-700">Company</Label>

                                <Select onValueChange={selectChangeHandler}>
                                    <SelectTrigger className="beauty-input h-14 flex items-center">
                                        <SelectValue placeholder="Select a Company" />
                                    </SelectTrigger>

                                    <SelectContent className="
                                        bg-white/80 backdrop-blur-xl shadow-xl 
                                        border border-gray-300
                                        rounded-xl
                                    ">
                                        <SelectGroup>
                                            {companies.map((company) => (
                                                <SelectItem
                                                    key={company._id}
                                                    value={company.name.toLowerCase()}
                                                    className="
                                                        py-3 rounded-md
                                                        hover:bg-yellow-100 
                                                        hover:text-yellow-700
                                                        transition-all
                                                    "
                                                >
                                                    {company.name}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                            </div>
                        )}
                    </div>

                    {loading ? (
                        <Button className="w-full my-8 py-6 rounded-xl text-lg shadow-lg">
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" /> Posting...
                        </Button>
                    ) : (
                        <Button
                            type="submit"
                            className="
                                w-full my-8 py-6 text-lg font-semibold rounded-xl
                                shadow-lg transition-all 
                                hover:scale-[1.03] hover:shadow-2xl 
                                active:scale-95
                            "
                        >
                            Post New Job
                        </Button>
                    )}

                    {companies.length === 0 && (
                        <p className="text-center text-sm text-red-600 font-semibold">
                            *Please register a company first
                        </p>
                    )}

                </form>
            </div>
        </div>
    )
}

export default PostJob
