import { getAllRoleWithItsPermission } from "@/app/(bid)/redux/slices/rolesAndPermissionSlice";
import React, { useEffect, useState } from "react";
import {
  HiOutlineUser,
  HiOutlineMail,
  HiOutlineLockClosed,
  HiOutlineSave,
  HiOutlineIdentification,
} from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";

const AddUser = ({ roles = [] }) => {

const dispatch = useDispatch()
    const [selectedRole, setSelectedRole] = useState("");   


  const [formData, setFormData] = useState({
    name: "",
    email: "",
    gender: "",
    password: "",
    role_id: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(formData);

    // dispatch(addUser(formData))
  };

    const allRoleWithPermission = useSelector((state) => state?.roleAndPermission?.RoleWithItsPermission);

useEffect(() => {
  if (!allRoleWithPermission?.length) {
    dispatch(getAllRoleWithItsPermission({}));
  }
}, [dispatch, allRoleWithPermission]);


  return (
    <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-8">

      <h2 className="text-xl font-bold text-slate-800 mb-6">
        Add User
      </h2>

      <form onSubmit={handleSubmit}>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          {/* Name */}
          <div className="flex items-center gap-4 border border-slate-200 rounded-xl p-4 bg-slate-50">

            <div
              className="rounded-full p-3"
              style={{
                backgroundColor: "var(--iconBgColro)",
                color: "var(--iconColor)",
              }}
            >
              <HiOutlineUser className="w-6 h-6" />
            </div>

            <div className="flex-1">
              <label className="text-sm text-slate-500">
                Full Name
              </label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter full name"
                className="w-full bg-transparent outline-none text-slate-800"
              />
            </div>
          </div>

          {/* Email */}
          <div className="flex items-center gap-4 border border-slate-200 rounded-xl p-4 bg-slate-50">

            <div
              className="rounded-full p-3"
              style={{
                backgroundColor: "var(--iconBgColro)",
                color: "var(--iconColor)",
              }}
            >
              <HiOutlineMail className="w-6 h-6" />
            </div>

            <div className="flex-1">
              <label className="text-sm text-slate-500">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email"
                className="w-full bg-transparent outline-none text-slate-800"
              />
            </div>
          </div>

          {/* Gender */}
          <div className="flex items-center gap-4 border border-slate-200 rounded-xl p-4 bg-slate-50">

            <div
              className="rounded-full p-3"
              style={{
                backgroundColor: "var(--iconBgColro)",
                color: "var(--iconColor)",
              }}
            >
              <HiOutlineIdentification className="w-6 h-6" />
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

          {/* Password */}
          <div className="flex items-center gap-4 border border-slate-200 rounded-xl p-4 bg-slate-50">

            <div
              className="rounded-full p-3"
              style={{
                backgroundColor: "var(--iconBgColro)",
                color: "var(--iconColor)",
              }}
            >
              <HiOutlineLockClosed className="w-6 h-6" />
            </div>

            <div className="flex-1">
              <label className="text-sm text-slate-500">
                Password
              </label>

              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter password"
                className="w-full bg-transparent outline-none text-slate-800"
              />
            </div>
          </div>






{/* gender  */}
{/* Gender */}
          <div className="flex items-center gap-4 border border-slate-200 rounded-xl p-4 bg-slate-50">

            <div
              className="rounded-full p-3"
              style={{
                backgroundColor: "var(--iconBgColro)",
                color: "var(--iconColor)",
              }}
            >
              <HiOutlineIdentification className="w-6 h-6" />
            </div>

            <div className="flex-1">
              <label className="text-sm text-slate-500">
                Gender
              </label>

              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full bg-transparent outline-none text-slate-800"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Others">Others</option>
              </select>
            </div>
          </div>

      

        </div>

        <div className="flex justify-end mt-8">

          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-3 rounded-xl text-white font-semibold transition"
            style={{
              backgroundColor: "var(--addBtnBg)",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor =
                "var(--addBtnBgHover)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor =
                "var(--addBtnBg)")
            }
          >
            <HiOutlineSave className="w-5 h-5" />
            Save User
          </button>

        </div>

      </form>

    </div>
  );
};

export default AddUser;