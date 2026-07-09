

"use client";
import React, { useState } from "react";

import Image from "next/image";
import TinyLoader from "@/components/reusable/loader/TinyLoader";


const RegistrationPage = ({email, token}) => {
    
const [error, seterror] = useState(null)
    
  const [formData, setFormData] = useState({
    name: "",
    email: email || "",
    date_of_birth: "",
    gender: "",
    tokenFromFrontend:token || "",
    orgName:"", ownerName:"", phnNumber:"", panNo:"", vatNo:"", contactPerson:"", contactPersonsPhNo:"", contactPersonsEmail:"", physicalAddress:"", password:""
  });

  const [loading, setloading] = useState(false)

  const [dp, setdp] = useState(null);
  const [preview, setPreview] = useState(null); 

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };





const handleImageChange = (e) => {
  const file = e.target.files[0];

  if (file) {
    setdp(file); // for FormData upload
    setPreview(URL.createObjectURL(file)); // for preview
  }
};

const handleSubmit = async (e) => {
    e.preventDefault();
    if(!formData.gender){
        return seterror("Gender is Required.")
    }
    seterror(null)
setloading(true)
const payload = new FormData();

Object.entries(formData).forEach(([key, value]) => {
payload.append(key, value);
});

if (dp) {
payload.append("dp", dp);
}

try {
const response = await fetch("/api/auth/register", {
method: "POST",
body: payload,
});


if(response.status== false){
    seterror("Something went worng. ")
    setloading(false)
}

const data = await response.json();
setloading(false)

if(data.errors) {
    setloading(false)
    seterror(data.errors)
}


} catch (error) {
    setloading(false)
console.error(error, "ERROR from catch block");
}
};

if (loading) { 
  return <div className='bg-[var(--loadingMainBg)] min-h-screen flex items-center justify-center'>
   <TinyLoader></TinyLoader>
  </div>;
}
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4 py-8">
      <div className="w-full">
        <h1 className="text-3xl font-bold text-center mb-8">
          Registration Form
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Profile Image */}
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-indigo-200 bg-slate-100">
{preview && (
  <img
    src={preview}
    alt="Preview"
    className="w-full h-full object-cover"
  />
)}
            </div>

            <label className="mt-4 cursor-pointer bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition">
              Upload Image
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
          </div> 


<div className="grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 gap-12 px-8">
       {/* Name */}
          <div>
            <label className="block mb-2 font-medium">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              required
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-2 font-medium">
              Email Address
            </label>
            <input
                disabled
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-slate-300 bg-[#F5F5F5] rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              required
            />
          </div>
{/* STARTED */}
          <div>
            <label className="block mb-2 font-medium">
              Organization Name
            </label>
            <input
              type="text"
              name="orgName"
              placeholder="Enter your name"
              value={formData.orgName}
              onChange={handleChange}
              className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              
            />
          </div>
          <div>
            <label className="block mb-2 font-medium">
              Owner Name
            </label>
            <input
              type="text"
              name="ownerName"
              placeholder="Enter your name"
              value={formData.ownerName}
              onChange={handleChange}
              className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              
            />
          </div>
          <div>
            <label className="block mb-2 font-medium">
              Phone Number
            </label>
            <input
              type="text"
              name="phnNumber"
              placeholder="Enter your name"
              value={formData.phnNumber}
              onChange={handleChange}
              className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              
            />
          </div>
          <div>
            <label className="block mb-2 font-medium">
              PAN No.
            </label>
            <input
              type="text"
              name="panNo"
              placeholder="Enter your name"
              value={formData.panNo}
              onChange={handleChange}
              className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              
            />
          </div>

          <div>
            <label className="block mb-2 font-medium">
              Full Name
            </label>
            <input
              type="text"
              name="vatNo"
              placeholder="Vat No."
              value={formData.vatNo}
              onChange={handleChange}
              className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              
            />
          </div>
          <div>
            <label className="block mb-2 font-medium">
              Contact Person
            </label>
            <input
              type="text"
              name="contactPerson"
              placeholder="Enter your name"
              value={formData.contactPerson}
              onChange={handleChange}
              className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              
            />
          </div>
          <div>
            <label className="block mb-2 font-medium">
              contactPersonsPhNo
            </label>
            <input
              type="text"
              name="contactPersonsPhNo"
              placeholder="Enter your name"
              value={formData.contactPersonsPhNo}
              onChange={handleChange}
              className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              
            />
          </div>
          <div>
            <label className="block mb-2 font-medium">
              contactPersonsEmail
            </label>
            <input
              type="text"
              name="contactPersonsEmail"
              placeholder="Enter your name"
              value={formData.contactPersonsEmail}
              onChange={handleChange}
              className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              
            />
          </div>
          <div>
            <label className="block mb-2 font-medium">
              physicalAddress
            </label>
            <input
              type="text"
              name="physicalAddress"
              placeholder="Enter your name"
              value={formData.physicalAddress}
              onChange={handleChange}
              className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              
            />
          </div>
{/* ENDED  */}
          {/* date_of_birth */}
          <div>
            <label className="block mb-2 font-medium">
              Date of Birth
            </label>
            <input
              type="date"
              name="date_of_birth"
              value={formData.date_of_birth}
              onChange={handleChange}
              className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block mb-2 font-medium">
              Gender
            </label>

            <div className="flex flex-wrap gap-5">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  onChange={handleChange}
                />
                Male
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  onChange={handleChange}
                />
                Female
              </label>

              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="gender"
                  value="Other"
                  onChange={handleChange}
                />
                Other
              </label>
            </div>
          </div>

          {/* Password  */}
                   <div>
            <label className="block mb-2 font-medium">
              Password
            </label>
            <input
              name="password"
              placeholder="********"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-slate-300 bg-[#F5F5F5] rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              
            />
          </div>
</div>
          <button
            type="submit"
            className="w-[200px] flex justify-center items-center mx-auto bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold transition"
          >
            Register
          </button>
          <button
            type="submit"
            className="w-full text-red-700 py-3 rounded-lg font-semibold transition"
          >
            {error}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationPage;







