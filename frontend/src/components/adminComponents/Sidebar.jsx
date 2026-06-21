"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  FiHome,
  FiUsers,
  FiFileText,
  FiSettings,
  FiLogOut,
  FiMenu,
  FiX,
  FiChevronDown,
  FiChevronLeft,
  FiChevronRight,
  FiBarChart2,
  FiFolder,
  FiBell,
} from "react-icons/fi";
import { SiCriticalrole } from "react-icons/si";
import { GrUserAdmin } from "react-icons/gr";
import { FaUserCheck } from "react-icons/fa";




const menuItems = [

  {
    title: "Dashboard",
    icon: FiHome,
    path: "/dashboard",
  },


  {
    title: "Users",
    icon: FaUserCheck,
    children: [
      {
        title:"View Users",
        path:"/users/bids"
      },
      {
        title:"Manage Users",
        path:"/dashboard/manage/user"
      },
    ]
  },
  {
    title: "Roles",
    icon: SiCriticalrole,
    children: [
      {
        title:"view Roles",
        path:"/dashboard/bids"
      },
      {
        title:"Create Roles",
        path:"/dashboard/bids/create"
      },
    ]
  },
  {
    title: "Permission",
    icon: GrUserAdmin,
    children: [
      {
        title:"view Permission",
        path:"/dashboard/bids"
      },
      {
        title:"Manage Permission",
        path:"/dashboard/bids/create"
      },
    ]
  },


  {
    title:"Applications",
    icon:FiFileText,
    children:[
      {
        title:"All Applications",
        path:"/dashboard/applications"
      },
      {
        title:"Pending",
        path:"/dashboard/applications/pending"
      }
    ]
  },


  {
    title:"Users",
    icon:FiUsers,
    path:"/dashboard/users"
  },


  {
    title:"Reports",
    icon:FiBarChart2,
    path:"/dashboard/reports"
  },


  {
    title:"Notifications",
    icon:FiBell,
    path:"/dashboard/notifications"
  },


  {
    title:"Settings",
    icon:FiSettings,
    path:"/dashboard/settings"
  },

];




export default function Sidebar(){

  const pathname = usePathname();


  const [collapsed,setCollapsed] = useState(false);

  const [mobileOpen,setMobileOpen] = useState(false);


  const [openMenus,setOpenMenus] = useState({});



  const toggleMenu=(title)=>{

    setOpenMenus(prev=>({
      ...prev,
      [title]:!prev[title]
    }));

  };



  return (

    <>


{/* Mobile button */}

<button
onClick={()=>setMobileOpen(true)}
className="
lg:hidden
fixed
top-4
left-4
z-50
bg-slate-900
text-white
p-2
rounded-lg
shadow
"
>

<FiMenu size={22}/>

</button>



{/* Overlay */}

{
mobileOpen && (

<div
onClick={()=>setMobileOpen(false)}
className="
fixed
inset-0
bg-black/40
z-40
lg:hidden
"
/>

)

}




<aside

className={`
fixed
top-0
left-0
h-screen
bg-slate-900
text-white
z-50
transition-all
duration-300
ease-in-out

${collapsed ? "w-20":"w-72"}

${mobileOpen 
? "translate-x-0"
:"-translate-x-full lg:translate-x-0"
}

`}

>

{/* Header */}

<div
className="
h-20
flex
items-center
justify-between
px-5
border-b
border-slate-700
"
>


{
!collapsed &&
<div>

<h1 className="text-xl font-bold">
Dudhkoshi
</h1>

<p className="text-xs text-slate-400">
Hydro Dashboard
</p>

</div>
}



<button

onClick={()=>setCollapsed(!collapsed)}

className="
hidden
lg:block
hover:bg-slate-800
p-2
rounded-lg
"

>

{
collapsed
?
<FiChevronRight/>
:
<FiChevronLeft/>
}

</button>



<button

onClick={()=>setMobileOpen(false)}

className="
lg:hidden
hover:bg-slate-800
p-2
rounded-lg
"

>

<FiX/>

</button>



</div>





{/* Menu */}

<div
className="
px-3
py-5
space-y-2
overflow-y-auto
h-[calc(100vh-160px)]
"
>


{
menuItems.map((item, i)=>{


const Icon=item.icon;


const active =
item.path === pathname;



return (

<div key={i}>


{/* Parent */}

{
item.children ? (

<button

onClick={()=>toggleMenu(item.title)}

className={`
w-full
flex
items-center
gap-4
px-3
py-3
rounded-xl
transition

hover:bg-slate-800

${collapsed && "justify-center"}

`}

>


<Icon size={21}/>


{
!collapsed &&
<>
<span className="flex-1 text-left">
{item.title}
</span>


<FiChevronDown

className={`
transition-transform

${openMenus[item.title] 
?"rotate-180"
:""}
`}

/>

</>

}



</button>

)


:

(

<Link

href={item.path}

onClick={()=>setMobileOpen(false)}

className={`
flex
items-center
gap-4
px-3
py-3
rounded-xl
transition

${active
?
"bg-blue-600 text-white"
:
"hover:bg-slate-800 text-slate-300"
}


${collapsed && "justify-center"}

`}
>


<Icon size={21}/>


{
!collapsed &&
<span>
{item.title}
</span>
}


</Link>


)

}





{/* Children */}

{

item.children && openMenus[item.title] && !collapsed && (

<div
className="
ml-10
mt-2
space-y-1
animate-in
fade-in
"
>

{
item.children.map(child=>(


<Link

key={child.path}

href={child.path}

className={`
block
px-3
py-2
rounded-lg
text-sm

transition

${
pathname===child.path
?
"bg-blue-500 text-white"
:
"text-slate-400 hover:text-white hover:bg-slate-800"
}

`}

>

{child.title}

</Link>


))

}

</div>

)

}



</div>


)

})

}


</div>





{/* Bottom */}

<div

className="
absolute
bottom-0
left-0
right-0
p-4
border-t
border-slate-700
"

>

<button

className="
flex
items-center
gap-4
w-full
px-3
py-3
rounded-xl
text-red-400
hover:bg-slate-800
"

>

<FiLogOut size={20}/>

{
!collapsed &&
<span>
Logout
</span>
}


</button>


</div>



</aside>


</>

  );
}