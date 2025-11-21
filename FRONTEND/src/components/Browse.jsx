import React, { useEffect, useState } from "react";
import Navbar from "./shared/Navbar";
import Job from "./Job";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";
import useGetAllJobs from "@/hooks/useGetAllJobs";
import { motion } from "framer-motion";

const Browse = () => {
  useGetAllJobs();
  const { allJobs } = useSelector((store) => store.job);
  const dispatch = useDispatch();

  const [bgLoaded, setBgLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = "https://images.unsplash.com/photo-1521737604893-d14cc237f11d";
    img.onload = () => setBgLoaded(true);

    return () => {
      dispatch(setSearchedQuery(""));
    };
  }, []);

  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.08 } }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: bgLoaded
          ? 'url(https://images.unsplash.com/photo-1521737604893-d14cc237f11d)'
          : 'url(https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=10&h=10&blur=10)',
      }}
    >
      <div className="backdrop-blur-[3px] bg-white/10 min-h-screen">
        <Navbar />
        <div style={{ height: "5px" }}></div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
          className="pt-0 max-w-7xl mx-auto my-10 px-4"
        >
          <h3
            className="pt-4 font-extrabold text-2xl my-10 text-white tracking-wide drop-shadow-md cursor-pointer
                       transition-all duration-300 hover:text-blue-300 hover:scale-105 hover:drop-shadow-xl"
          >
            Search Results ({allJobs.length})
          </h3>

          <motion.div
            initial="hidden"
            animate="show"
            variants={containerVariants}
            className="pt-0 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
          >
            {allJobs.map((job) => (
              <motion.div
                key={job._id}
                variants={cardVariants}
                className="transition-all duration-300 transform hover:scale-[1.03] hover:-translate-y-1"
              >
                <Job job={job} />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Browse;