
// import React, { useState } from 'react'
// import Navbar from './shared/Navbar'
// import { Avatar, AvatarImage } from './ui/avatar'
// import { Button } from './ui/button'
// import { Contact, Mail, Pen } from 'lucide-react'
// import { Badge } from './ui/badge'
// import { Label } from './ui/label'
// import AppliedJobTable from './AppliedJobTable'
// import UpdateProfileDialog from './UpdateProfileDialog'
// import { useSelector } from 'react-redux'
// import useGetAppliedJobs from '@/hooks/useGetAppliedJob'

// const isResume = true;

// const Profile = () => {
//     useGetAppliedJobs();
//     const [open, setOpen] = useState(false);
//     const { user } = useSelector(store => store.auth);

//     return (
//         <div>
//             <Navbar />
//             <div className='max-w-4xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8'>
//                 <div className='flex justify-between'>
//                     <div className='flex items-center gap-4'>
//                         <Avatar className="h-24 w-24">
//                             <AvatarImage
//                                 src={
//                                     user?.profile?.profilePhoto
//                                         ? user.profile.profilePhoto
//                                         : "https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"
//                                 }
//                                 alt="profile"
//                             />
//                         </Avatar>

//                         <div>
//                             <h1 className='font-medium text-xl'>{user?.fullname}</h1>
//                             <p>{user?.profile?.bio}</p>
//                         </div>
//                     </div>
//                     <Button onClick={() => setOpen(true)} className="text-right" variant="outline"><Pen /></Button>
//                 </div>
//                 <div className='my-5'>
//                     <div className='flex items-center gap-3 my-2'>
//                         <Mail />
//                         <span>{user?.email}</span>
//                     </div>
//                     <div className='flex items-center gap-3 my-2'>
//                         <Contact />
//                         <span>{user?.phoneNumber}</span>
//                     </div>
//                 </div>
//                 <div className='my-5'>
//                     <h1>Skills</h1>
//                     <div className='flex items-center gap-1'>
//                         {
//                             user?.profile?.skills.length !== 0 ? user?.profile?.skills.map((item, index) => <Badge key={index}>{item}</Badge>) : <span>NA</span>
//                         }
//                     </div>
//                 </div>

//                 {/* old code for resume
//                 <div className='grid w-full max-w-sm items-center gap-1.5'>
//                     <Label className="text-md font-bold">Resume</Label>
//                     {
//                         isResume ? <a target='blank' href={user?.profile?.resume} className='text-blue-500 w-full hover:underline cursor-pointer'>{user?.profile?.resumeOriginalName}</a> : <span>NA</span>
//                     }
//                 </div> */}

//                 {/* new code for resume */}
//                 <div className='grid w-full max-w-sm items-center gap-1.5'>
//                     <Label className="text-md font-bold">Resume</Label>
//                     {
//                         isResume
//                             ? (
//                                 <a
//                                     href={user?.profile?.resume}
//                                     target="_blank"   // underscore is required
//                                     rel="noopener noreferrer"
//                                     className='text-blue-500 w-full hover:underline cursor-pointer'
//                                 >
//                                     {user?.profile?.resumeOriginalName}
//                                 </a>
//                             )
//                             : <span>NA</span>
//                     }
//                 </div>


//             </div>
//             <div className='max-w-4xl mx-auto bg-white rounded-2xl'>
//                 <h1 className='font-bold text-lg my-5'>Applied Jobs</h1>
//                 {/* Applied Job Table   */}
//                 <AppliedJobTable />
//             </div>
//             <UpdateProfileDialog open={open} setOpen={setOpen} />
//         </div>
//     )
// }

// export default Profile




//new profile.jsx 


// Updated Profile.jsx with styling inspired by Home.jsx
import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen } from 'lucide-react'
import { Badge } from './ui/badge'
import { Label } from './ui/label'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '@/hooks/useGetAppliedJob'

const isResume = true;

const backgroundStyle = {
    minHeight: '100vh',
    width: '100%',
    backgroundImage: 'url("https://images.unsplash.com/photo-1521791136064-7986c2920216?q=80&w=1470&auto=format&fit=crop")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    position: 'relative',
};

const overlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    minHeight: '100vh',
    backgroundColor: 'rgba(0,0,0,0.25)',
    zIndex: 0,
};




const contentStyle = {
    position: 'relative',
    zIndex: 1,
    animation: 'fadeIn 1.2s ease',
};

const Profile = () => {
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const { user } = useSelector(store => store.auth);

    return (
        <div style={backgroundStyle}>
            <div style={overlayStyle}></div>


            <div style={contentStyle}>
                <Navbar />
                <div style={{ height: "5px" }}></div>


                <div className='max-w-4xl mx-auto backdrop-blur-md bg-white/20 border border-white/30 shadow-xl rounded-3xl mt-24 mb-10 p-8 transition-all duration-300 hover:shadow-2xl'>
                    <div className='flex justify-between items-center'>
                        <div className='flex items-center gap-4'>
                            <Avatar className="h-24 w-24 ring-4 ring-white shadow-lg transition-transform duration-300 hover:scale-105">
                                <AvatarImage
                                    src={
                                        user?.profile?.profilePhoto
                                            ? user.profile.profilePhoto
                                            : "https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"
                                    }
                                    alt="profile"
                                />
                            </Avatar>

                            <div>
                                <h1 className="font-semibold text-2xl text-gray-900/90 transition-all duration-300 hover:text-gray-700 hover:scale-[1.02]">
                                    {user?.fullname}
                                </h1>
                                <p className="text-gray-800/80 transition-all duration-300 hover:text-gray-700 hover:scale-[1.02]">{user?.profile?.bio}</p>
                            </div>
                        </div>

                        <Button
                            onClick={() => setOpen(true)}
                            className='backdrop-blur-md  hover:bg-white/40 border border-white text-white shadow-md transition-all duration-300'
                        >
                            <Pen />
                        </Button>
                    </div>

                    <div className='my-5'>
                        <div className='flex items-center gap-3 my-2'>
                            <Mail /> <span className="text-gray-900/80 transition-all duration-300 hover:text-gray-700 hover:scale-[1.02]" >{user?.email}</span>
                        </div>
                        <div className='flex items-center gap-3 my-2'>
                            <Contact /> <span className="text-gray-900/80 transition-all duration-300 hover:text-gray-700 hover:scale-[1.02]">{user?.phoneNumber}</span>
                        </div>
                    </div>

                    <div className='my-5'>
                        <h3 className="font-semibold text-1xl text-gray-900/90 transition-all duration-300 hover:text-gray-700 hover:scale-[1.02]">Skills</h3>
                        <div className='flex flex-wrap items-center gap-2'>
                            {user?.profile?.skills.length !== 0 ? (
                                user?.profile?.skills.map((item, index) => (
                                    <Badge
                                        key={index}
                                        className="bg-white/40 text-gray-900/90 hover:bg-white/60 hover:text-gray-700 transition-all duration-300 hover:scale-[1.05]"
                                    >
                                        {item}
                                    </Badge>
                                ))
                            ) : (
                                <span className='text-white'>NA</span>
                            )}
                        </div>
                    </div>

                    <div className='grid w-full max-w-sm items-center gap-1.5'>
                        <Label className="font-semibold text-1xl text-gray-900/90 transition-all duration-300 hover:text-gray-700 hover:scale-[1.02]">Resume</Label>
                        {isResume ? (
                            <a
                                href={user?.profile?.resume}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-700/90 hover:text-blue-800 transition-all duration-300 hover:scale-[1.02] hover:underline"
                            >
                                {user?.profile?.resumeOriginalName}
                            </a>
                        ) : (
                            <span className='text-white'>NA</span>
                        )}
                    </div>
                </div>

                <div className="max-w-4xl mx-auto backdrop-blur-xl bg-white/20 border border-white/40 rounded-3xl p-8 shadow-2xl mb-12
                transition-all duration-300 hover:bg-white/25 hover:shadow-[0_8px_30px_rgba(255,255,255,0.25)]">

                    <h1 className="font-bold text-2xl  mb-6 drop-shadow-lg tracking-wide hover:text-gray-700 hover:scale-[1.02]">
                        Applied Jobs
                    </h1>

                    <AppliedJobTable />
                </div>


                <UpdateProfileDialog open={open} setOpen={setOpen} />
            </div>
        </div>
    );
};

export default Profile;

/* Keyframes */
const style = document.createElement('style');
style.innerHTML = `
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}`;
document.head.appendChild(style);
