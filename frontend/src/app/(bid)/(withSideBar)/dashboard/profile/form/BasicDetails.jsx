import { updateBasicDetailsloggedInUser } from '@/app/(bid)/redux/slices/users/userSlice';
import TinyLoader from '@/components/reusable/loader/TinyLoader';
import React, { useEffect, useState } from 'react'
import { BsCalendarDateFill } from 'react-icons/bs';
import { FiMail, FiShield, FiUser } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

const BasicDetails = ({userBasicData}) => {
const [isEditing, setIsEditing] = useState(false);
const dispatch = useDispatch();
const router = useRouter();
const [formData, setFormData] = useState({
  name: "",
  email: "",
  date_of_birth: "",
  role: "",
  gender:""
});

useEffect(() => {
  if (userBasicData?.length) {
    setFormData({
      name: userBasicData[0].name || "",
      email: userBasicData[0].email || "",
      date_of_birth: userBasicData[0].date_of_birth?.split("T")[0] || "",
      role: userBasicData[0].userRole || "",
      gender:  userBasicData[0].gender || "",
    });
  }
}, [userBasicData]);

const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });
};



// UPDATE 
  const updateupdateBasicInfoLoggedInUserLoading = useSelector((state) => state.users.updateBasicInfoLoggedInUserLoading);  //loading of when user click update basic info

const handleEditSave = async () => {
  if (isEditing) {
          const result = await dispatch(updateBasicDetailsloggedInUser({formData}));
           if (updateBasicDetailsloggedInUser.fulfilled.match(result)) {
             toast.success("Update Success.")
                // router.refresh();
                setIsEditing(false)
                }

  } else {
    setIsEditing(true);
  }
};

  


 

if (updateupdateBasicInfoLoggedInUserLoading) {
  return <div className='bg-[var(--loadingMainBg)] min-h-screen flex items-center justify-center'>
   <TinyLoader>Updating Your Basic Info...</TinyLoader>
  </div>;
}


  return (
   <div className="flex-1">
  <div className="flex justify-end mb-4">
    <button
      onClick={handleEditSave}
      className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white"
              style={{ background:"var(--addBtnBg)" }}
    >
      {isEditing ? "Save" : "Edit"}
    </button>
  </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

    {/* Name */}
    <div className="p-4 rounded-xl" style={{ background: "var(--iconBgColro)" }}>
      <div
        className="flex items-center gap-2 text-sm mb-2"
        style={{ color: "var(--greyText)" }}
      >
        <FiUser />
        Name
      </div>

      <input
      
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        disabled={!isEditing}
        className="w-full bg-transparent outline-none font-semibold"
        style={{
    color: "var(--blackText)",
    ...(isEditing && { 
      border: "1px solid var(--inputBorder)"
    })
  }}
      />
    </div>

    {/* Email */}
    <div className="p-4 rounded-xl" style={{ background: "var(--iconBgColro)" }}>
      <div
        className="flex items-center gap-2 text-sm mb-2"
        style={{ color: "var(--greyText)" }}
      >
        <FiMail />
        Email
      </div>

      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        disabled={!isEditing}
        className="w-full bg-transparent outline-none font-semibold"
        style={{
    color: "var(--blackText)",
    ...(isEditing && { 
      border: "1px solid var(--inputBorder)"
    })
  }}
      />
    </div>

    {/* Role */}
    <div className="p-4 rounded-xl" style={{ background: "var(--iconBgColro)" }}>
      <div
        className="flex items-center gap-2 text-sm mb-2"
        style={{ color: "var(--greyText)" }}
      >
        <FiShield />
        Gender
      </div>

      <input
        type="text"
        name='gender'
        value={formData.gender}
        className="w-full bg-transparent outline-none font-semibold cursor-not-allowed"
        style={{
    color: "var(--blackText)",
    ...(isEditing && { 
      border: "1px solid var(--inputBorder)"
    })
  }}
              onChange={handleChange}
        disabled={!isEditing}
      />
    </div>

    {/* Date of Birth */}
    <div className="p-4 rounded-xl" style={{ background: "var(--iconBgColro)" }}>
      <div
        className="flex items-center gap-2 text-sm mb-2"
        style={{ color: "var(--greyText)" }}
      >
        <BsCalendarDateFill />
        Date Of Birth
      </div>

      <input
        type="date"
        name="date_of_birth"
        value={formData.date_of_birth}
        onChange={handleChange}
        disabled={!isEditing}
        className="w-full bg-transparent outline-none font-semibold"
        style={{
    color: "var(--blackText)",
    ...(isEditing && { 
      border: "1px solid var(--inputBorder)"
    })
  }}
      />
    </div>

  </div>
</div>
  )
}

export default BasicDetails