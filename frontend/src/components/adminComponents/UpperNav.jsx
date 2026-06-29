"use client";

import { getLoggedInUserBasicInfo } from "@/app/(bid)/redux/slices/users/userSlice";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { IoMenu } from "react-icons/io5";
import { RiCloseLargeFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";


export default function UpperNav() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const dispatch = useDispatch()


  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);



    const user = useSelector((state) => state.users.loggedInUserBasicData);  //logged in user dets

  useEffect(() => {
        dispatch(getLoggedInUserBasicInfo({}))
  }, [])
  

  return (
    <div ref={menuRef} className="relative flex flex-col w-40 text-sm">
<div className="flex items-center">
        <span className="text-white">{user?.[0]?.name || " "} </span>
          <button onClick={() => setOpen((prev) => !prev)} className="cursor-pointer">
        {
            !open ?  <IoMenu className=" bg-slate-900 text-white p-2 rounded-lg shadow text-[50px] "></IoMenu > : <RiCloseLargeFill className=" bg-slate-900 text-white p-2 rounded-lg shadow text-[50px] "></RiCloseLargeFill>
           
        }
      </button>
</div>

      <ul className={`absolute top-full right-0 mt-2 w-60 bg-white border border-gray-300 rounded shadow-md py-1 transition-all duration-150 origin-top ${open ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible"}`}>
        <li className=" py-2 text-[16px] hover:bg-gray-500/10 cursor-pointer hover:bg-gray-500/10 cursor-pointer" onClick={() => setOpen((prev) => !prev)}>
        <Link href="/dashboard/profile" className="px-4 py-2 ">
          Update Profile
        </Link>
        </li>

        <li className=" py-2 text-[16px] hover:bg-gray-500/10 cursor-pointer hover:bg-gray-500/10 cursor-pointer" onClick={() => setOpen((prev) => !prev)}>
        <Link href="/dashboard/organizations" className="px-4 py-2">
         Update Organization
        </Link>
        </li>

        <li className=" py-2 text-[16px] hover:bg-gray-500/10 cursor-pointer  hover:bg-red-500/10 text-red-500 cursor-pointer" onClick={() => setOpen((prev) => !prev)}>
        <Link href="/dashboard/change-password" className="px-4 py-2">
          Change Password
        </Link>
        </li>

      </ul>
    </div>
  );
}

