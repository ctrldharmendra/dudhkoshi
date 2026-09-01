import React from 'react'
import DocumentLists from './components/DocumentLists';
import toast from 'react-hot-toast';

const page = async ({searchParams}) => {
    const {bid:bidId} = await searchParams; // this is bid Id
  const {id:applicationId} = await searchParams;  // this id is id of "bid_application" table
  // console.log(applicationId, "applicationId")
//   console.log(bidId, "Bidid")


if(bidId !== bidId || applicationId !== applicationId) return toast(" You Don't have Access to View Other Applicant's Documents.")
  return (
    <>

    <DocumentLists bidId={bidId} applicationId={applicationId}></DocumentLists>
    
    </>

  )
}

export default page