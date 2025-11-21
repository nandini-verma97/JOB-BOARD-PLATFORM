//new Login.jsx
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
import { setLoading, setUser } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'
import { motion } from "framer-motion";

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

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });
  const { loading, user } = useSelector(store => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      dispatch(setLoading(true));
      const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json"
        },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  }

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div style={backgroundStyle}>
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
          <h1 style={headingStyle}>Login</h1>
          <div style={{ marginBottom: '22px' }}>
            <Label style={labelStyle}>Email</Label>
            <Input
              type="email"
              value={input.email}
              name="email"
              onChange={changeEventHandler}
              className="placeholder:text-gray-300"
              placeholder="Enter your email"
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
              placeholder="Enter your Password"
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
                  style={{accentColor: '#C4A484'}}
                />
                <Label htmlFor="r1" style={radioLabelStyle}>Student</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="radio"
                  name="role"
                  value="recruiter"
                  checked={input.role === 'recruiter'}
                  onChange={changeEventHandler}
                  className="cursor-pointer"
                  style={{accentColor: '#C4A484'}}
                />
                <Label htmlFor="r2" style={radioLabelStyle}>Recruiter</Label>
              </div>
            </RadioGroup>
          </div>
          {
            loading ? <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin' />Please wait</Button>
              : <Button type="submit" className="w-full my-4" style={{backgroundColor: '#C4A484', color: '#222'}}>Login</Button>
          }
          <span style={{ display: 'block', textAlign: 'center', color: '#ddeeff', fontSize: '1rem', marginTop: '14px' }}>Don't have an account? <Link to="/signup" style={{ color: '#C4A484' }}>Signup</Link></span>
        </motion.form>
      </div>
    </div>
  )
}

export default Login

