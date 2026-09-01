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
import { deleteUser, getParticularUser } from "@/app/(bid)/redux/slices/users/userSlice";

import { useRouter } from 'next/navigation';
import { MdDeleteForever } from "react-icons/md";
import { formatTimeRemaining } from "@/utils/formateTimeRemaining";
import { getParticularUserAppliedBid } from "@/app/(bid)/redux/slices/bids/bidApplicationSlice";





export default function UserDetails({ id }) {


  const applieBidCount = useSelector((state) => state?.bidApplication?.howManyBidThisUserApplied?.totalApplied);  //gives the number of applied bids
  const appliedBidOfAUserInHisProfile = useSelector((state) => state?.bidApplication?.howManyBidThisUserApplied);  //gives the which bids applied
  const appliedBidOfAUserInHisProfileLoading = useSelector((state) => state?.bidApplication?.howManyBidThisUserAppliedLoading);  //loading


// console.log(appliedBidOfAUserInHisProfile?.totalApplied?.length>=1, "appliedBidOfAUserInHisProfile.totalApplied")
// console.log(appliedBidOfAUserInHisProfile, "appliedBidOfAUserInHisProfile")
// console.log(appliedBidOfAUserInHisProfileLoading, "appliedBidOfAUserInHisProfileLoading")

  const isEdit = useSelector((state) => state?.activity?.isEditOpened);    //isEdit popup opened?
  const isDelete = useSelector((state) => state?.activity?.isDeleteOpened);    //isDelete popup opened?
  const dispatch = useDispatch()
    const router = useRouter();
  const baseContentUrl = process.env.NEXT_PUBLIC_BASE_CONTENT_URL;


 


  //FIRST : check if logged in role has permission to view bid or not 
  //FIRST : fetch permissions on mount
  useEffect(() => {
    dispatch(getRolePermissionLoggedInUser({}));
  }, [dispatch]);
  
  const permissionOfLoggedInRoleOfUser = useSelector((state) => state?.roleAndPermission?.permissionOfLoggedInRoleOfUser);
  const loading = useSelector((state) => state.roleAndPermission?.loadingOfGetRolePermission);
  const particularUserLoading = useSelector((state) => state?.users?.particularUserDetsLoading);
  const particularUserDets = useSelector((state) => state?.users?.particularUserDets);

  // console.log(particularUserDets)
  const canDeleteUser = hasPermission(permissionOfLoggedInRoleOfUser, "delete_user");
  const canChangeRole = hasPermission(permissionOfLoggedInRoleOfUser, "change_role");
  const viewUsers = hasPermission(permissionOfLoggedInRoleOfUser, "view_users");
  
  // only "true" once permission data has actually arrived
  const permissionChecked = !loading && !!permissionOfLoggedInRoleOfUser;
  
  useEffect(() => {
    if (!permissionChecked) return;
    if (!viewUsers) {
      router.replace("/forbidden");
    }
  }, [permissionChecked, canDeleteUser, canChangeRole, viewUsers, router]);
  //   check if logged in role has permission to view bid or not END
  
  // SECOND :Fetch only when permission exists
  // SECOND: fetch bids only when access is confirmed
  useEffect(() => {
  if (!permissionChecked || !canDeleteUser || !canChangeRole || !viewUsers) return;
  
    dispatch(getParticularUser({id}));
    dispatch(getParticularUserAppliedBid({userId:id}))
  }, [
    permissionChecked,
    canDeleteUser,
    canChangeRole,
    viewUsers,
    dispatch,
  ]);
  // Fetch only when permission exists END 
  // -----------------------------------------------------


// console.log(particularUserDets?.[0]?.userOrganizations)

  if (particularUserDets.length === 0) {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-6 text-center text-[var(--notFoundTextColor)]  h-screen flex items-center justify-center">
        User data not found
      </div>
    );
  }

  if (!particularUserDets) {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-6 text-center text-[var(--notFoundTextColor)] h-screen flex items-center justify-center">
        User data not found
      </div>
    );
  }
 
  if (loading || particularUserLoading || appliedBidOfAUserInHisProfileLoading) {
    return <div className='bg-[var(--loadingMainBg)] min-h-screen flex items-center justify-center'>
      <TinyLoader></TinyLoader>
    </div>;
  }

if (!permissionChecked) {
  return (
    <div className='bg-[var(--loadingMainBg)] min-h-screen flex items-center justify-center'>
      <TinyLoader />
    </div>
  );
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
      router.push("/dashboard/manage/users");
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
        <EditForm user={particularUserDets?.[0]} id={id}></EditForm>
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
          <div className="w-20 h-20 overflow-hidden rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-3xl font-bold">
            <Image
              unoptimized
              src={baseContentUrl + "/" + particularUserDets?.[0]?.dp}
              alt="dp"
              height={100}
              width={100}
              className="h-full"
            >

            </Image>
          </div>

          <div>
            <h1 className="text-2xl font-semibold text-slate-800">
              {particularUserDets?.[0].name}
            </h1>

            <p className="text-sm text-slate-500 mt-1">
              {particularUserDets?.[0].email}
            </p>

            <span className="inline-flex mt-3 px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-medium">
              {particularUserDets?.[0].roleName}
            </span>
          </div>
        </div>


        <div className="flex items-center gap-3">
          {
            canChangeRole && applieBidCount === 0 && (
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
            canDeleteUser && applieBidCount === 0 && (
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
            value={particularUserDets?.[0].email}
          />
{/* 
          <InfoCard
            icon={<TbGenderBigender />}
            title="Gender"
            value={particularUserDets?.[0].gender}
          />


          <InfoCard
            icon={<TbCalendar />}
            title="Date of Birth"
            value={new Date(particularUserDets?.[0].date_of_birth).toLocaleDateString("en-GB")}
          /> */}


          <InfoCard
            icon={<TbUserShield />}
            title="Role"
            value={particularUserDets?.[0].roleName}
          />


          {/* <InfoCard
            icon={<TbClock />}
            title="Created At"
            // value={new Date(particularUserDets?.[0].created_at).toLocaleDateString("en-GB")}
            value={formatTimeRemaining(particularUserDets?.[0].created_at)}
          /> */}



        </div>
      </div>

{/* ORGANIZATION DETAILS  */}
{
  Array.isArray(particularUserDets?.[0]?.userOrganizations) &&
  particularUserDets?.[0]?.userOrganizations?.map((org, index) => (
    <div
      key={org.orgName}
      className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 mb-5"
    >
    <h2 className="text-lg font-semibold text-slate-800 mb-5">
          Organization Information
        </h2>


      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        <div>
          <label className="block text-sm font-medium text-gray-500">
            Organization Name
          </label>
          <p className="text-gray-900 font-medium">
            {org.orgName || "N/A"}
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-500">
            Owner Name
          </label>
          <p className="text-gray-900 font-medium">
            {org.ownerName || "N/A"}
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-500">
            Contact Person
          </label>
          <p className="text-gray-900 font-medium">
            {org.contactPerson || "N/A"}
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-500">
            Contact Email
          </label>
          <p className="text-gray-900 font-medium">
            {org.contactPersonsEmail || "N/A"}
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-500">
            Contact Phone
          </label>
          <p className="text-gray-900 font-medium">
            {org.contactPersonsPhNo || "N/A"}
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-500">
            PAN Number
          </label>
          <p className="text-gray-900 font-medium">
            {org.panNo || "N/A"}
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-500">
            Phone Number
          </label>
          <p className="text-gray-900 font-medium">
            {org.phnNumber || "N/A"}
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-500">
            VAT Number
          </label>
          <p className="text-gray-900 font-medium">
            {org.vatNo || "N/A"}
          </p>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-500">
            Physical Address
          </label>
          <p className="text-gray-900 font-medium">
            {org.physicalAddress || "N/A"}
          </p>
        </div>

      </div>
    </div>
  ))
}
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