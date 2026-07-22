
"use client"

import axios from "axios";
import axiosInstance from "@/lib/axiosInstance";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from 'next/navigation';
import TinyLoader from "@/components/reusable/loader/TinyLoader";
import Link from "next/link";

export default function Example() {

    const baseUrl = process.env.NEXT_PUBLIC_BASE_API;

      const router = useRouter();

      
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    const formData = new FormData(e.currentTarget);
    
    const email = formData.get("email")?.trim();


    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // if (!emailRegex.test(email)) {
    //   toast.error("Hey Seems Like You Have not Entered Correct Mail.")
    //   return;
    // }

 try {
  setLoading(true);

const { data } = await axiosInstance.post(
  "/api/resetpass/forgot-password",
  {
    email
  },
  // {
  //   withCredentials: true,
  // }
);
if(data?.statusCode == 201){
    toast.success("If account exits, Otp will be sent.");
    router.push(`/verify-otp/${email}`);
}

console.log(data, "data")
if(data?.success == false) setError(data?.message)


} catch (err) {

  console.log(err);
  setError("Something went wrong.");

} finally {

  setLoading(false);

}
  };

    return (



    <div className="flex justify-center items-center min-h-screen">
  <form onSubmit={handleLogin} className="bg-white text-gray-500 max-w-[340px] w-full mx-4 md:p-6 p-4 py-8 text-left text-sm rounded-xl shadow-[0px_0px_10px_0px] shadow-black/10">
            <h2 className="text-xl font-bold mb-9 text-center text-gray-800">Forgot Password?</h2>
            <h2 className="text-l font-bold mb-9 text-center text-gray-600">Enter your registered Email</h2>
            <div className="flex items-center mt-2 mb-4 border bg-indigo-500/5 border-gray-500/10 rounded gap-1 pl-2">
                {/* <svg width="13" height="17" viewBox="0 0 13 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13 8.5c0-.938-.729-1.7-1.625-1.7h-.812V4.25C10.563 1.907 8.74 0 6.5 0S2.438 1.907 2.438 4.25V6.8h-.813C.729 6.8 0 7.562 0 8.5v6.8c0 .938.729 1.7 1.625 1.7h9.75c.896 0 1.625-.762 1.625-1.7zM4.063 4.25c0-1.406 1.093-2.55 2.437-2.55s2.438 1.144 2.438 2.55V6.8H4.061z" fill="#6B7280"/>
                </svg> */}
                <input className="w-full outline-none bg-transparent py-2.5" name="email" required type="email" placeholder="Registered Email" />
            </div>
      
            <button type="submit" className="w-full mb-3 bg-[#001e45] transition py-2.5 rounded text-white font-medium">
                   {
        !loading && (
            <span>Proceed</span>
        )
     }
     {
        loading && (
               <span className="text-green-300 flex items-center justify-center gap-2">Working on it... <TinyLoader></TinyLoader></span>
        )
     }
            
            </button>

          <button
            type="submit"
            className="w-full text-red-700 py-3 rounded-lg font-semibold transition"
          >
            {error}
          </button>

            <p className="text-center mt-4">Go to Login Instead <Link href="/login" className="text-indigo-500">Login</Link></p>
        </form>

    </div>

    );
};