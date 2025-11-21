//perplecity navbar  

import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { Avatar, AvatarImage } from '../ui/avatar';
import { LogOut, User2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';

const Navbar = () => {
  const { user } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  // Accent color for hover (teal/cyan)
  const hoverNavColor = "hover:text-[#00E0EE]"; // Bright cyan for clear visibility

  return (
  <div className="fixed top-0 left-0 w-full z-50 bg-white/30 backdrop-blur-md shadow-md transition-all duration-300">

      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <div className="group cursor-pointer transition-all duration-300">
          <h1 className="text-2xl font-extrabold tracking-tight text-white drop-shadow-lg group-hover:scale-105 transition-transform duration-300">
            Job<span className="text-[#FFD700]">Portal</span>
            {/* "Job" in white, "Portal" in vibrant gold (#FFD700) */}
          </h1>
        </div>

        {/* Nav Links */}
        <div className="flex items-center gap-12">
          <ul className="flex font-medium items-center gap-6 text-black">
            {user && user.role === 'recruiter' ? (
              <>
                <li className="relative group cursor-pointer transition-all duration-300">
                  <Link to="/admin/companies" className={`${hoverNavColor}`}>
                    Companies
                  </Link>
                  <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#00E0EE] transition-all duration-300 group-hover:w-full"></span>
                </li>
                <li className="relative group cursor-pointer transition-all duration-300">
                  <Link to="/admin/jobs" className={`${hoverNavColor}`}>
                    Jobs
                  </Link>
                  <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#00E0EE] transition-all duration-300 group-hover:w-full"></span>
                </li>
              </>
            ) : (
              <>
                <li className="text-black relative group cursor-pointer transition-all duration-300">
                  <Link to="/" className={`${hoverNavColor}`}>
                    Home
                  </Link>
                  <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#00E0EE] transition-all duration-300 group-hover:w-full"></span>
                </li>
                <li className="text-black relative group cursor-pointer transition-all duration-300">
                  <Link to="/jobs" className={`${hoverNavColor}`}>
                    Jobs
                  </Link>
                  <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#00E0EE] transition-all duration-300 group-hover:w-full"></span>
                </li>
                <li className="text-black relative group cursor-pointer transition-all duration-300">
                  <Link to="/browse" className={`${hoverNavColor}`}>
                    Browse
                  </Link>
                  <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#00E0EE] transition-all duration-300 group-hover:w-full"></span>
                </li>
              </>
            )}
          </ul>

          {/* Auth Buttons */}
          {!user ? (
            <div className="flex items-center gap-3">
              <Link to="/login">
                <Button
                  variant="outline"
                  className="border-[#FFD700] bg-[#FFF9DB] text-gray-800 hover:bg-[#FFD700] hover:text-white transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  Login
                </Button>
              </Link>

              <Link to="/signup">
                <Button
                  className="bg-[#FFD700] text-gray-900 hover:bg-[#F5C400] shadow-md hover:shadow-lg transition-all duration-300"
                >
                  Signup
                </Button>
              </Link>
            </div>


          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer ring-2 ring-[#6A38C2]/30 hover:ring-[#6A38C2]/70 transition-all duration-300">
                  <AvatarImage
                    src={
                      user?.profile?.profilePhoto ||
                      "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                    }
                    alt="User Avatar"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80 rounded-xl shadow-xl border border-gray-100 mt-2 transition-all duration-300 bg-gray-900/95 text-white">
                <div>
                  <div className="flex gap-3 items-center border-b border-gray-700 pb-3 mb-3">
                    <Avatar className="ring-2 ring-[#6A38C2]/20">
                      <AvatarImage
                        src={
                          user?.profile?.profilePhoto ||
                          "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                        }
                        alt="User Avatar"
                      />
                    </Avatar>
                    <div>
                      <h4 className="font-semibold text-white">{user?.fullname}</h4>
                      <p className="text-sm text-gray-300">{user?.profile?.bio}</p>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3 text-white">
                    {user && user.role === 'student' && (
                      <div className="flex w-fit items-center gap-2 hover:text-[#00E0EE] transition-all duration-300 cursor-pointer">
                        <User2 size={18} />
                        <Button variant="link">
                          <Link to="/profile" className="text-white hover:text-[#00E0EE]">View Profile</Link>
                        </Button>
                      </div>
                    )}
                    <div
                      onClick={logoutHandler}
                      className="flex w-fit items-center gap-2 hover:text-red-500 transition-all duration-300 cursor-pointer"
                    >
                      <LogOut size={18} />
                      <Button variant="link" className="text-white hover:text-red-500">
                        Logout
                      </Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
