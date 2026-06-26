"use client";

import { getRolePermissionLoggedInUser } from "@/app/(bid)/redux/slices/rolesAndPermissionSlice";
import { getLoggedInUserBasicInfo } from "@/app/(bid)/redux/slices/users/userSlice";
import { formatDate } from "@/utils/formatDate";
import React, { Suspense, useEffect, useState } from "react";
import { BsCalendarDateFill } from "react-icons/bs";
import { FiChevronDown, FiCamera, FiEdit2, FiMail, FiShield, FiUser } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import ProfileLoader from "../components/ProfileLoader";
import TinyLoader from "@/components/reusable/loader/TinyLoader";
import Image from "next/image";

const ProfilePage = () => {
  const [permissionOpen, setPermissionOpen] = useState(false);
  const [isChangingImage, setIsChangingImage] = useState(false);
  const [isEditingBasic, setIsEditingBasic] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);






  const dispatch=useDispatch();

  const user = {
    name: "John Doe",
    email: "john.doe@gmail.com",
    role: "Administrator",
    image: "https://i.pravatar.cc/150?img=12",
  };

  const permissions = [
    "view_users",
    "delete_user",
    "view_role",
    "delete_role",
    "add_permission",
    "create_invite",
    "bid_view",
  ];

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleImageSubmit = () => {
    console.log(imagePreview);
  };

//   BASIC DATA OF USER GETTING 
  const userBasicData = useSelector((state) => state?.users?.loggedInUserBasicData);  //LoggedIn user basic ddata 
  const loggedInUserBasicDataLoading = useSelector((state) => state?.users?.loggedInUserBasicDataLoading);  //LoggedIn user basic ddata Loading
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


// ORGANIZATION DATA | SHOWING LOGIC 
const [organizationOpen, setOrganizationOpen] = useState(false);

const organization = {
  orgName: "Everest IT Solutions Pvt. Ltd.",
  ownerName: "Ram Bahadur Shrestha",
  phnNumber: "+977-9812345678",
  panNo: "PAN-9845123",
  vatNo: "VAT-7845123",
  contactPerson: "Sita Karki",
  contactPersonsPhNo: "+977-9856781234",
  contactPersonsEmail: "sita@everestit.com",
  physicalAddress: "New Baneshwor, Kathmandu, Nepal",
};
// ORGANIZATION DATA | SHOWING LOGIC END




if (loadingOfGetRolePermission || loggedInUserBasicDataLoading) {
  return <div className='bg-[var(--loadingMainBg)] min-h-screen flex items-center justify-center'>
   <TinyLoader></TinyLoader>
  </div>;
}

  return (
<div className="max-w-6xl mx-auto  p-4 sm:p-6 lg:p-10" style={{ background: "var(--pageBg,#f8fafc)" }}> 
   
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


            <button
              onClick={() => setIsEditingBasic(!isEditingBasic)}
              className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white"
              style={{ background:"var(--addBtnBg)" }}
            >
              <FiEdit2 size={15}/>
              Change Information
            </button>

          </div>



          <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">


            {/* PROFILE IMAGE */}

            <div className="flex flex-col items-center gap-3">

              <div className="relative">

                <Image
                alt="your Avatar"
                  src={imagePreview || userBasicData ? process.env.NEXT_PUBLIC_BASE_CONTENT_URL+"/"+userBasicData?.[0]?.dp : ""}
                  width={80}
                  unoptimized
                  height={80}
                  className="w-32 h-32 rounded-full object-cover border-4"
                  style={{ borderColor:"var(--adminPrimaryColor)" }}
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




            {/* DETAILS */}

            <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-2 gap-4">


              <div className="p-4 rounded-xl" style={{ background:"var(--iconBgColro)" }}>
                <div className="flex items-center gap-2 text-sm mb-2" style={{color:"var(--greyText)"}}>
                  <FiUser/>
                  Name
                </div>

                <p className="font-semibold" style={{color:"var(--blackText)"}}>
                  {userBasicData ? userBasicData?.[0]?.name : ""}
                </p>
              </div>



              <div className="p-4 rounded-xl" style={{ background:"var(--iconBgColro)" }}>
                <div className="flex items-center gap-2 text-sm mb-2" style={{color:"var(--greyText)"}}>
                  <FiMail/>
                  Email
                </div>

                <p className="font-semibold break-all" style={{color:"var(--blackText)"}}>
                                  {userBasicData ? userBasicData?.[0]?.email : ""}

                </p>
              </div>



              <div className="p-4 rounded-xl" style={{ background:"var(--iconBgColro)" }}>
                <div className="flex items-center gap-2 text-sm mb-2" style={{color:"var(--greyText)"}}>
                  <FiShield/>
                  Role
                </div>

                <p className="font-semibold" style={{color:"var(--blackText)"}}>
                                  {userBasicData ? userBasicData?.[0]?.userRole : ""}

                </p>
              </div>

              <div className="p-4 rounded-xl" style={{ background:"var(--iconBgColro)" }}>
                <div className="flex items-center gap-2 text-sm mb-2" style={{color:"var(--greyText)"}}>
                  <BsCalendarDateFill/>
                  Date Of Birth
                </div>

                <p className="font-semibold" style={{color:"var(--blackText)"}}>
                                  {userBasicData ? formatDate(userBasicData?.[0]?.date_of_birth) : ""}

                </p>
              </div>


            </div>


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


          <button
            onClick={() => setPermissionOpen(!permissionOpen)}
            className="w-full flex justify-between items-center p-5 font-semibold"
            style={{color:"var(--blackText)"}}
          >

            <span>
              My Permissions
            </span>


            <FiChevronDown className={`${permissionOpen ? "rotate-180" : ""} transition-transform`} />

          </button>




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


<div className="rounded-2xl mt-2 shadow-sm border overflow-hidden" style={{background:"var(--whiteBg)",borderColor:"#e5e7eb"}}>

  <button
    onClick={() => setOrganizationOpen(!organizationOpen)}
    className="w-full flex justify-between items-center p-5 font-semibold"
    style={{color:"var(--blackText)"}}
  >
    <span>Organization Information</span>

    <span className={`${organizationOpen ? "rotate-180" : ""} transition-transform text-xl`}>
      ▼
    </span>
  </button>

  {organizationOpen && (

    <div className="border-t p-5" style={{borderColor:"#e5e7eb"}}>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

        <div className="rounded-xl p-4" style={{background:"var(--iconBgColro)"}}>
          <p className="text-sm font-medium mb-1" style={{color:"var(--greyText)"}}>Organization Name</p>
          <p className="font-semibold break-words" style={{color:"var(--blackText)"}}>{organization.orgName}</p>
        </div>

        <div className="rounded-xl p-4" style={{background:"var(--iconBgColro)"}}>
          <p className="text-sm font-medium mb-1" style={{color:"var(--greyText)"}}>Owner Name</p>
          <p className="font-semibold break-words" style={{color:"var(--blackText)"}}>{organization.ownerName}</p>
        </div>

        <div className="rounded-xl p-4" style={{background:"var(--iconBgColro)"}}>
          <p className="text-sm font-medium mb-1" style={{color:"var(--greyText)"}}>Phone Number</p>
          <p className="font-semibold break-words" style={{color:"var(--blackText)"}}>{organization.phnNumber}</p>
        </div>

        <div className="rounded-xl p-4" style={{background:"var(--iconBgColro)"}}>
          <p className="text-sm font-medium mb-1" style={{color:"var(--greyText)"}}>PAN Number</p>
          <p className="font-semibold break-words" style={{color:"var(--blackText)"}}>{organization.panNo}</p>
        </div>

        <div className="rounded-xl p-4" style={{background:"var(--iconBgColro)"}}>
          <p className="text-sm font-medium mb-1" style={{color:"var(--greyText)"}}>VAT Number</p>
          <p className="font-semibold break-words" style={{color:"var(--blackText)"}}>{organization.vatNo}</p>
        </div>

        <div className="rounded-xl p-4" style={{background:"var(--iconBgColro)"}}>
          <p className="text-sm font-medium mb-1" style={{color:"var(--greyText)"}}>Contact Person</p>
          <p className="font-semibold break-words" style={{color:"var(--blackText)"}}>{organization.contactPerson}</p>
        </div>

        <div className="rounded-xl p-4" style={{background:"var(--iconBgColro)"}}>
          <p className="text-sm font-medium mb-1" style={{color:"var(--greyText)"}}>Contact Person Phone</p>
          <p className="font-semibold break-words" style={{color:"var(--blackText)"}}>{organization.contactPersonsPhNo}</p>
        </div>

        <div className="rounded-xl p-4" style={{background:"var(--iconBgColro)"}}>
          <p className="text-sm font-medium mb-1" style={{color:"var(--greyText)"}}>Contact Person Email</p>
          <p className="font-semibold break-all" style={{color:"var(--blackText)"}}>{organization.contactPersonsEmail}</p>
        </div>

        <div className="rounded-xl p-4 sm:col-span-2" style={{background:"var(--iconBgColro)"}}>
          <p className="text-sm font-medium mb-1" style={{color:"var(--greyText)"}}>Physical Address</p>
          <p className="font-semibold break-words" style={{color:"var(--blackText)"}}>{organization.physicalAddress}</p>
        </div>

      </div>

      <div className="mt-6 flex justify-end">
        <button
          className="px-5 py-2 rounded-lg text-white font-semibold"
          style={{background:"var(--addBtnBg)"}}
        >
          Change Organization Information
        </button>
      </div>

    </div>

  )}

</div>
</div>

  );
};


export default ProfilePage;