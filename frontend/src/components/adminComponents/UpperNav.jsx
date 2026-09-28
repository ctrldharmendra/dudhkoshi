"use client";

import { setFontScale } from "@/app/(bid)/redux/slices/accessibility/fontScaleSlice";
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
  
  const fontScale = useSelector((state) => state.accessibility.fontScale);

  return (
    <div ref={menuRef} className="relative flex flex-col w-40  text-sm">



<div className="flex items-center gap-3 w-full" title="Scale Font Size ">
  <span className="text-xs text-gray-300">A</span>

  <input
    type="range"
    min={80}
    max={140}
    step={5}
    value={fontScale}
    onChange={(e) =>
      dispatch(setFontScale(Number(e.target.value)))
    }
    className="
      w-full
      h-[3px]
      rounded-full
      appearance-none
      cursor-pointer
      bg-slate-500

      [&::-webkit-slider-thumb]:
      appearance-none
      [&::-webkit-slider-thumb]:
      w-3
      [&::-webkit-slider-thumb]:
      h-3
      [&::-webkit-slider-thumb]:
      rounded-full
      [&::-webkit-slider-thumb]:
      bg-white
      [&::-webkit-slider-thumb]:
      border
      [&::-webkit-slider-thumb]:
      border-indigo-400
      [&::-webkit-slider-thumb]:
      shadow-sm

      [&::-moz-range-thumb]:
      w-3
      [&::-moz-range-thumb]:
      h-3
      [&::-moz-range-thumb]:
      rounded-full
      [&::-moz-range-thumb]:
      bg-white
      [&::-moz-range-thumb]:
      border
      [&::-moz-range-thumb]:
      border-indigo-400
    "
  />

  <span className="text-sm text-white font-medium">A</span>
</div>

<div className="flex items-center">
        <span className="text-white">{user?.[0]?.name || " "} </span>
          <button onClick={() => setOpen((prev) => !prev)} className="cursor-pointer overflow-hidden">
        {
            !open ?  <IoMenu className=" bg-slate-900 text-white p-2 shadow text-[50px] "></IoMenu > : <RiCloseLargeFill className=" bg-slate-900 text-white p-2 shadow text-[50px] "></RiCloseLargeFill>
           
        }
      </button>
</div>

      <ul className={`absolute top-full right-0 mt-2 w-60 bg-white border border-gray-300 z-[99999] rounded shadow-md py-1 transition-all duration-150 origin-top ${open ? "opacity-100 scale-100 visible" : "opacity-0 scale-95 invisible"}`}>
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

        <li className=" py-2 text-[16px] hover:bg-gray-500/10 cursor-pointer hover:bg-gray-500/10 cursor-pointer" onClick={() => setOpen((prev) => !prev)}>
        <Link href="/dashboard/manage/bids/applied" className="px-4 py-2">
         My Applied Bids
        </Link>
        </li>

        <li className=" py-2 text-[16px] hover:bg-gray-500/10 cursor-pointer hover:bg-gray-500/10 cursor-pointer" onClick={() => setOpen((prev) => !prev)}>
        <Link href="/dashboard/manage/bids" className="px-4 py-2">
         All Bids
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

