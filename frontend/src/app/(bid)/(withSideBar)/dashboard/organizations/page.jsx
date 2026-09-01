
"use client"
import { getUserOrganization, updateUserOrganization } from '@/app/(bid)/redux/slices/users/organizationsSlice';
import TinyLoader from '@/components/reusable/loader/TinyLoader';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import OrgDocs from './orgDocs/OrgDocs';

const page = () => {
    const router = useRouter()
    const dispatch = useDispatch();
     const organizationOfLoggedInUser = useSelector((state) => state?.organization?.userOrganization);  //total org here
     const organizationGetLoading = useSelector((state) => state?.organization?.organizationGetLoading);  //Get all org loading
     const organizationUpdateLoading = useSelector((state) => state?.organization?.organizationUpdateLoading);  //update Org Loading

// console.log(organizationOfLoggedInUser, "organizationOfLoggedInUser")

    const [isEditingOrganization, setIsEditingOrganization] = useState(false);

const [selectedRow, setSelectedRow] = useState(null);

const [organizationForm, setOrganizationForm] = useState({
  orgName: "",
  ownerName: "",
  phnNumber: "",
  panNo: "",
  vatNo: "",
  contactPerson: "",
  contactPersonsPhNo: "",
  contactPersonsEmail: "",
  physicalAddress: "",
});

// edit handlere 
const handleEditOrganization = (org) => {
  setSelectedRow(org.id);

  setOrganizationForm({
    orgName: org.orgName ?? "",
    ownerName: org.ownerName ?? "",
    phnNumber: org.phnNumber ?? "",
    panNo: org.panNo ?? "",
    vatNo: org.vatNo ?? "",
    contactPerson: org.contactPerson ?? "",
    contactPersonsPhNo: org.contactPersonsPhNo ?? "",
    contactPersonsEmail: org.contactPersonsEmail ?? "",
    physicalAddress: org.physicalAddress ?? "",
  });

  setIsEditingOrganization(true);
};

const handleOrganizationEditSave = async (e) => {
e.preventDefault()
  if (isEditingOrganization) {

    const payload = {
      ...organizationForm,
      selectedRow
    };

    console.log("Updating:", payload);

    dispatch(updateUserOrganization({payload}))

           const result = await   dispatch(updateUserOrganization({payload}));
           if (updateUserOrganization.fulfilled.match(result)) {
                router.refresh();
                toast.success("Update Success.")
                setIsEditingOrganization(false)
                setSelectedRow(null);
                }
  }

};

const handleOrganizationChange = (e) => {
  setOrganizationForm({
    ...organizationForm,
    [e.target.name]: e.target.value,
  });
};


// call get org api
useEffect(() => {
        dispatch(getUserOrganization({}))
}, [])


if (organizationGetLoading || organizationUpdateLoading) {
  return <div className='bg-[var(--loadingMainBg)] min-h-screen flex items-center justify-center'>
   <TinyLoader></TinyLoader>
  </div>;
}



  return (
    <>
   <div
  className="rounded-2xl mt-2 shadow-sm border overflow-hidden"
  style={{background:"var(--whiteBg)",borderColor:"#e5e7eb"}}
>


<div className="border-t p-5" style={{borderColor:"#e5e7eb"}}>


<div className="flex justify-end mb-5">

{/* <button
  onClick={handleOrganizationEditSave}
  className="px-5 py-2 rounded-lg text-white font-semibold"
  style={{background:"var(--addBtnBg)"}}
>
  {isEditingOrganization ? "Save" : "Organization Details"}
</button> */}


<button
  onClick={handleOrganizationEditSave}
  className={`px-5 py-2 rounded-lg text-white font-semibold transition-colors ${
    isEditingOrganization ? "bg-green-500 hover:bg-green-600" : ""
  }`}
  style={!isEditingOrganization ? { background: "var(--addBtnBg)" } : {}}
>
  {isEditingOrganization ? "Save" : "Organization Details"}
</button>

</div>



{
organizationOfLoggedInUser?.map((org)=>(

<div
key={org.id}
className="mb-6 rounded-xl border p-5"
style={{
  borderColor:"#e5e7eb"
}}
>


<div className="flex justify-end mb-4">

<button
onClick={()=>handleEditOrganization(org)}
className="px-5 py-2 rounded-lg text-white cursor-pointer font-semibold"
style={{background:"var(--addBtnBg)"}}
>
{
selectedRow === org.id && isEditingOrganization
? "Editing"
: "Edit"
}
</button>

</div>



<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">


{[
{
label:"Organization Name",
name:"orgName"
},
{
label:"Owner Name",
name:"ownerName"
},
{
label:"Phone Number",
name:"phnNumber"
},
{
label:"PAN Number",
name:"panNo"
},
{
label:"VAT Number",
name:"vatNo"
},
{
label:"Contact Person",
name:"contactPerson"
},
{
label:"Contact Person Phone",
name:"contactPersonsPhNo"
},
{
label:"Contact Person Email",
name:"contactPersonsEmail"
},
{
label:"Physical Address",
name:"physicalAddress",
full:true
}

]?.map((item)=>(


<div
key={item?.name || ""}
className={`rounded-xl p-4 ${item?.full ? "sm:col-span-2":""}`}
style={{background:"var(--iconBgColro)"}}
>

<p
className="text-sm mb-2"
style={{color:"var(--greyText)"}}
>
{item?.label || ""}
</p>


<input
type="text"
name={item?.name || ""}

value={
  (
    selectedRow === org.id && isEditingOrganization
      ? organizationForm[item.name]
      : org[item.name]
  ) ?? ""
}
disabled={ !(selectedRow === org.id && isEditingOrganization)} onChange={handleOrganizationChange} className="w-full bg-transparent outline-none font-semibold"

style={{
    color: "var(--blackText)",
    ...(isEditingOrganization && { 
      border: "1px solid var(--inputBorder)"
    })
  }}

/>


</div>


))}


</div>


</div>


))
}



</div>



</div>


{/* ORGANIZATION DOCUMENTS  */}



<OrgDocs></OrgDocs>



</>
  )
}

export default page