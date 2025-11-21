import React, { useEffect, useState } from 'react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { motion } from 'framer-motion';

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
  },
  {
    filterType: "Industry",
    array: ["Frontend Developer", "Backend Developer", "FullStack Developer"]
  },
  {
    filterType: "Salary",
    array: ["0-40k", "42-1lakh", "1lakh to 5lakh"]
  },
];

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState('');
  const dispatch = useDispatch();

  const changeHandler = (value) => {
    setSelectedValue(value);
    dispatch(setSearchedQuery(value));
  };

  useEffect(() => {
    if (selectedValue) {
      dispatch(setSearchedQuery(selectedValue));
    }
  }, [selectedValue, dispatch]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className='w-full p-4 rounded-2xl border border-white/20 bg-white/20 backdrop-blur-md shadow-xl'
    >
      <h1 className='font-bold text-xl text-black drop-shadow-md mb-3'>Filter Jobs</h1>
      <hr className='border-white/30 mb-4' />

      <RadioGroup value={selectedValue} onValueChange={changeHandler}>
        {filterData.map((data, index) => (
          <div key={index} className='mb-4'>
            <h1 className='font-semibold text-lg text-yellow-400 mb-2 drop-shadow-md hover:text-blue-300 transition-colors duration-300'>
              {data.filterType}
            </h1>
            {data.array.map((item, idx) => {
              const itemId = `id${index}-${idx}`;
              return (
                <div key={item} className='flex items-center space-x-2 my-1'>
                  <RadioGroupItem value={item} id={itemId} />
                  <Label htmlFor={itemId} className='text-black'>
                    {item}
                  </Label>
                </div>
              );
            })}
          </div>
        ))}
      </RadioGroup>
    </motion.div>
  );
};

export default FilterCard;
