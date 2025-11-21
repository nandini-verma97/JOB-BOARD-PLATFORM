import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { ArrowLeft, Loader2 } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import axios from 'axios'
import { COMPANY_API_END_POINT } from '@/utils/constant'
import { useNavigate, useParams } from 'react-router-dom'
import { toast } from 'sonner'
import { useSelector } from 'react-redux'
import useGetCompanyById from '@/hooks/useGetCompanyById'

const CompanySetup = () => {
    const params = useParams();
    useGetCompanyById(params.id);
    const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        file: null
    });
    const { singleCompany } = useSelector(store => store.company);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const changeFileHandler = (e) => {
        setInput({ ...input, file: e.target.files?.[0] });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", input.name);
        formData.append("description", input.description);
        formData.append("website", input.website);
        formData.append("location", input.location);
        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            setLoading(true);
            const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/companies");
            }
        } catch (error) {
            toast.error(error?.response?.data?.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setInput({
            name: singleCompany.name || "",
            description: singleCompany.description || "",
            website: singleCompany.website || "",
            location: singleCompany.location || "",
            file: null
        });
    }, [singleCompany]);

    return (
        <div
            className="min-h-screen 
            bg-[url('https://images.unsplash.com/photo-1531973576160-7125cd663d86?q=80&w=2070')]
            bg-cover bg-center bg-no-repeat relative"
        >
            <Navbar />
            <div style={{ height: "5px" }}></div>

            {/* Soft Dark Overlay */}
            <div className="absolute inset-0 bg-black/30 backdrop-blur-sm"></div>

            <div className="pt-28 relative max-w-xl mx-auto mt-16 animate-fadein">
                
                {/* Floating Glass Card */}
                <form
                    onSubmit={submitHandler}
                    className="
                        p-10 rounded-2xl shadow-2xl 
                        bg-white/20 backdrop-blur-xl border border-white/30
                        transform transition duration-300
                        hover:shadow-[0_0_40px_rgba(255,255,255,0.4)]
                        hover:scale-[1.02] relative overflow-hidden
                    "
                >

                    {/* Glass Shine Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 hover:opacity-100 transition duration-700 translate-x-[-200px] hover:translate-x-[200px] rotate-6"></div>

                    {/* Header */}
                    <div className="flex items-center gap-5 mb-8">
                        <Button
                            onClick={() => navigate("/admin/companies")}
                            type="button"
                            variant="outline"
                            className="flex items-center gap-2 text-black font-semibold hover:text-yellow-300 transition-all"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            <span>Back</span>
                        </Button>

                        <h1
                            className="text-3xl font-extrabold text-white drop-shadow-lg
                            transition duration-300 hover:text-yellow-300 hover:scale-105"
                        >
                            Company Setup
                        </h1>
                    </div>

                    {/* Form Grid */}
                    <div className="grid grid-cols-2 gap-5">
                        {[
                            { label: "Company Name", name: "name" },
                            { label: "Description", name: "description" },
                            { label: "Website", name: "website" },
                            { label: "Location", name: "location" }
                        ].map((field, index) => (
                            <div
                                key={index}
                                className="transition-all hover:scale-[1.02] hover:brightness-110"
                            >
                                <Label className="text-white font-semibold tracking-wide drop-shadow">
                                    {field.label}
                                </Label>
                                <Input
                                    type="text"
                                    name={field.name}
                                    value={input[field.name]}
                                    onChange={changeEventHandler}
                                    className="
                                        mt-1 bg-white/20 text-white placeholder:text-gray-300 
                                        border-white/30 backdrop-blur-xl
                                        transition-all duration-300
                                        focus:scale-[1.03] focus:border-yellow-300
                                        hover:border-yellow-300
                                    "
                                />
                            </div>
                        ))}

                        {/* File Upload */}
                        <div className="col-span-2 hover:scale-[1.02] transition">
                            <Label className="text-white font-semibold drop-shadow">
                                Upload Logo
                            </Label>
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={changeFileHandler}
                                className="
                                    mt-1 bg-white/20 text-white border-white/30 
                                    file:text-white file:bg-black/30 file:border-0
                                    transition-all hover:border-yellow-300 focus:border-yellow-300
                                "
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    {loading ? (
                        <Button className="w-full mt-8">
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Please wait
                        </Button>
                    ) : (
                        <Button
                            type="submit"
                            className="
                                w-full mt-8 text-lg font-semibold transition-all
                                hover:scale-105 hover:bg-yellow-400 hover:text-black
                                animate-fadein
                            "
                        >
                            Update
                        </Button>
                    )}
                </form>
            </div>
        </div>
    );
};

export default CompanySetup;
