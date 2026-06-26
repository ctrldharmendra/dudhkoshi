"use client"
import React, { useEffect, useState } from 'react'
import {
  FiMail,
  FiCalendar,
  FiShield,
} from "react-icons/fi";
import Image from 'next/image';
import axios from 'axios';
import ProfileLoader from './ProfileLoader';

import { formatDate } from "@/utils/formatDate";



const ProfileSection = () => {

    const baseContentUrl = process.env.NEXT_PUBLIC_BASE_CONTENT_URL; 




    const [user, setUser] = useState(null);

       const fetchCurrentUser = async () => {

        try {

            const {data} = await axios.get(
                "/api/user/myprofile",
                {
                    withCredentials: true,
                }
            );
            setUser(data?.data[0])
        } catch(error){

            console.log(
                "Fetch user error:",
                error
            );
        } finally {



        }

    };


    // console.log(user, "from profi")

    useEffect(()=>{

        fetchCurrentUser();

    },[]);


  return (
<>


<div className="flex flex-col items-center">


<Image
unoptimized
src={baseContentUrl+'/'+user?.dp}

width={100}

height={100}

alt="profile"

className="
rounded-full
border-4
border-blue-100
"
/>


<h2 className="
mt-4
text-xl
font-bold
text-slate-800
">

{user?.name}

</h2>


<div className="
mt-2
px-4
py-1
rounded-full
bg-blue-100
text-blue-700
text-sm
flex
items-center
gap-2
">

<FiShield/>

{user?.userRole}

</div>


</div>





<div className="
mt-6
space-y-4
">


<div className="
flex
items-center
gap-3
text-slate-600
">

<div className="
p-2
rounded-lg
bg-slate-100
">

<FiMail/>

</div>

<div>

<p className="text-xs text-slate-400">
Email
</p>

<p className="font-medium">
{user?.email}
</p>

</div>


</div>






<div className="
flex
items-center
gap-3
text-slate-600
">


<div className="
p-2
rounded-lg
bg-slate-100
">

<FiCalendar/>

</div>


<div>

<p className="text-xs text-slate-400">
Date of Birth
</p>

<p className="font-medium">
{formatDate(user?.date_of_birth)}
</p>

</div>


</div>





</div>


</>
  )
}

export default ProfileSection