"use client";

import { getRolePermissionLoggedInUser } from "@/app/(bid)/redux/slices/rolesAndPermissionSlice";
import { getLoggedInUserBasicInfo, updateLoggedInUserDP } from "@/app/(bid)/redux/slices/users/userSlice";
import { formatDate } from "@/utils/formatDate";
import React, { Suspense, useEffect, useState } from "react";
import { BsCalendarDateFill } from "react-icons/bs";
import { FiChevronDown, FiCamera, FiEdit2, FiMail, FiShield, FiUser, FiBarChart2 } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import ProfileLoader from "../components/ProfileLoader";
import TinyLoader from "@/components/reusable/loader/TinyLoader";
import Image from "next/image";
import Modal from "@/components/adminComponents/modal/Modal";
import BasicDetails from "./form/BasicDetails";

const ProfilePage = () => {
  const [permissionOpen, setPermissionOpen] = useState(false);
  const [isChangingImage, setIsChangingImage] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
const [selectedImage, setSelectedImage] = useState(null);


// console.log(process.env.NEXT_PUBLIC_BASE_CONTENT_URL)




  const dispatch=useDispatch();


const handleImageChange = (e) => {
  const file = e.target.files[0];

  if (!file) return;

  setSelectedImage(file);              // actual File object
  setImagePreview(URL.createObjectURL(file)); // preview
};
const handleImageSubmit = () => {
  const formData = new FormData();

  formData.append("dp", selectedImage);
dispatch(updateLoggedInUserDP({ formData }));
};

//   BASIC DATA OF USER GETTING 
  const userBasicData = useSelector((state) => state?.users?.loggedInUserBasicData);  //LoggedIn user basic ddata 
  const loggedInUserBasicDataLoading = useSelector((state) => state?.users?.loggedInUserBasicDataLoading);  //LoggedIn user basic ddata Loading
    const updateLoggedInUserDPLoading = useSelector((state) => state.users.updateLoggedInUserDPLoading);  //loading of when user change DP
  
//   calling apis of get user basic detals  | email, name, etc
useEffect(() => {
    dispatch(getLoggedInUserBasicInfo({}))
}, [])
//   BASIC DATA OF USER GETTING  END
  

// GETTING LOGED IN ROLE PERMISION 
  const loggedInRolePermission = useSelector((state) => state?.roleAndPermission?.permissionOfLoggedInRoleOfUser);  //Get logged in user all permission  
  const loadingOfGetRolePermission = useSelector((state) => state?.roleAndPermission?.loadingOfGetRolePermission);  //Loading state of permissson get for role
const [hasFetched, setHasFetched] = useState(false);

useEffect(() => {
  if (permissionOpen && !hasFetched) {
    dispatch(getRolePermissionLoggedInUser({}));
    setHasFetched(true);
  }
}, [permissionOpen, hasFetched, dispatch]);
// GETTING LOGED IN ROLE PERMISION END




if (loadingOfGetRolePermission || loggedInUserBasicDataLoading || updateLoggedInUserDPLoading) {
  return <div className='bg-[var(--loadingMainBg)] min-h-screen flex items-center justify-center'>
   <TinyLoader></TinyLoader>
  </div>;
}

  return (
<div className=" p-2 transition-all w-full " style={{ background: "var(--pageBg,#f8fafc)" }}> 
   



    <Suspense fallback={<ProfileLoader></ProfileLoader>}>
    <div>

      <div className=" mx-auto space-y-6">

        {/* HEADER */}
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl sm:text-3xl font-bold" style={{ color: "var(--blackText)" }}>
            My Profile
          </h1>
          <p className="text-sm" style={{ color: "var(--notFoundTextColor)" }}>
            Manage your account information and permissions
          </p>
        </div>


        {/* BASIC INFORMATION */}
        <div className="rounded-2xl shadow-sm border p-5 sm:p-7" style={{ background: "var(--whiteBg)", borderColor:"#e5e7eb" }}>

          <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">

            <div>
              <h2 className="text-xl font-bold" style={{ color:"var(--blackText)" }}>
                Basic Information
              </h2>

              <p className="text-sm mt-1" style={{ color:"var(--greyText)" }}>
                Your personal account information
              </p>
            </div>

{/* 
            <button
              // onClick={() => setisUserBasicDetailsUpdatePopouOpened(true)}
              className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white"
              style={{ background:"var(--addBtnBg)" }}
            >
              <FiEdit2 size={15}/>
              Update Basic Information
            </button> */}

          </div>



          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">


            {/* PROFILE IMAGE */}

            <div className="flex flex-col items-center gap-3">

              <div className="relative">

           <Image
  alt="your Avatar"
  src={
    imagePreview 
      ? imagePreview 
      : `${process.env.NEXT_PUBLIC_BASE_CONTENT_URL}/${userBasicData?.[0]?.dp}`
  }
  width={80}
  height={80}
  unoptimized
  className="w-32 h-32 rounded-full object-cover border-4"
/>

                <div
                  className="absolute bottom-1 right-1 w-9 h-9 rounded-full flex items-center justify-center text-white"
                  style={{ background:"var(--adminPrimaryColor)" }}
                >
                  <FiCamera/>
                </div>

              </div>


              <button
                onClick={() => setIsChangingImage(!isChangingImage)}
                className="px-4 py-2 rounded-lg text-sm font-semibold"
                style={{ background:"var(--iconBgColro)", color:"var(--iconColor)" }}
              >
                Change Profile Image
              </button>


            </div>




            {/*BASIC  DETAILS */}
            <BasicDetails   userBasicData={userBasicData}></BasicDetails>

          </div>



          {/* IMAGE CHANGE FORM */}

          {isChangingImage && (

            <div className="mt-6 p-4 rounded-xl border" style={{borderColor:"#e5e7eb"}}>

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="block w-full text-sm"
              />


              {imagePreview && (

                <button
                  onClick={handleImageSubmit}
                  className="mt-4 px-5 py-2 rounded-lg text-white font-semibold"
                  style={{background:"var(--addBtnBg)"}}
                >
                  Submit Image
                </button>

              )}

            </div>

          )}



        </div>





        {/* PERMISSION ACCORDION */}

        <div className="rounded-2xl shadow-sm border overflow-hidden" style={{background:"var(--whiteBg)",borderColor:"#e5e7eb"}}>
{/* 

          <button
            onClick={() => setPermissionOpen(!permissionOpen)}
            className="w-full flex justify-between items-center p-5 font-semibold"
            style={{color:"var(--blackText)"}}
          >

            <span>
              My Permissions
            </span>


            <FiChevronDown className={`${permissionOpen ? "rotate-180" : ""} transition-transform`} />

          </button> */}




          {permissionOpen && (

            <div className="p-5 border-t" style={{borderColor:"#e5e7eb"}}>


              <div className="flex flex-wrap gap-3">


                {loggedInRolePermission?.map((permission,index)=>(

                  <div
                    key={index}
                    className="px-4 py-2 rounded-full text-sm font-medium"
                    style={{background:"var(--iconBgColro)",color:"var(--iconColor)"}}
                  >

                    {permission?.permissionName}

                  </div>

                ))}


              </div>


            </div>

          )}


        </div>



      </div>

    </div>
</Suspense>


</div>

  );
};


export default ProfilePage;