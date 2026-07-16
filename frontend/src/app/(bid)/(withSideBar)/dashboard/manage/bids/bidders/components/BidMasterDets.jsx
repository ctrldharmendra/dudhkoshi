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
import ApplicantsLists from "./AppicantsLists";
import BidFormAttachmetns from "../../apply/[bid]/components/BidFormAttachmetns";



export default function BidMasterDets({bid}) {
  const [selectedBid, setSelectedBid] = useState(null);
  const [openAccordion, setOpenAccordion] = useState(false);
      const router = useRouter()

    const dispatch = useDispatch();








          //FIRST : check if logged in role has permission to view bid or not 
          //FIRST : fetch permissions on mount
          useEffect(() => {
            dispatch(getRolePermissionLoggedInUser({}));
          }, [dispatch]);
          
          const permissionOfLoggedInRoleOfUser = useSelector((state) => state?.roleAndPermission?.permissionOfLoggedInRoleOfUser);
          const loadingOfGetRolePermission = useSelector((state) => state.roleAndPermission?.loadingOfGetRolePermission);
          
          const view_applicants = hasPermission(permissionOfLoggedInRoleOfUser, "view_applicants");
          
          // only "true" once permission data has actually arrived
          const permissionChecked = !loadingOfGetRolePermission && !!permissionOfLoggedInRoleOfUser;
          const hasBidAccess = view_applicants;
           
          useEffect(() => {
            if (!permissionChecked) return;
            if (!hasBidAccess) {
              router.replace("/forbidden");
            }
          }, [permissionChecked, hasBidAccess, router]);
          //   check if logged in role has permission to view bid or not END
          
          // SECOND :Fetch only when permission exists
          // SECOND: fetch bids only when access is confirmed
          useEffect(() => {
            if (!permissionChecked || !hasBidAccess) return;
          
            dispatch(getParticularBidForm({ id: bid }));}, [permissionChecked, hasBidAccess, dispatch]);
          // Fetch only when permission exists END 
          // -----------------------------------------------------
    // check if loggedn in user has permission to view "applicants" end  


  const particularBidFormData = useSelector((state) => state?.bidForm?.particularBidForm);  //Selected BID Form data
    const particularBidFormLoading = useSelector((state) => state?.bidForm?.particularBidFormLoading);  //Particular bid get Loading
  

console.log(particularBidFormData, "particularBidFormData")

if (particularBidFormLoading || loadingOfGetRolePermission) {
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

if (!hasBidAccess) {
  // redirect is already in-flight via the effect above
  return null;
}

  return (
    <>
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
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6 text-sm">

  {/* Publish Date */}
  <div className="group p-4 rounded-xl border border-[#f1f1f1] bg-[var(--iconBgColro)] shadow-sm hover:shadow-md transition-all">
    <p className="text-xs uppercase tracking-wider font-bold text-[var(--greyText)]">
      Publish Date
    </p>
    <p className="mt-2 font-bold text-[var(--blackText)] text-base">
      {formatDate(particularBidFormData?.publishDate)}
    </p>
  </div>


  {/* Open Date */}
  <div className="group p-4 rounded-xl border border-[#f1f1f1] bg-[#eaffea] shadow-sm hover:shadow-md transition-all">
    <p className="text-xs uppercase tracking-wider font-bold text-green-600">
      Open Date
    </p>
    <p className="mt-2 font-bold text-[var(--blackText)] text-base">
      {formatDate(particularBidFormData?.openDate)}
    </p>
  </div>


  {/* Close Date */}
  <div className="group p-4 rounded-xl border border-[#f1f1f1] bg-[var(--deleteIconBg)] shadow-sm hover:shadow-md transition-all">
    <p className="text-xs uppercase tracking-wider font-bold text-[var(--deleteIconColor)]">
      Close Date
    </p>
    <p className="mt-2 font-bold text-[var(--blackText)] text-base">
      {formatDate(particularBidFormData?.closeDate)}
    </p>
  </div>


  {/* Status */}
  <div className="group p-4 rounded-xl border border-[#f1f1f1] bg-[#8200db17] shadow-sm hover:shadow-md transition-all">
    <p className="text-xs uppercase tracking-wider font-bold text-[var(--adminPrimaryColor)]">
      Status
    </p>

    <span className="inline-flex mt-2 px-3 py-1 rounded-full text-xs font-bold bg-[var(--adminPrimaryColor)] text-[var(--whiteText)]">
      {particularBidFormData?.status}
    </span>
  </div>


  {/* Created */}
  <div className="group p-4 rounded-xl border border-[#f1f1f1] bg-[var(--loadingMainBg)] shadow-sm hover:shadow-md transition-all">
    <p className="text-xs uppercase tracking-wider font-bold text-[var(--greyText)]">
      Created
    </p>
    <p className="mt-2 font-bold text-[var(--blackText)] text-base">
      {formatDate(particularBidFormData?.created_at)}
    </p>
  </div>

</div>

{/* Contract DEts  */}
<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">

  <InfoCard
    label="Contract No"
    value={particularBidFormData?.contractNo}
  />

  <InfoCard
    label="Estimated Amount"
    value={particularBidFormData?.estimatedAmt || "N/A"}
  />

  <InfoCard
    label="Bid Security Amount"
    value={particularBidFormData?.bidSecurityAmnt || "N/A"}
  />

  <InfoCard
    label="Security Validity"
    value={
      particularBidFormData?.bidSecurityValidityInDays
        ? `${particularBidFormData.bidSecurityValidityInDays} Days`
        : "N/A"
    }
  />

    </div>
    </div>
{/* Contract DEts END  */}


{/* fields given by admin  */}
<div className="mt-6">
  <h3 className="text-lg font-bold text-[var(--blackText)] mb-4">
    Additional Information
  </h3>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    {particularBidFormData?.fields?.map((field) => (
      <div
        key={field.id}
        className="p-4 rounded-xl border border-[#f1f1f1] bg-[var(--whiteBg)] shadow-sm"
      >
        <p className="text-xs uppercase tracking-wider font-bold text-[var(--greyText)]">
         Label:  {field.label}
        </p>

        <p className="mt-2 text-base font-bold text-[var(--blackText)]">
         Field Name: {field.field_name}
        </p>

        <div className="mt-3 flex gap-2 items-center">
          <span className="px-2 py-1 rounded-md text-xs font-bold bg-[var(--iconBgColro)] text-[var(--iconColor)]">
          Field Type:   {field.field_type}
          </span>

          {field.isRequired === 1 && (
            <span className="px-2 py-1 rounded-md text-xs font-bold bg-[var(--deleteIconBg)] text-[var(--deleteIconColor)]">
              Required
            </span>
          )}
        </div>

        {field.helpText && (
          <p className="mt-3 text-xs text-[var(--greyText)]">
          Help Text: {field.helpText}
          </p>
        )}

        <p className="mt-2 text-xs text-[var(--greyText)]">
          Order: {field.displayOrder}
        </p>
      </div>
    ))}
  </div>
</div>
{/* fields given by admin end  */}


{/* ATTACHEMNTS  */}
<div className="mt-2">
  <BidFormAttachmetns attachments={particularBidFormData?.attachments}></BidFormAttachmetns>
</div>
{/* ATTACHEMNTS END */}



      <ApplicantsLists bid={bid} particularBidFormData={particularBidFormData}></ApplicantsLists>
      </>
  );
}


const InfoCard = ({label, value}) => (
  <div className="p-4 rounded-xl border border-[#f1f1f1] bg-[var(--whiteBg)] shadow-sm">
    <p className="text-xs uppercase font-bold text-[var(--greyText)] tracking-wider">
      {label}
    </p>

    <p className="mt-2 text-lg font-bold text-[var(--blackText)]">
      {value}
    </p>
  </div>
);