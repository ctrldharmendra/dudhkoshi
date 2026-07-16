
import { changeRole, getAllRoleWithItsPermission } from "@/app/(bid)/redux/slices/rolesAndPermissionSlice";
import TinyLoader from "@/components/reusable/loader/TinyLoader";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  HiOutlineMail,
  HiOutlineUser,
  HiOutlineCalendar,
  HiOutlineShieldCheck,
  HiOutlineSave,
} from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from 'next/navigation';


// here geting : 
// user - > which is current user, or we can say selected user from previous page 
// id - > this is the id of selected user | it needed to cheange the role of any user  
const EditForm = ({user, id}) => {
const dispatch = useDispatch()
  const router = useRouter();

    const allRoleWithPermission = useSelector((state) => state?.roleAndPermission?.RoleWithItsPermission);
    // console.log(allRoleWithPermission, "allRoleWithPermission")

    const loading = useSelector((state) => state?.roleAndPermission?.loadingGetAllRoleWithPermission);    //loading for get all roles  
    const loadWhenChangeRole = useSelector((state) => state?.roleAndPermission?.loadingChangeRole);    //loading when role changed 
    

    const [selectedRole, setSelectedRole] = useState(user?.roleId || "");  //from redux 
    // console.log(selectedRole, "selectedRole")
    // console.log(user, "user")


    //   if not user found show error 
      if (!user) {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-6 text-center text-[var(--notFoundTextColor)] h-screen flex items-center justify-center">
        User data not found
      </div>
    );
  }

//   get all role to show in dropdown api calling  | calling api when page appear
useEffect(() => {
  if (!allRoleWithPermission?.length) {
    dispatch(getAllRoleWithItsPermission({}));
  }
}, [dispatch, allRoleWithPermission]);



// if loading show loader 
if (loading) {
  return <div className='bg-[var(--loadingMainBg)] min-h-screen flex items-center justify-center'>
   <TinyLoader></TinyLoader>
  </div>;
}
if (loadWhenChangeRole) {
  return <div className='bg-[var(--loadingMainBg)] min-h-screen flex items-center justify-center'>
   <TinyLoader></TinyLoader>
  </div>;
}

const handleSubmit = async (e)=>{
    e.preventDefault()
    if(selectedRole == 0 || !selectedRole) return  toast.error("Select Approprite Role.")
        // console.log(selectedRole, "selectedROle")
        // console.log(id, "id")

          const result = await dispatch(
    changeRole({ id, selectedRole })
  );

  if (changeRole.fulfilled.match(result)) {
    router.push("/dashboard/manage/users");
  }
}

  return (
   <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-8">

      <h2 className="text-xl font-bold text-slate-800 mb-6">
        Edit User Information
      </h2>


      <form onSubmit={handleSubmit}>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">


          {/* Name */}
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
                Name
              </label>

              <input
                disabled
                value={user?.name || ""}
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



          {/* Email */}
          <div className="flex items-center gap-4 border border-slate-200 rounded-xl p-4 bg-slate-50">

            <div 
              className="rounded-full p-3"
              style={{
                backgroundColor:"var(--iconBgColro)",
                color:"var(--iconColor)"
              }}
            >
              <HiOutlineMail className="w-6 h-6"/>
            </div>


            <div className="flex-1">

              <label className="text-sm text-slate-500">
                Email
              </label>

              <input
                disabled
                value={user?.email || ""}
                className="
                w-full
                bg-transparent
                outline-none
                text-slate-800
                "
              />

            </div>

          </div>



          {/* Gender */}
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
                Gender
              </label>


              <input
                disabled
                value={user?.gender || ""}
                className="
                w-full
                bg-transparent
                outline-none
                text-slate-800
                "
              />


            </div>

          </div>



          {/* DOB */}
          <div className="flex items-center gap-4 border border-slate-200 rounded-xl p-4 bg-slate-50">

            <div 
              className="rounded-full p-3"
              style={{
                backgroundColor:"var(--iconBgColro)",
                color:"var(--iconColor)"
              }}
            >
              <HiOutlineCalendar className="w-6 h-6"/>
            </div>


            <div className="flex-1">

              <label className="text-sm text-slate-500">
                Date Of Birth
              </label>

              <input
                disabled
                value={
                  user?.date_of_birth
                  ?
                  new Date(user.date_of_birth)
                    .toLocaleDateString()
                  :
                  ""
                }
                className="
                w-full
                bg-transparent
                outline-none
                text-slate-800
                "
              />


            </div>

          </div>




          {/* Role Editable */}
          <div className="flex items-center gap-4 border border-slate-200 rounded-xl p-4">


            <div 
              className="rounded-full p-3"
              style={{
                backgroundColor:"var(--iconBgColro)",
                color:"var(--iconColor)"
              }}
            >

              <HiOutlineShieldCheck className="w-6 h-6"/>

            </div>



            <div className="flex-1">

              <label className="text-sm text-slate-500">
                Role
              </label>


          <select
  value={selectedRole}
  onChange={(e) => setSelectedRole(Number(e.target.value))}
  className="w-full border rounded-lg px-3 py-2"
>
  <option value="">
    Select Role
  </option>

  {allRoleWithPermission?.map((role) => (
    <option
      key={role.roleId}
      value={role.roleId}
    >
      {role.roleName}
    </option>
  ))}

</select>


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

export default EditForm