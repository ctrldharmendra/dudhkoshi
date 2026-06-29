"use client";

import axios from "axios";
import Image from "next/image";
import { Suspense, useEffect, useState } from "react";

import {
  FiUser,
  FiMail,
  FiCalendar,
  FiShield,
  FiFileText,
  FiCheckCircle,
  FiClock,
  FiTrendingUp,
} from "react-icons/fi";
import ProfileSection from "./components/ProfileSection";
import TinyLoader from "@/components/reusable/loader/TinyLoader";
import ProfileLoader from "./components/ProfileLoader";
import AllRoleUserCount from "./manage/users/components/AllRoleUserCount";
import Link from "next/link";


export default function Dashboard(){




const stats=[

{
 title:"Total Bids",
 value:"120",
 icon:FiFileText,
 color:"bg-blue-500"
},

{
 title:"Approved",
 value:"85",
 icon:FiCheckCircle,
 color:"bg-green-500"
},

{
 title:"Pending",
 value:"25",
 icon:FiClock,
 color:"bg-yellow-500"
},

{
 title:"Growth",
 value:"24%",
 icon:FiTrendingUp,
 color:"bg-purple-500"
}

];



return (

<div className="space-y-6">


{/* Header */}

<div>

<h1 className="text-3xl font-bold text-slate-800">
Welcome back
</h1>

<p className="text-slate-500 mt-1">
Manage your dashboard and monitor activities
</p>

</div>




{/* Profile + Stats */}

<div className="
grid
grid-cols-1
xl:grid-cols-3
gap-6
">



{/* Profile Card */}

   <div className="
xl:col-span-1
bg-white
rounded-2xl
shadow-sm
border
border-slate-200
p-6
">
<Suspense fallback={<ProfileLoader></ProfileLoader>}>
<ProfileSection></ProfileSection>

</Suspense>
</div>




{/* Stats */}

<div className="
xl:col-span-2
grid
sm:grid-cols-2
gap-5
">



{
stats.map((item,index)=>{


const Icon=item.icon;


return (

<div

key={index}

className="
bg-white
border
border-slate-200
rounded-2xl
p-6
shadow-sm
hover:shadow-md
transition
"

>


<div className="
flex
justify-between
items-center
">


<div>


<p className="
text-sm
text-slate-500
">

{item.title}

</p>


<h3 className="
text-3xl
font-bold
mt-2
text-slate-800
">

{item.value}

</h3>


</div>


<div className={`
${item.color}
text-white
p-4
rounded-xl
`}>

<Icon size={25}/>

</div>


</div>


</div>


)


})

}


</div>



</div>







{/* Bottom Section */}

<div className="
grid
grid-cols-1
lg:grid-cols-2
gap-6
">


{/* Recent Activity */}

<div className="
bg-white
rounded-2xl
border
border-slate-200
p-6
">


<h3 className="
font-bold
text-lg
text-slate-800
mb-5
">

Recent Activity

</h3>


<div className="space-y-4">


{
[
"New bid created",
"Application approved",
"Result published"
].map((item,index)=>(

<div
key={index}
className="
flex
items-center
gap-3
"
>


<div className="
w-10
h-10
rounded-full
bg-blue-100
text-blue-600
flex
items-center
justify-center
">

<FiCheckCircle/>

</div>


<div>

<p className="
font-medium
text-slate-700
">

{item}

</p>

<p className="
text-xs
text-slate-400
">

2 hours ago

</p>

</div>


</div>

))

}


</div>


</div>





{/* Quick Profile */}

<div className="
bg-gradient-to-br
from-blue-600
to-indigo-700
rounded-2xl
p-6
text-white
">


<h3 className="
text-xl
font-bold
">

View Your Details

</h3>


<p className="
mt-3
text-blue-100
">

Manage your Details. 
</p>

<div className="flex gap-4 flex-col lg:flex-row">

<button

className="
mt-6
bg-white
text-blue-700
px-5
py-2
rounded-xl
font-semibold
hover:bg-blue-50
transition
"

>

<Link href="/dashboard/profile">
Change Profile Details

</Link>
</button>
<button

className="
mt-6
bg-white
text-blue-700
px-5
py-2
rounded-xl
font-semibold
hover:bg-blue-50
transition
"

>

<Link href="/dashboard/organizations">
Change Organization Details

</Link>
</button>

</div>

</div>



</div>



</div>

);

}