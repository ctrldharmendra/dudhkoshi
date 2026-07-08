
import BidMasterDets from "./components/BidMasterDets";

const Page = async ({ searchParams }) => {
  const { bid } = await searchParams;

  return (

    <>  
    <BidMasterDets bid={bid}></BidMasterDets>
    </>

  )
  



};

export default Page;