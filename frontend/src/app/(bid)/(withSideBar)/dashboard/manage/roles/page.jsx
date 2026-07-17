
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

import axios from 'axios';
import RoleList from './(components)/RoleList';
import TableLoader from '@/components/adminComponents/TableLoader';
import { useDispatch, useSelector } from 'react-redux';

import { useRouter } from 'next/navigation';
import { getAllRoleWithItsPermission, getRolePermissionLoggedInUser } from "@/app/(bid)/redux/slices/rolesAndPermissionSlice";
import {  hasPermission } from '@/helper/helper';
import TinyLoader from '@/components/reusable/loader/TinyLoader';
import Modal from '@/components/adminComponents/modal/Modal';
import { setIsAddOpened } from '@/app/(bid)/redux/slices/activitySlice';
import AddRoleForm from './(components)/AddRoleForm';
import { FiBarChart2 } from 'react-icons/fi';
import { FaUserEdit } from 'react-icons/fa';



const Roless = () => {
  const router = useRouter();
 const [users, setUsers] = useState([])  

   const dispatch = useDispatch();
   //-- it will have all permission of loggedInuser in array

const permissionOfLoggedInRoleOfUser = useSelector((state) => state?.roleAndPermission?.permissionOfLoggedInRoleOfUser);   
const loading  = useSelector((state) => state.roleAndPermission?.loadingOfGetRolePermission);
const loadingGetAllRoleWithPermission  = useSelector((state) => state.roleAndPermission?.loadingGetAllRoleWithPermission);
// console.log(permissionOfLoggedInRoleOfUser)

  const isAddOpened = useSelector((state) => state?.activity?.isAddOpened);    //isEdit popup opened?
    

    const allRoleWithPermission = useSelector((state) => state?.roleAndPermission?.RoleWithItsPermission);
    // console.log(allRoleWithPermission)
    



//FIRST : check if logged in role has permission to view bid or not 
//FIRST : fetch permissions on mount
useEffect(() => {
  dispatch(getRolePermissionLoggedInUser({}));
}, [dispatch]);

const canViewRole = hasPermission(permissionOfLoggedInRoleOfUser, "view_role");
const canCreateRole = hasPermission(permissionOfLoggedInRoleOfUser, "create_role");
const isThisRoleHasViewRolePermission = hasPermission(permissionOfLoggedInRoleOfUser, "view_Permission");

// only "true" once permission data has actually arrived
const permissionChecked = !loading && !!permissionOfLoggedInRoleOfUser;


useEffect(() => {
  if (!permissionChecked) return;
  if (!canViewRole) {
    router.replace("/forbidden");
  }
}, [permissionChecked, canViewRole, router]);
//   check if logged in role has permission to view bid or not END

// SECOND :Fetch only when permission exists
// SECOND: fetch bids only when access is confirmed
useEffect(() => {
  if (!permissionChecked || !canViewRole) return;

    dispatch(getAllRoleWithItsPermission({}));
}, [
  permissionChecked,
  canViewRole,
  canCreateRole,
  dispatch,
]);
// Fetch only when permission exists END 
// -----------------------------------------------------


useEffect(() => {
  if (!permissionChecked) return;

  if (!canViewRole) {
    router.replace("/forbidden");
  }
}, [permissionChecked, canViewRole, router]);


// if loading show loader 
if (loadingGetAllRoleWithPermission) {
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
if (loading || !permissionChecked) {
  return (
    <div className="bg-[var(--loadingMainBg)] min-h-screen flex items-center justify-center">
      <TinyLoader />
    </div>
  );
}

// Wait while redirecting
if (!canViewRole) {
  return (
    <div className="bg-[var(--loadingMainBg)] min-h-screen flex items-center justify-center">
      <TinyLoader />
    </div>
  );
}


  return (
    <>
    

 <div className="mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 px-4 sm:px-6 lg:px-8 py-6">
      <Modal
        isModalOpen={isAddOpened}
        onClose={() => dispatch(setIsAddOpened(false))}
        icon={<FaUserEdit />}
        // title="Update Details"
        // description="You can Only Update Role of a User."
      >
        <AddRoleForm></AddRoleForm>
      </Modal>

        {/* HEADER */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 flex items-center gap-3">
              <HiOutlineUserGroup className="text-indigo-600 w-8 h-8" />
              Role Management
            </h1>
            <p className="text-slate-500 mt-1 text-sm sm:text-base">
              Manage Role here 
            </p>
          </div>
      
          {
            canCreateRole &&     
            <button
            onClick={()=>dispatch(setIsAddOpened(true))}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl sm:rounded-2xl font-bold shadow-lg flex items-center gap-2 transition-all hover:scale-105 w-full sm:w-auto justify-center text-sm sm:text-base"
          >
            <HiOutlinePlus className="w-5 h-5" />
            Add New Role
          </button>
          }
        </header>

        {/* FILTER AND SEARCH BAR */}

 
{Array.isArray(allRoleWithPermission) ? (
  <>
<Suspense fallback={<TableLoader></TableLoader>}>
<RoleList roles={allRoleWithPermission} isThisRoleHasViewRolePermission={isThisRoleHasViewRolePermission}></RoleList>
  
</Suspense>
  </>
) : (
  <p>No users found</p>
)}


 
           
                </div>

    </>
  )
}

export default Roless