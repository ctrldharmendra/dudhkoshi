"use client";

import { useEffect, useState } from "react";
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
import Modal from "./modal/Modal";
import { MdDeleteForever } from "react-icons/md";
import { CiLogin } from "react-icons/ci";
import TinyLoader from "../reusable/loader/TinyLoader";
import axiosInstance from "@/lib/axiosInstance";
import { RiAuctionFill } from "react-icons/ri";
import { hasPermission } from "@/helper/helper";
import { useDispatch, useSelector } from "react-redux";
import { getRolePermissionLoggedInUser } from "@/app/(bid)/redux/slices/rolesAndPermissionSlice";






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


// logout popup state 
const [isLogoutPopupOpened, setisLogoutPopupOpened] = useState(false)


const [logOutLoading, setLogOutLoading] = useState(false);

// PERMISSION 
const dispatch = useDispatch();
   //FIRST : check if logged in role has permission to view bid or not 
          //FIRST : fetch permissions on mount
          useEffect(() => {
            dispatch(getRolePermissionLoggedInUser({}));
          }, [dispatch]);
          
          const permissionOfLoggedInRoleOfUser = useSelector((state) => state?.roleAndPermission?.permissionOfLoggedInRoleOfUser);
          const loadingOfGetRolePermission = useSelector((state) => state.roleAndPermission?.loadingOfGetRolePermission);
          
          
          // only "true" once permission data has actually arrived
          const permissionChecked = !loadingOfGetRolePermission && !!permissionOfLoggedInRoleOfUser;

          const permissions = {
  viewUsers: hasPermission(permissionOfLoggedInRoleOfUser, "view_users"),
  inviteUsers: hasPermission(permissionOfLoggedInRoleOfUser, "create_user"),

  viewRoles: hasPermission(permissionOfLoggedInRoleOfUser, "view_role"),
  viewPermissions: hasPermission(permissionOfLoggedInRoleOfUser, "view_Permission"),

  createBids: hasPermission(permissionOfLoggedInRoleOfUser, "create_bid"),
  applyBid: hasPermission(permissionOfLoggedInRoleOfUser, "apply_bid"),
};
           
          useEffect(() => {
            if (!permissionChecked) return;
            // if (!viewUsers) {
            //   // router.replace("/forbidden");
            //   console.log("No Permission")
            // }
          }, [permissionChecked]);
          //   check if logged in role has permission to view bid or not END
// PERMISSION END


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
      permissions.viewUsers && {
        title: "Manage Users",
        path: "/dashboard/manage/users",
      },

      permissions.inviteUsers && {
        title: "Invite To",
        path: "/dashboard/manage/invite",
      },
    ].filter(Boolean),
  },

  {
    title: "Roles",
    icon: SiCriticalrole,
    children: [
      permissions.viewRoles && {
        title: "Roles",
        path: "/dashboard/manage/roles",
      },
    ].filter(Boolean),
  },

  {
    title: "Permissions",
    icon: GrUserAdmin,
    children: [
      permissions.viewPermissions && {
        title: "Permissions",
        path: "/dashboard/manage/permissions",
      },
    ].filter(Boolean),
  },

  {
    title: "Bids",
    icon: RiAuctionFill,
    children: [
      permissions.createBids && {
        title: "Bids Form",
        path: "/dashboard/manage/bids",
      },

      permissions.applyBid && {
        title: "Apply For a Bid",
        path: "/dashboard/manage/bids/apply",
      },
       {
        title:"Your Applied Bids",
        path:"/dashboard/manage/bids/applied"
      }
    ].filter(Boolean),
  },
    {
    title: "Landing Page Contents",
    icon: GrUserAdmin,
    children: [
      permissions.viewPermissions && {
        title: "Hero Section",
        path: "/admin/hero",
      },
      permissions.viewPermissions && {
        title: "Hero Cards Section",
        path: "/admin/herocards",
      },
      permissions.viewPermissions && {
        title: "About Us Section",
        path: "/admin/about",
      },
      permissions.viewPermissions && {
        title: "Team Section",
        path: "/admin/team",
      },
    ].filter(Boolean),
  },
].filter(item => !item.children || item.children.length > 0);

const handleLogout = async () => {
  try {
    setLogOutLoading(true);

  const { data } = await axiosInstance.post(`/api/auth/logout`);


    if (!data.success == true) {
      throw new Error(data?.message || "Logout failed");
    }


    // redirect after logout
    window.location.href = "/login";

  } catch (error) {
    console.error("Logout error:", error.message);

  } finally {
    setLogOutLoading(false);
  }
};


if (logOutLoading) {
  return (
    <div className="bg-[var(--loadingMainBg)] min-h-screen flex items-center justify-center">
      <TinyLoader />
    </div>
  );
}


// permission loading 
if (loadingOfGetRolePermission) {
  return <div className='bg-[var(--loadingMainBg)] min-h-screen flex items-center justify-center'>
   <TinyLoader></TinyLoader>
  </div>;
}
if (!permissionChecked) {
  return (
    <div className="bg-[var(--loadingMainBg)] min-h-screen flex items-center justify-center">
      <TinyLoader />
    </div>
  );
}



// permission loading end

  return (

    <>
      <Modal
        isModalOpen={isLogoutPopupOpened}
        onClose={() => setisLogoutPopupOpened(false)}
        icon={<CiLogin />}
        title="Are You Sure?"
        description="Are You Sure to Log out?"
      >

<div className="flex justify-center gap-[45px]">
     <button onClick={()=>setisLogoutPopupOpened(false)} type="button" className="px-6 py-2 active:scale-95 transition bg-[var(--deleteIconColor)] rounded text-[var(--whiteText)] text-sm font-medium">No</button>
       <button onClick={()=> handleLogout()} type="button" className="px-6 py-2 active:scale-95 transition bg-[var(--addBtnBg)] rounded text-[var(--whiteText)] text-sm font-medium">Yes</button>
</div>

      </Modal>

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

className={` fixed top-0 left-0 h-screen bg-slate-900 text-white z-50 transition-all duration-300 ease-in-out ${collapsed ? "w-20":"w-72"} ${mobileOpen  ? "translate-x-0" :"-translate-x-full lg:translate-x-0"}`}

>

{/* Header */}

<div
className=" h-20 flex items-center justify-between px-5 border-b border-slate-700">
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

className=" hidden lg:block hover:bg-slate-800 p-2 rounded-lg ">{
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
<span onClick={()=>setisLogoutPopupOpened(true)} >
Logout
</span>
}


</button>


</div>



</aside>


</>

  );
}