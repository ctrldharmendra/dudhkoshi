
"use client"
import React, { Suspense, useEffect, useState } from 'react'

import {
  HiOutlineUserGroup,
  HiOutlinePlus,
  HiOutlineTrash,
  HiOutlineUser,
  HiOutlineMail,
  HiOutlinePhone,

  HiOutlineRefresh,
} from "react-icons/hi";
import AllRoleUserCount from './components/AllRoleUserCount';
import axios from 'axios';
import UserList from './components/UserList';
import TableLoader from '@/components/adminComponents/TableLoader';
import { useDispatch, useSelector } from 'react-redux';

import { useRouter } from 'next/navigation';
import { getRolePermissionLoggedInUser } from "@/app/(bid)/redux/slices/rolesAndPermissionSlice";
import {  hasPermission } from '@/helper/helper';
import TinyLoader from '@/components/reusable/loader/TinyLoader';
import { setIsAddOpened } from '@/app/(bid)/redux/slices/activitySlice';
import Modal from '@/components/adminComponents/modal/Modal';
import { FaUserEdit } from 'react-icons/fa';
import AddUser from './components/AddUser';



const user = () => {
  const router = useRouter();
 const [users, setUsers] = useState([])  

   const dispatch = useDispatch();
   //-- it will have all permission of loggedInuser in array

const permissionOfLoggedInRoleOfUser = useSelector((state) => state?.roleAndPermission?.permissionOfLoggedInRoleOfUser);   
const { loadingOfGetRolePermission } = useSelector((state) => state.roleAndPermission);
// console.log(permissionOfLoggedInRoleOfUser)

  const isAddOpened = useSelector((state) => state?.activity?.isAddOpened);    //isEdit popup opened?


  

  // fetch all user function 
     const fetchAllUser = async () => {

        try {

            const {data} = await axios.get(
                "/api/user/users",
                {
                    withCredentials: true,
                }
            );
            // console.log(data?.data, "api")
            setUsers(data?.data)
        } catch(error){

            console.log(
                "Fetch user error:",
                error
            );
        } finally {



        }

    };



// | run permission to check logged in user has permission to : view_user, create_user or not
    useEffect(()=>{
      dispatch(getRolePermissionLoggedInUser({}))
    },[]);

    // check if logged In user has : crete_user permission or not
    const isThisRoleHasAddUserPermission = hasPermission(permissionOfLoggedInRoleOfUser,"create_user");
    

  // if no view permission then redirect || DONT CALL GET USER API 
useEffect(() => {
  if (loadingOfGetRolePermission) return;

  if (!permissionOfLoggedInRoleOfUser) return;

  const canViewUsers = hasPermission(
    permissionOfLoggedInRoleOfUser,
    "view_users"
  );

  if (!canViewUsers) {
    router.replace("/forbidden");
    return;
  }

  fetchAllUser();
}, [loadingOfGetRolePermission, permissionOfLoggedInRoleOfUser, router]);


// if loading show loader 
if (loadingOfGetRolePermission) {
  return <div className='bg-[var(--loadingMainBg)] min-h-screen flex items-center justify-center'>
   <TinyLoader></TinyLoader>
  </div>;
}


  return (
    <>
    

 <div className=" mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 px-4 sm:px-6 lg:px-8 py-6">

      <Modal
        isModalOpen={isAddOpened}
        onClose={() => dispatch(setIsAddOpened(false))}
        icon={<FaUserEdit />}
        // title="Update Details"
        // description="You can Only Update Role of a User."
      >
        <AddUser></AddUser>
      </Modal>

        {/* HEADER */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-1">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 flex items-center gap-3">
              <HiOutlineUserGroup className="text-indigo-600 w-8 h-8" />
              User Management
            </h1>
            <p className="text-slate-500 mt-1 text-sm sm:text-base">
              Manage system users and permissions 
            </p>
          </div>
      
          {
            isThisRoleHasAddUserPermission &&     <button
                      onClick={()=>dispatch(setIsAddOpened(true))}
            
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl sm:rounded-2xl font-bold shadow-lg flex items-center gap-2 transition-all hover:scale-105 w-full sm:w-auto justify-center text-sm sm:text-base"
          >
            <HiOutlinePlus className="w-5 h-5" />
            Add New User
          </button>
          }
        </header>

        {/* STATS CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-2">
   
   <AllRoleUserCount users={users}></AllRoleUserCount>
        </div>

        {/* FILTER AND SEARCH BAR */}


{Array.isArray(users) ? (
  <>
<Suspense fallback={<TableLoader></TableLoader>}>
  <UserList users={users}/>
  
</Suspense>
  </>
) : (
  <p>No users found</p>
)}


 
           
                </div>

    </>
  )
}

export default user