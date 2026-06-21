"use client";

import { useDispatch, useSelector } from "react-redux";
import {
  TbEdit,
  TbTrash,
  TbMail,
  TbCalendar,
  TbGenderBigender,
  TbUserShield,
  TbClock,
} from "react-icons/tb";
import Link from "next/link";
import Image from "next/image";

import { getUserPermissionLoggedInUser } from "@/app/(bid)/redux/slices/rolesAndPermissionSlice";







export default function UserDetails({id}) {
  const user = useSelector((state) => state.userState.selectedUser);
const dispatch = useDispatch()
const baseContentUrl = process.env.NEXT_PUBLIC_BASE_CONTENT_URL;

useEffect(() => {
dispatch(getUserPermissionLoggedInUser)
}, [])


  if (!user) {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-6 text-center text-slate-500">
        User data not found
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 flex flex-col md:flex-row justify-between gap-5">
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-3xl font-bold">
          <Image  
            unoptimized
            src={baseContentUrl+"/"+user?.dp}
            alt="dp"
            height={100}
            width={100}
          >

          </Image>
          </div>

          <div>
            <h1 className="text-2xl font-semibold text-slate-800">
              {user.name}
            </h1>

            <p className="text-sm text-slate-500 mt-1">
              {user.email}
            </p>

            <span className="inline-flex mt-3 px-3 py-1 rounded-full bg-purple-100 text-purple-700 text-xs font-medium">
              {user.roleName}
            </span>
          </div>
        </div>


        <div className="flex items-center gap-3">
          <Link
            href={`/dashboard/manage/user/edit/${user.id}`}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            <TbEdit size={18} />
            Edit
          </Link>


          <button
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition"
          >
            <TbTrash size={18} />
            Delete
          </button>
        </div>
      </div>



      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6">
        <h2 className="text-lg font-semibold text-slate-800 mb-5">
          User Information
        </h2>


        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

          <InfoCard
            icon={<TbMail />}
            title="Email"
            value={user.email}
          />

          <InfoCard
            icon={<TbGenderBigender />}
            title="Gender"
            value={user.gender}
          />


          <InfoCard
            icon={<TbCalendar />}
            title="Date of Birth"
            value={new Date(user.date_of_birth).toLocaleDateString("en-GB")}
          />


          <InfoCard
            icon={<TbUserShield />}
            title="Role"
            value={user.roleName}
          />


          <InfoCard
            icon={<TbClock />}
            title="Created At"
            value={new Date(user.created_at).toLocaleDateString("en-GB")}
          />

        </div>
      </div>
    </div>
  );
}



function InfoCard({ icon, title, value }) {
  return (
    <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">

      <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center text-xl">
        {icon}
      </div>


      <div>
        <p className="text-xs text-slate-500">
          {title}
        </p>

        <p className="font-medium text-slate-800 mt-1">
          {value || "N/A"}
        </p>
      </div>

    </div>
  );
}