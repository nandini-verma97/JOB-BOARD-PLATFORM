import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'
import { motion } from "framer-motion";

// --- Same styles as Login.jsx ---
const backgroundStyle = {
  minHeight: '100vh',
  width: '100%',
  backgroundImage: 'url("https://images.pexels.com/photos/3184454/pexels-photo-3184454.jpeg")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  position: 'relative',
  backgroundAttachment: 'fixed',
};

const overlayStyle = {
  position: 'absolute',
  top: 0,
  left: 0,
  minHeight: '100vh',
  width: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.55)',
  zIndex: 0,
};

const contentStyle = {
  position: 'relative',
  zIndex: 1,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
};

const formStyle = {
  background: 'rgba(255, 255, 255, 0.09)',
  borderRadius: '16px',
  boxShadow: '0 4px 40px rgba(0,0,0,0.15)',
  backdropFilter: 'blur(6px)',
  width: '350px',
  padding: '38px 25px',
  color: '#fafafa',
};

const headingStyle = {
  color: '#f8f6f6ff',
  fontWeight: 'bold',
  fontSize: '2rem',
  marginBottom: '32px',
  textAlign: 'center',
  letterSpacing: '1px',
};

const inputStyle = {
  fontSize: '1rem',
  marginBottom: '17px',
  backgroundColor: 'rgba(20,20,20,0.20)',
  color: '#fff',
  border: '1px solid #C4A484',
};

const labelStyle = {
  color: '#d8e6ed',
  fontWeight: 500,
  fontSize: '1rem',
  marginBottom: '8px',
};

const radioLabelStyle = {
  color: '#fafafa',
  marginLeft: '6px',
  fontSize: '1rem',
};
// -------------------------------------------------------

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: ""
  });

  const { loading, user } = useSelector(store => store.auth);
  const dispatch = useDispatch();
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
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
        headers: { 'Content-Type': "multipart/form-data" },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    if (user) navigate("/");
  }, []);

  return (
    <div style={backgroundStyle} className="pt-3 flex justify-center items-center">
      <div style={overlayStyle}></div>

      <div style={contentStyle}>
        <Navbar />
        <motion.form
        onSubmit={submitHandler}
        style={formStyle}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
          <h1 style={headingStyle}>Signup</h1>

          <div style={{ marginBottom: '22px' }}>
            <Label style={labelStyle}>Full Name</Label>
            <Input
              type="text"
              value={input.fullname}
              name="fullname"
              onChange={changeEventHandler}
              className="placeholder:text-gray-300"
              placeholder="Enter your Name"
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: '22px' }}>
            <Label style={labelStyle}>Email</Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              className="placeholder:text-gray-300"
              placeholder="Enter Email"
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: '22px' }}>
            <Label style={labelStyle}>Phone Number</Label>
            <Input
              type="text"
              value={input.phoneNumber}
              name="phoneNumber"
              onChange={changeEventHandler}
              className="placeholder:text-gray-300"
              placeholder="Enter Phone Number"
              style={inputStyle}
            />
          </div>

          <div style={{ marginBottom: '22px' }}>
            <Label style={labelStyle}>Password</Label>
            <Input
              type="password"
              value={input.password}
              name="password"
              onChange={changeEventHandler}
              className="placeholder:text-gray-300"
              placeholder="Enter your password"
              style={inputStyle}
            />
          </div>

          <div className='flex items-center justify-between' style={{ marginBottom: '22px' }}>
            <RadioGroup className="flex items-center gap-4 my-5">
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="student"
                  checked={input.role === 'student'}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                  style={{ accentColor: '#C4A484' }}
                />
                <Label style={radioLabelStyle}>Student</Label>
              </div>

              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === 'recruiter'}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                  style={{ accentColor: '#C4A484' }}
                />
                <Label style={radioLabelStyle}>Recruiter</Label>
              </div>
            </RadioGroup>
          </div>

          <div style={{ marginBottom: '22px' }}>
            <Label style={labelStyle}>Profile</Label>
            <Input
              type="file"
              accept="image/*"
              onChange={changeFileHandler}
              className="cursor-pointer"
              style={{
                color: "#fff",
                backgroundColor: "rgba(20,20,20,0.20)",
                border: "1px solid #C4A484",
                padding: "8px",
              }}
            />
          </div>

          {loading ? (
            <Button className="w-full my-4">
              <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              Please wait
            </Button>
          ) : (
            <Button
              type="submit"
              className="w-full my-4"
              style={{ backgroundColor: '#C4A484', color: '#222' }}
            >
              Signup
            </Button>
          )}

          <span
            style={{
              display: 'block',
              textAlign: 'center',
              color: '#ddeeff',
              fontSize: '1rem',
              marginTop: '14px'
            }}
          >
            Already have an account?{" "}
            <Link to="/login" style={{ color: '#C4A484' }}>Login</Link>
          </span>
        </motion.form>
      </div>
    </div>
  );
};

export default Signup;
