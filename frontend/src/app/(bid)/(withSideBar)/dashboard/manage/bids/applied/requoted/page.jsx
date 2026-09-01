




import React from 'react'
import BIdInfo from './components/BIdInfo';

const page = async ({ searchParams }) => {
    const {b:bidId} = await searchParams; // this is bid Id
  const {id:applicationId} = await searchParams;  // this id is id of "bid_application" table



  return (
    <div> 
{/* <h1>Bidid {bidId}</h1>
<h1>appli ID{applicationId}</h1> */}


<BIdInfo bidId={bidId}  applicationId={applicationId}/>

    </div>
  )
}

export default page