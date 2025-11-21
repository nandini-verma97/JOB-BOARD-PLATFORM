import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import ApplicantsTable from './ApplicantsTable'
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setAllApplicants } from '@/redux/applicationSlice';

const Applicants = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const { applicants } = useSelector(store => store.application);

    useEffect(() => {
        const fetchAllApplicants = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`, { withCredentials: true });
                dispatch(setAllApplicants(res.data.job));
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllApplicants();
    }, []);

    return (
        <div
            className="min-h-screen w-full bg-cover bg-center bg-no-repeat backdrop-blur-md"
            style={{ backgroundImage: 'url("https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg")' }}
        >
            <Navbar />
            <div style={{ height: "5px" }}></div>
            <div className='pt-11 max-w-7xl mx-auto mt-10 p-6 bg-white/40 backdrop-blur-lg rounded-2xl shadow-lg border border-white/30'>
                <h1
                    className="
    font-extrabold text-3xl mb-6 tracking-wide 
    text-gray-900 drop-shadow-sm
    transition-all duration-300 ease-in-out
    hover:text-yellow-400 hover:scale-105 hover:drop-shadow-lg
  "
                >
                    Applicants ({applicants?.application?.length})
                </h1>

                <ApplicantsTable />
            </div>
        </div>
    )
}

export default Applicants;
