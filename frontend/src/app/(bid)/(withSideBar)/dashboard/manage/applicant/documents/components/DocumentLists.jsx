
"use client"
import { getApplicantDocumentForParticularBid } from '@/app/(bid)/redux/slices/bids/bidApplicationSlice'
import { getRolePermissionLoggedInUser } from '@/app/(bid)/redux/slices/rolesAndPermissionSlice'
import { hasPermission } from '@/helper/helper'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ApplicantDetails from './Children/ApplicantDetails'
import BidDetails from './Children/BidDetails'
import ApplicantAppliedDocuments from './Children/ApplicantAppliedDocuments'
import TinyLoader from '@/components/reusable/loader/TinyLoader'
import { getBidderReproposeDoc } from '@/app/(bid)/redux/slices/bidRepropose/biReproposeSlice'



const DocumentLists = ({bidId, applicationId}) => {
const dispatch = useDispatch()
const router = useRouter()
  const particularApplicantDocumentsLoading = useSelector((state) => state?.bidApplication?.particularApplicantDocumentsLoading);  //Loading of Getiing particlar appli. documents 
  const applicantDetails = useSelector((state) => state?.bidApplication?.particularApplicantDocuments?.applicantDetails);  //Applicant's Details 
  const bidDynamicDocumentDetails = useSelector((state) => state?.bidApplication?.particularApplicantDocuments?.bidDynamicDocumentDetails);  //bidDynamicDocumentDetails
  const bidMasterDetails = useSelector((state) => state?.bidApplication?.particularApplicantDocuments?.bidMasterDetails);  //bidMasterDetails
  const awardedBy = useSelector((state) => state?.bidApplication?.particularApplicantDocuments?.awardedBy);  //awardedBy
  const bidWinnerDetails = useSelector((state) => state?.bidApplication?.particularApplicantDocuments?.bidWinnerDetails);  //awardedto , bidWinnerDetails

    // check if loggedn in user has permission to view "applicants"
    const permissionOfLoggedInRoleOfUser = useSelector((state) => state?.roleAndPermission?.permissionOfLoggedInRoleOfUser);   
    const loadingOfGetRolePermission  = useSelector((state) => state.roleAndPermission?.loadingOfGetRolePermission);  //loading state
    // get all permission in an array 
useEffect(() => {
  dispatch(getRolePermissionLoggedInUser({}));
}, [dispatch]);

useEffect(() => {
  // Wait until permission API finishes
  if (loadingOfGetRolePermission) return;

  // Permission data isn't available yet
  if (!permissionOfLoggedInRoleOfUser) return;

  const canViewApplicants = hasPermission(
    permissionOfLoggedInRoleOfUser,
    "view_applicants"
  );

  if (!canViewApplicants) {
    router.replace("/forbidden");
    return;
  }

  // User has permission, so now fetch applicant documents
  dispatch(
    getApplicantDocumentForParticularBid({
      bidId,
      applicationId,
    })
  );
}, [
  loadingOfGetRolePermission,
  permissionOfLoggedInRoleOfUser,
  bidId,
  applicationId,
  dispatch,
  router,
]);
    // check if loggedn in user has permission to view "applicants" end



if(particularApplicantDocumentsLoading){
    return <div className='bg-[var(--loadingMainBg)] min-h-screen flex items-center justify-center'>
   <TinyLoader></TinyLoader>
  </div>;
}

  return (
  <>
<div className='flex flex-col gap-[12px] pt-[12px]'>
      <ApplicantDetails applicantDetails={applicantDetails} bidMasterDetails={bidMasterDetails}></ApplicantDetails>
  <BidDetails bidMasterDetails={bidMasterDetails} applicantDetails={applicantDetails}></BidDetails>
  <ApplicantAppliedDocuments bidDynamicDocumentDetails={bidDynamicDocumentDetails} applicantDetails={applicantDetails} bidMasterDetails={bidMasterDetails} awardedBy={awardedBy} bidWinnerDetails={bidWinnerDetails}></ApplicantAppliedDocuments>
</div>
  </>
  )
}

export default DocumentLists