import DocumentLists from "./components/DocumentLists";




const Page = async ({ searchParams }) => {
  const {bid:bidId} = await searchParams; // this is bid Id
  const {id:applicationId} = await searchParams;  // this id is id of "bid_application" table



  return (

    <>  
  {/* <h1>bid is {bid}</h1> */}
<DocumentLists bidId={bidId} applicationId={applicationId}></DocumentLists>
    </>

  )
  



};

export default Page;