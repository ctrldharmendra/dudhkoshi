"use client";

import { useEffect, useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import Image from "next/image";
import { getParticularBidForm } from "@/app/(bid)/redux/slices/bids/bidFormSlice";
import { useDispatch, useSelector } from "react-redux";
import { formatDate } from "@/utils/formatDate";
import TinyLoader from "@/components/reusable/loader/TinyLoader";
import { getRolePermissionLoggedInUser } from "@/app/(bid)/redux/slices/rolesAndPermissionSlice";
import { useRouter } from 'next/navigation';
import { hasPermission } from "@/helper/helper";



export default function BidMasterDets({bid}) {
  const [selectedBid, setSelectedBid] = useState(null);
  const [openAccordion, setOpenAccordion] = useState(false);
      const router = useRouter()

    const dispatch = useDispatch();



    // check if loggedn in user has permission to view "applicants"
    const permissionOfLoggedInRoleOfUser = useSelector((state) => state?.roleAndPermission?.permissionOfLoggedInRoleOfUser);   
    const loadingOfGetRolePermission  = useSelector((state) => state.roleAndPermission?.loadingOfGetRolePermission);  //loading state
    
      // console.log(particularBidFormData, "pik")
    
    // get all permission in an array 
        useEffect(()=>{
          dispatch(getRolePermissionLoggedInUser({}))
        },[]);

        useEffect(() => {
          if (loadingOfGetRolePermission) return;
          if (!permissionOfLoggedInRoleOfUser) return;
        
          const canViewApplicants = hasPermission(permissionOfLoggedInRoleOfUser, "view_applicants");
          if (!canViewApplicants) {
            router.replace("/forbidden");
          }
        }, [loadingOfGetRolePermission, permissionOfLoggedInRoleOfUser]);
    // check if loggedn in user has permission to view "applicants" end


  const particularBidFormData = useSelector((state) => state?.bidForm?.particularBidForm);  //Selected BID Form data
    const particularBidFormLoading = useSelector((state) => state?.bidForm?.particularBidFormLoading);  //Particular bid get Loading
  

  const bidData = 
    {
      id: 1,
      title: "Digital Infrastructure Development and Software Solution Implementation for Aayu Softtech",
      description: "Aayu Softtech is inviting proposals from qualified technology service providers for the design, development, and implementation of a scalable digital infrastructure system. The objective of this project is to enhance operational efficiency, streamline internal workflows, and modernize existing software systems through secure and maintainable solutions.",
      publishDate: "16 Jul 2026",
      openDate: "25 Jul 2026",
      status: "ACTIVE",
      created: "06/07/2026",
    }
if(bid){
    useEffect(() => {
         dispatch(getParticularBidForm({id:bid}))
    }, [])
    
}

// console.log(particularBidFormData)

if (particularBidFormLoading || loadingOfGetRolePermission) {
  return <div className='bg-[var(--loadingMainBg)] min-h-screen flex items-center justify-center'>
   <TinyLoader></TinyLoader>
  </div>;
}


  return (
    <div className="bg-[var(--whiteBg)] text-[var(--blackText)] p-4 md:p-10">


      {/* TITLE + DESCRIPTION */}
      <div className="border-b border-[darkseagreen] pb-5 mb-6">
        <h1 className="text-3xl md:text-5xl font-extrabold text-[var(--adminPrimaryColor)]">
          {particularBidFormData?.title}
        </h1>

        <p className="mt-3  text-[18px] md:text-[22px] leading-relaxed">
          {particularBidFormData?.description}
        </p>
      </div>

      {/* META ROW (ALL IN ONE LINE ON DESKTOP) */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6 text-sm">

        <div className="p-3 rounded-lg border bg-[var(--iconBgColro)] border-[#f1f1f1]">
          <p className="text-[18px] md:text-[22px] text-[var(--greyText)]">Publish</p>
          <p className="font-semibold text-[17px] md:text-[18px]">{formatDate(particularBidFormData?.publishDate)}</p>
        </div>

        <div className="p-3 rounded-lg border bg-[#eaffea] border-[#f1f1f1]">
          <p className="text-[18px] md:text-[22px] text-[green]">Open</p>
          <p className="font-semibold text-[17px] md:text-[18px]">{formatDate(particularBidFormData?.openDate)}</p>
        </div>

        <div className="p-3 rounded-lg border bg-[var(--deleteIconBg)]  border-[#f1f1f1]">
          <p className="text-[18px] md:text-[22px] text-[var(--deleteIconColor)]">Close</p>
          <p className="font-semibold text-[17px] md:text-[18px]">{formatDate(particularBidFormData?.closeDate)}</p>
        </div>

        <div className="p-3 rounded-lg border bg-[#8200db17] border-[#f1f1f1]">
          <p className="text-[18px] md:text-[22px] text-[var(--adminPrimaryColor)] ">Status</p>
          <p className="font-bold">
            {particularBidFormData?.status}
          </p>
        </div>

        <div className="p-3 rounded-lg border bg-[var(--loadingMainBg)] border-[#f1f1f1]">
          <p className="text-[18px] md:text-[22px] text-[var(--greyText)]">Created</p>
          <p className="font-semibold  text-[17px] md:text-[18px]">{formatDate(particularBidFormData?.created_at)}</p>
        </div>
      </div>

      {/* <div className="space-y-3">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">

          {bidData.fields?.map((field, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 hover:shadow-sm transition bg-white"
            >
              <p className="text-[18px] md:text-[22px] text-[var(--greyText)]">
                {field.field_type}
              </p>

              <p className="font-semibold text-[var(--blackText)]">
                {field.field_name}
              </p>
            </div>
          ))}

        </div>
      </div> */}
    </div>
  );
}
