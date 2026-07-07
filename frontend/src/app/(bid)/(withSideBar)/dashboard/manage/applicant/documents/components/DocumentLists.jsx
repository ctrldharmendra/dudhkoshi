
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



const DocumentLists = ({bidId, applicationId}) => {
const dispatch = useDispatch()
const router = useRouter()
  const particularApplicantDocumentsLoading = useSelector((state) => state?.bidApplication?.particularApplicantDocumentsLoading);  //Loading of Getiing particlar appli. documents 
  const applicantDetails = useSelector((state) => state?.bidApplication?.particularApplicantDocuments?.applicantDetails);  //Applicant's Details 
  const bidDynamicDocumentDetails = useSelector((state) => state?.bidApplication?.particularApplicantDocuments?.bidDynamicDocumentDetails);  //bidDynamicDocumentDetails
  const bidMasterDetails = useSelector((state) => state?.bidApplication?.particularApplicantDocuments?.bidMasterDetails);  //bidMasterDetails



    // check if loggedn in user has permission to view "applicants"
    const permissionOfLoggedInRoleOfUser = useSelector((state) => state?.roleAndPermission?.permissionOfLoggedInRoleOfUser);   
    const loadingOfGetRolePermission  = useSelector((state) => state.roleAndPermission?.loadingOfGetRolePermission);  //loading state
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



// api calling to get particualr applicant's filled document for particular bid 
useEffect(() => {
    dispatch(getApplicantDocumentForParticularBid({bidId, applicationId}))
}, [])


if(particularApplicantDocumentsLoading){
    return <div className='bg-[var(--loadingMainBg)] min-h-screen flex items-center justify-center'>
   <TinyLoader></TinyLoader>
  </div>;
}

  return (
  <>
<div className='flex flex-col gap-[12px] pt-[12px]'>
      <ApplicantDetails applicantDetails={applicantDetails}></ApplicantDetails>
  <BidDetails bidMasterDetails={bidMasterDetails} applicantDetails={applicantDetails}></BidDetails>
  <ApplicantAppliedDocuments bidDynamicDocumentDetails={bidDynamicDocumentDetails}></ApplicantAppliedDocuments>
</div>
  </>
  )
}

export default DocumentLists