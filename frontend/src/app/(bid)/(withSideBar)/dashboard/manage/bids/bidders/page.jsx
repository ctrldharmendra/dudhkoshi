import ApplicantsLists from "./components/AppicantsLists";
import BidMasterDets from "./components/BidMasterDets";

const Page = async ({ searchParams }) => {
  const { bid } = await searchParams;

  return (

    <>  
    <BidMasterDets bid={bid}></BidMasterDets>
  <ApplicantsLists bid={bid}></ApplicantsLists>
  
    </>

  )
  



};

export default Page;