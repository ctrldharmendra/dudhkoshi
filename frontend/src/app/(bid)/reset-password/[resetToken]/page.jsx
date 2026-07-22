"use client"
import axios from "axios";
import axiosInstance from "@/lib/axiosInstance";
import { useParams } from 'next/navigation';
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from 'next/navigation';
import TinyLoader from "@/components/reusable/loader/TinyLoader";
import Link from "next/link";

export default function Example() {

    const baseUrl = process.env.NEXT_PUBLIC_BASE_API;

      const router = useRouter();

        const params = useParams();

  const resetToken = params.resetToken;

      
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");

    const formData = new FormData(e.currentTarget);
    
    const password = formData.get("password")?.trim();
    const confirmPassword = formData.get("confirmPassword")?.trim();



 try {
  setLoading(true);

const { data } = await axiosInstance.post(
  "/api/resetpass/reset-password",
  {
    password,
    confirmPassword,
    resetToken
  },
  // {
  //   withCredentials: true,
  // }
);
if(data?.statusCode == 200){
    toast.success("Password Reset Success.");
    router.push(`/login`);
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
            <h2 className="text-xl font-bold mb-9 text-center text-gray-800">Change Your Password {}</h2>
            <h2 className="text-l font-bold mb-9 text-center text-gray-600">Enter Your New Password</h2>
            <div className="flex flex-col items-center mt-2 mb-4 border bg-indigo-500/5 border-gray-500/10 rounded gap-1 pl-2">
                <input className="w-full mt-1 outline-none bg-transparent py-2.5" name="password" required type="password" placeholder="New Password" />
            </div>
            <div className="flex flex-col items-center mt-2 mb-4 border bg-indigo-500/5 border-gray-500/10 rounded gap-1 pl-2">
              
                <input className="w-full mt-1 outline-none bg-transparent py-2.5" name="confirmPassword" required type="password" placeholder="New Password Again" />
            </div>
      
            <button type="submit" className="w-full mb-3 bg-[#001e45] transition py-2.5 rounded text-white font-medium">
                   {
        !loading && (
            <span>Change Password</span>
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

            {/* <p className="text-center mt-4">Forgot Password? <Link href="/forgot-password" className="text-indigo-500">Reset Password</Link></p> */}
            <p className="text-center mt-4">Go to Login Instead <Link href="/login" className="text-indigo-500">Login</Link></p>

        </form>

    </div>

    );
};