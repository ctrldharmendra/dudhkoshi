"use client";

import { useDispatch, useSelector } from "react-redux";
import {
  TbEdit,
  TbTrash,
  TbMail,
  TbCalendar,
  TbGenderBigender,
  TbUserShield,
  TbClock,
} from "react-icons/tb";
import Link from "next/link";
import Image from "next/image";

import { getRolePermissionLoggedInUser } from "@/app/(bid)/redux/slices/rolesAndPermissionSlice";
import { useEffect, useState } from "react";
import Modal from "@/components/adminComponents/modal/Modal";
import { FiBarChart2 } from "react-icons/fi";
import EditForm from "./EditForm";
import { setIsDeleteOpened, setIsEditOpened } from "@/app/(bid)/redux/slices/activitySlice";
import { hasPermission } from "@/helper/helper";
import TinyLoader from "@/components/reusable/loader/TinyLoader";
import { deleteUser } from "@/app/(bid)/redux/slices/users/userSlice";

import { useRouter } from 'next/navigation';
import { MdDeleteForever } from "react-icons/md";





export default function UserDetails({ id }) {


  const user = useSelector((state) => state.userState.selectedUser);  //selectedUser object
  const isEdit = useSelector((state) => state?.activity?.isEditOpened);    //isEdit popup opened?
  const isDelete = useSelector((state) => state?.activity?.isDeleteOpened);    //isDelete popup opened?
  const dispatch = useDispatch()
    const router = useRouter();
  const baseContentUrl = process.env.NEXT_PUBLIC_BASE_CONTENT_URL;



  // check if logged In user has : edit_role, delete_role permission  || permission in array
  useEffect(() => {
    dispatch(getRolePermissionLoggedInUser({}))
  }, []);
  const loading = useSelector((state) => state?.roleAndPermission?.loadingOfGetRolePermission);
  const permissionOfLoggedInRoleOfUser = useSelector((state) => state?.roleAndPermission?.permissionOfLoggedInRoleOfUser);
  const isThisRoleHasChangeRolePermission = hasPermission(permissionOfLoggedInRoleOfUser, "change_role");
  const isThisRoleHasDeleteUserPermission = hasPermission(permissionOfLoggedInRoleOfUser, "delete_role");
 



  if (Object.keys(user).length === 0) {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-6 text-center text-[var(--notFoundTextColor)]  h-screen flex items-center justify-center">
        User data not found
      </div>
    );
  }

  if (!user) {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-6 text-center text-[var(--notFoundTextColor)] h-screen flex items-center justify-center">
        User data not found
      </div>
    );
  }

  if (loading) {
    return <div className='bg-[var(--loadingMainBg)] min-h-screen flex items-center justify-center'>
      <TinyLoader></TinyLoader>
    </div>;
  }

  // when click on edit 
  const handleEdit = () => {
    dispatch(setIsEditOpened(true));
  };
  // when click on delete popup ko "yes"
  const handleDelete = async () => {
        const result = await dispatch(
      deleteUser({ id })
    );

    if (deleteUser.fulfilled.match(result)) {
      router.push("/dashboard/manage/user");
    }
  }

  return (
    <div className="space-y-6">

      {/* POPUP  */}
      {/* edit  */}
      <Modal
        isModalOpen={isEdit}
        onClose={() => dispatch(setIsEditOpened(false))}
        icon={<FiBarChart2 />}
        title="Update Details"
        description="You can Only Update Role of a User."
      >
        <EditForm user={user} id={id}></EditForm>
      </Modal>
      {/* delete  */}
      <Modal
        isModalOpen={isDelete}
        onClose={() => dispatch(setIsDeleteOpened(false))}
        icon={<MdDeleteForever />}
        title="Are You Sure?"
        description="Are You Sure to Perform this Deletion?"
      >

<div className="flex justify-center gap-[45px]">
     <button onClick={()=>dispatch(setIsDeleteOpened(false))} type="button" className="px-6 py-2 active:scale-95 transition bg-[var(--deleteIconColor)] rounded text-[var(--whiteText)] text-sm font-medium">No</button>
       <button onClick={()=> handleDelete()} type="button" className="px-6 py-2 active:scale-95 transition bg-[var(--addBtnBg)] rounded text-[var(--whiteText)] text-sm font-medium">Yes</button>
</div>

      </Modal>
      {/* POPUP  END*/}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 flex flex-col md:flex-row justify-between gap-5">


        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-3xl font-bold">
            <Image
              unoptimized
              src={baseContentUrl + "/" + user?.dp}
              alt="dp"
              height={100}
              width={100}
            >

            </Image>
          </div>

          <div>
            <h1 className="text-2xl font-semibold text-slate-800">
              {user.name}
            </h1>

            <p className="text-sm text-slate-500 mt-1">
              {user.email}
            </p>

            <span className="inline-flex mt-3 px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-medium">
              {user.roleName}
            </span>
          </div>
        </div>


        <div className="flex items-center gap-3">
          {
            isThisRoleHasChangeRolePermission && (
          <button
  onClick={() => dispatch(setIsEditOpened(true))}
  className="flex items-center cursor-pointer gap-2 px-4 py-2 rounded-lg bg-[var(--addBtnBg)] text-white hover:bg-[var(--addBtnBgHover)] transition"
>
  <TbEdit size={18} />
  Edit
</button>

            )
          }

          {
            isThisRoleHasDeleteUserPermission && (
              <button
                onClick={() => dispatch(setIsDeleteOpened(true))}
                className="flex items-center gap-2 px-4 py-2 cursor-pointer rounded-lg bg-[var(--deleteIconBg)] text-[var(--deleteIconColor)] hover:bg-[var(--deleteIconBgHOver)] transition"
              >
                <TbTrash size={18} />
                Delete
              </button>
            )
          }

        </div>
      </div>



      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-slate-800 mb-5">
          User Information
        </h2>


        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          <InfoCard
            icon={<TbMail />}
            title="Email"
            value={user.email}
          />

          <InfoCard
            icon={<TbGenderBigender />}
            title="Gender"
            value={user.gender}
          />


          <InfoCard
            icon={<TbCalendar />}
            title="Date of Birth"
            value={new Date(user.date_of_birth).toLocaleDateString("en-GB")}
          />


          <InfoCard
            icon={<TbUserShield />}
            title="Role"
            value={user.roleName}
          />


          <InfoCard
            icon={<TbClock />}
            title="Created At"
            value={new Date(user.created_at).toLocaleDateString("en-GB")}
          />

        </div>
      </div>
    </div>
  );
}



function InfoCard({ icon, title, value }) {
  return (
    <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">

      <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center text-xl">
        {icon}
      </div>


      <div>
        <p className="text-xs text-slate-500">
          {title}
        </p>

        <p className="font-medium text-slate-800 mt-1">
          {value || "N/A"}
        </p>
      </div>

    </div>
  );
}