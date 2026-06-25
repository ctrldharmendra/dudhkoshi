import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { HiOutlineSave, HiOutlineUser } from 'react-icons/hi'
import { addNewRole } from '@/app/(bid)/redux/slices/rolesAndPermissionSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/navigation';
import TinyLoader from '@/components/reusable/loader/TinyLoader'


const AddRoleForm = () => {

const [roleName, setroleName] = useState("")
const dispatch = useDispatch()
  const router = useRouter();

  const addRoleLoading = useSelector((state) => state?.roleAndPermission?.addRoleLoading);
  const deleteRoleLoading = useSelector((state) => state?.roleAndPermission?.deleteRoleLoading);


const handleSubmit = async (e)=>{
    e.preventDefault()
    if(roleName.length<=4) return  toast.error("Atleat 5 character required")


          const result = await dispatch(
    addNewRole({roleName})
  );

//   if (addNewRole.fulfilled.match(result)) {
//     router.push("/dashboard/manage/user");
//   }
}
// console.log(roleName)

    if (deleteRoleLoading) {
    return <div className='bg-[var(--loadingMainBg)] min-h-screen flex items-center justify-center'>
      <TinyLoader></TinyLoader>
    </div>;
  }

  return (
     <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-8">
   
         <h2 className="text-xl font-bold text-slate-800 mb-6">
           Add Roles
         </h2>
   
   
         <form onSubmit={handleSubmit}>
   
           <div className="grid grid-cols-1 gap-5">
   
   
             {/* Role name */}
             <div className="flex items-center gap-4 border border-slate-200 rounded-xl p-4 bg-slate-50">
   
               <div 
                 className="rounded-full p-3"
                 style={{
                   backgroundColor:"var(--iconBgColro)",
                   color:"var(--iconColor)"
                 }}
               >
                 <HiOutlineUser className="w-6 h-6"/>
               </div>
   
   
               <div className="flex-1">
   
                 <label className="text-sm text-slate-500">
                   Role Name
                 </label>
   
                 <input
                   value={roleName|| ""}
                   onChange={(e)=>setroleName(e.target.value)}
                   className="
                   w-full 
                   bg-transparent 
                   outline-none 
                   text-slate-800
                   disabled:cursor-not-allowed
                   "
                 />
   
               </div>
   
             </div>   
           </div>
   
   
   
           {/* Save Button */}
   
           <div className="flex justify-end mt-8">
   
             <button
               type="submit"
               className="
               flex
               items-center
               gap-2
               px-6
               py-3
               rounded-xl
               text-white
               font-semibold
               transition
               "
               style={{
                 backgroundColor:"var(--addBtnBg)"
               }}
   
               onMouseEnter={(e)=>
                 e.currentTarget.style.backgroundColor =
                 "var(--addBtnBgHover)"
               }
   
               onMouseLeave={(e)=>
                 e.currentTarget.style.backgroundColor =
                 "var(--addBtnBg)"
               }
             >
   
               <HiOutlineSave className="w-5 h-5"/>
   
               Save Changes
   
             </button>
   
   
           </div>
   
   
         </form>
   
       </div>
  )
}

export default AddRoleForm