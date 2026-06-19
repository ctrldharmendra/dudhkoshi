"use client"
import React, { useEffect, useState } from 'react'
import {
  FiMail,
  FiCalendar,
  FiShield,
} from "react-icons/fi";
import Image from 'next/image';
import axios from 'axios';





const ProfileSection = () => {

    const user2 = {
    profileImage:"https://randomuser.me/api/portraits/men/1.jpg",
    name:"name11admin",
    role:"Admin",
    email:"email11",
    dob:"12/12/2080"
};



    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


       const fetchCurrentUser = async () => {

        try {

            const {data} = await axios.get(
                "/api/user/myprofile",
                {
                    withCredentials: true,
                }
            );


            console.log("Current User:", data?.data[0]);

        } catch(error){

            console.log(
                "Fetch user error:",
                error
            );
        } finally {

            setLoading(false);

        }

    };


    console.log(user)

    useEffect(()=>{

        fetchCurrentUser();

    },[]);



  return (
<>


<div className="flex flex-col items-center">


<Image

src={user2.profileImage}

width={110}

height={110}

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

{user2.role}

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
{user2.email}
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
{user2.dob}
</p>

</div>


</div>





</div>


</>
  )
}

export default ProfileSection