
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
import { FaUserShield, FaUserCog } from "react-icons/fa";
import AllRoleUserCount from './components/AllRoleUserCount';
import axios from 'axios';
import UserList from './components/UserList';
import TableLoader from '@/components/adminComponents/TableLoader';


const user = () => {

 const [first, setfirst] = useState("")   
 const [stats, setstatus] = useState("")   
 const [users, setUsers] = useState([])   


       const fetchAllUser = async () => {

        try {

            const {data} = await axios.get(
                "/api/user/users",
                {
                    withCredentials: true,
                }
            );
            setUsers(data?.data)
        } catch(error){

            console.log(
                "Fetch user error:",
                error
            );
        } finally {



        }

    };
// console.log(users)



    useEffect(()=>{

        fetchAllUser();

    },[]);



  return (
    <>
    

 <div className="max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 px-4 sm:px-6 lg:px-8 py-6">
        {/* HEADER */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 flex items-center gap-3">
              <HiOutlineUserGroup className="text-indigo-600 w-8 h-8" />
              User Management
            </h1>
            <p className="text-slate-500 mt-1 text-sm sm:text-base">
              Manage system users and permissions ({stats.total} users)
            </p>
          </div>
          <button
            
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl sm:rounded-2xl font-bold shadow-lg flex items-center gap-2 transition-all hover:scale-105 w-full sm:w-auto justify-center text-sm sm:text-base"
          >
            <HiOutlinePlus className="w-5 h-5" />
            Add New User
          </button>
        </header>

        {/* STATS CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
   
   <AllRoleUserCount></AllRoleUserCount>
        </div>

        {/* FILTER AND SEARCH BAR */}


{Array.isArray(users) ? (
  <>
<Suspense fallback={<TableLoader></TableLoader>}>
  <UserList users={users} />
  
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