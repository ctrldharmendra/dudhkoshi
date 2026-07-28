
// // old design ui, the functionality is working perfect
// "use client";
// import React, { useRef, useState } from "react";

// import Image from "next/image";
// import TinyLoader from "@/components/reusable/loader/TinyLoader";
// import toast from "react-hot-toast";
// import { useRouter } from "next/navigation";
// import { FiEye, FiEyeOff } from "react-icons/fi";
// import EmailForm from "@/components/adminComponents/sendEmail/EmailForm";


// const RegistrationPage = ({token}) => {
//    const frontendUrl = process.env.NEXT_PUBLIC_FRONTEND_URL
// const [error, seterror] = useState(null)
//     const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//     const [showConfirmPassword2, setShowConfirmPassword2] = useState(false);
// const [linkSending, setlinkSending] = useState(false)

// const countRef = useRef(5);


//   const [formData, setFormData] = useState({
//     name: "",
//     email:"",
//     date_of_birth: "",
//     gender: "",
//     tokenFromFrontend:token || "",
//     orgName:"", ownerName:"", phnNumber:"", panNo:"", vatNo:"", contactPerson:"", contactPersonsPhNo:"", contactPersonsEmail:"", physicalAddress:"", password:""
//   });

//   const [cpassword, setcpassword] = useState("")

//   const [loading, setloading] = useState(false)

//   const [dp, setdp] = useState(null);
//   const [preview, setPreview] = useState(null); 

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };





// const handleImageChange = (e) => {
//   const file = e.target.files[0];

//   if (file) {
//     setdp(file); // for FormData upload
//     setPreview(URL.createObjectURL(file)); // for preview
//   }
// }; 

// const router = useRouter();

// // SEND INVITATION FUNCTION FOR CLIENT SIDEee
// async function sendInvitationEmail(toEmail, link) {
//   try {
//     setlinkSending(true)
//     const res = await fetch("/api/send-email", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         to: toEmail,
//         subject: "Registration Successful.",
//         paragraph:"Click On Login Button To Login",
//         buttonText: "Login",
//         buttonLink: link,
//       }),
//     });
//     if (!res.ok) {
//       const { error } = await res.json();
//       throw new Error(error);
//     }
//     toast.success("Check Your Email for Login Link.");
//     setlinkSending(false)
//   } catch (err) {
//     setlinkSending(false)
//     toast.error("Register Successful but email failed: " + err.message);
//   }
// }


// const handleSubmit = async (e) => {
//   e.preventDefault();


//   if(formData.password !== cpassword) return seterror("Password and Confirm Password Must Match.")
//   if (formData.panNo.length !== 9) {
//     return seterror("A Valid PAN Number is Required of 9 digits.");
//   }

//   // if dob is not 18+ then show error
//   if(formData.date_of_birth){
//     const today = new Date();
//     const birthDate = new Date(formData.date_of_birth);
//     const age = today.getFullYear() - birthDate.getFullYear();
//     const monthDiff = today.getMonth() - birthDate.getMonth();
//     const dayDiff = today.getDate() - birthDate.getDate();
//     if (age < 18 || (age === 18 && monthDiff < 0) || (age === 18 && monthDiff === 0 && dayDiff < 0)) {
//       return seterror("You must be at least 18 years old to register.");
//     }
//   }

//   seterror(null);
//   setloading(true);

//   const payload = new FormData();

//   Object.entries(formData).forEach(([key, value]) => {
//     payload.append(key, value);
//   });

//   if (dp) {
//     payload.append("dp", dp);
//   }

//   try {
//     const response = await fetch("/api/auth/register", {
//       method: "POST",
//       body: payload,
//     });

//     const data = await response.json();

//     // console.log(data, "data")

// if(data?.statusCode === 201){
//     setloading(false);
//         // Success
//        await sendInvitationEmail(data?.data?.userEmail, `${frontendUrl}/login`);

//        toast.success(
//   "Registration successful! Check your email for your login link.",
// );


// countRef.current = 5;

// const interval = setInterval(() => {
//   countRef.current--;

//   if (countRef.current > 0) {
//     toast.success(
//       `Redirecting to login in ${countRef.current} second${countRef.current === 1 ? "" : "s"}...`,
//       { id: "redirect-toast" }
//     );
//   } else {
//     clearInterval(interval);
//     toast.dismiss("redirect-toast");
//     router.push("/login");
//   }
// }, 1000);
  
//   }
  
// if(data?.statusCode !== 201){
//   setloading(false);
//   return toast.error(data?.errors || data?.data?.errors)
//   }
  

  




//   } catch (error) {
//     setloading(false);
//     seterror("Something went wrong.");
//     console.error(error);
//   }
// };




// if (loading) { 
//   return <div className='bg-[var(--loadingMainBg)] min-h-screen flex items-center justify-center'>
//    <TinyLoader></TinyLoader>
//   </div>;
// }
// if (linkSending) { 
//   return <div className='bg-[var(--loadingMainBg)] min-h-screen flex items-center justify-center'>
//    <TinyLoader></TinyLoader>
//    <h1>Registration Succeeded. Sending Login Link...</h1>
//   </div>;
// }
//   return (
//     <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4 py-8">
//       <div className="w-full">
//         <h1 className="text-3xl font-bold text-center mb-8">
//           Registration Form
//         </h1>

//         <form onSubmit={handleSubmit} className="space-y-5">
//           {/* Profile Image */}
//           <div className="flex flex-col items-center">
//             <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-indigo-200 bg-slate-100">
// {preview && (
//   <img
//     src={preview}
//     alt="Preview"
//     className="w-full h-full object-cover"
//   />
// )}
//             </div>

//             <label className="mt-4 cursor-pointer bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition">
//               Upload Image
//               <input
//                 type="file"
//                 accept="image/*"
//                 className="hidden"
//                 onChange={handleImageChange}
//               />
//             </label>
//           </div> 


// <div className="grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 gap-12 px-8">
//        {/* Name */}
//           <div>
//             <label className="block mb-2 font-medium">
//               Full Name
//             </label>
//             <input
//               type="text"
//               name="name"
//               placeholder="Enter your full name"
//               value={formData.name}
//               onChange={handleChange}
//               className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
//               required
//             />
//           </div>

//           {/* Email */}
//           {/* <div>
//             <label className="block mb-2 font-medium">
//               Email Address
//             </label>
//             <input
//                 disabled
//               type="email"
//               name="email"
//               placeholder="Enter your email"
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full border border-slate-300 bg-[#F5F5F5] rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
//               required
//             />
//           </div> */}
// {/* STARTED */}
//           <div>
//             <label className="block mb-2 font-medium">
//               Organization Name
//             </label>
//             <input
//               type="text"
//               name="orgName"
//               placeholder="eg: XYZ Company"
//               value={formData.orgName}
//               onChange={handleChange}
//               className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              
//             />
//           </div>
//           <div>
//             <label className="block mb-2 font-medium">
//               Owner Name
//             </label>
//             <input
//               type="text"
//               name="ownerName"
//               placeholder="eg: XYZ Company"
//               value={formData.ownerName}
//               onChange={handleChange}
//               className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              
//             />
//           </div>
//           <div>
//             <label className="block mb-2 font-medium">
//               Phone Number
//             </label>
//             <input
//               type="text"
//               name="phnNumber"
//               placeholder="eg: 1234567890"
//               value={formData.phnNumber}
//               onChange={handleChange}
//               className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              
//             />
//           </div>
//           <div>
//             <label className="block mb-2 font-medium">
//               PAN No. <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="text"
//               name="panNo"
//               placeholder="eg: ABCDE1234F"
//               value={formData.panNo}
//               onChange={handleChange}
//               className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              
//             />
//           </div>

//           <div>
//             <label className="block mb-2 font-medium">
//               Vat No,
//             </label>
//             <input
//               type="text"
//               name="vatNo"
//               placeholder="eg: 1234567890"
//               value={formData.vatNo}
//               onChange={handleChange}
//               className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              
//             />
//           </div>
//           <div>
//             <label className="block mb-2 font-medium">
//               Contact Person
//             </label>
//             <input
//               type="text"
//               name="contactPerson"
//               placeholder="eg: XYZ Company"
//               value={formData.contactPerson}
//               onChange={handleChange}
//               className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              
//             />
//           </div>
//           <div>
//             <label className="block mb-2 font-medium">
//               Contact Persons Ph.No.
//             </label>
//             <input
//               type="text"
//               name="contactPersonsPhNo"
//               placeholder="eg: 1234567890"
//               value={formData.contactPersonsPhNo}
//               onChange={handleChange}
//               className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              
//             />
//           </div>
//           <div>
//             <label className="block mb-2 font-medium">
//               Contact Person's Email
//             </label>
//             <input
//               type="text"
//               name="contactPersonsEmail"
//               placeholder="eg: 1234567890"
//               value={formData.contactPersonsEmail}
//               onChange={handleChange}
//               className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              
//             />
//           </div>
//           <div>
//             <label className="block mb-2 font-medium">
//               Physical Address
//             </label>
//             <input
//               type="text"
//               name="physicalAddress"
//               placeholder="eg: Kalanki, kathmandu"
//               value={formData.physicalAddress}
//               onChange={handleChange}
//               className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              
//             />
//           </div>
// {/* ENDED  */}
//           {/* date_of_birth */}
//           <div>
//             <label className="block mb-2 font-medium">
//               Date of Birth
//             </label>
//             <input
//               type="date"
//               name="date_of_birth"
//               value={formData.date_of_birth}
//               onChange={handleChange}
//               className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
              
//             />
//           </div>

//           {/* Gender */}
//           <div>
//             <label className="block mb-2 font-medium">
//               Gender
//             </label>

//             <div className="flex flex-wrap gap-5">
//               <label className="flex items-center gap-2">
//                 <input
//                   type="radio"
//                   name="gender"
//                   value="Male"
//                   onChange={handleChange}
//                 />
//                 Male
//               </label>

//               <label className="flex items-center gap-2">
//                 <input
//                   type="radio"
//                   name="gender"
//                   value="Female"
//                   onChange={handleChange}
//                 />
//                 Female
//               </label>

//               <label className="flex items-center gap-2">
//                 <input
//                   type="radio"
//                   name="gender"
//                   value="Other"
//                   onChange={handleChange}
//                 />
//                 Other
//               </label>
//             </div>
//           </div>

// <div>
//   <label className="block mb-2 font-medium">
//     Confirm Password <span className="text-red-500">*</span>
//   </label>

//   <div className="relative">
//     <input
//       type={showConfirmPassword ? "text" : "password"}
//           name="password"
//               placeholder="********"
//               value={formData.password}
//               onChange={handleChange}
//       className="w-full border border-slate-300  rounded-lg px-4 py-3 pr-12 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
//     />

//     <button
//       type="button"
//       onClick={() => setShowConfirmPassword((prev) => !prev)}
//       className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
//     >
//       {showConfirmPassword ? (
//         <FiEyeOff size={20} />
//       ) : (
//         <FiEye size={20} />
//       )}
//     </button>
//   </div>
// </div>
// <div>
//   <label className="block mb-2 font-medium">
//     Confirm Password <span className="text-red-500">*</span>
//   </label>

//   <div className="relative">
//     <input
//       type={showConfirmPassword2 ? "text" : "password"}
//       name="cpassword"
//       placeholder="********"
//       value={cpassword}
//       onChange={(e) => setcpassword(e.target.value)}
//       className="w-full border border-slate-300  rounded-lg px-4 py-3 pr-12 focus:ring-2 focus:ring-indigo-400 focus:outline-none"
//     />

//     <button
//       type="button"
//       onClick={() => setShowConfirmPassword2((prev) => !prev)}
//       className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
//     >
//       {showConfirmPassword2 ? (
//         <FiEyeOff size={20} />
//       ) : (
//         <FiEye size={20} />
//       )}
//     </button>
//   </div>
// </div>



// </div>
//           <button
//             type="submit"
//             className="w-[200px] flex justify-center items-center mx-auto bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold transition"
//           >
//             Register
//           </button>
//           <button
//             type="submit"
//             className="w-full text-red-700 py-3 rounded-lg font-semibold transition"
//           >
//             {error}
//           </button>
//         </form>


//         {/* hidden form mail for data  */}
//               {/* <EmailForm 
//                 email={email} 
//           subject={`Greetings, you have received invitation Link from Dudhkoshi hydropower.`} 
//           paragraph={`Click on the link bellow to register. Remember this Link will be expired in 48hrs from now on. Do register as soon as possible. Thank you and Regards.`}
//           buttonText="Register Now"
//           buttonLink={shareLink}
//           isLinkCreated={isLinkCreated}
//           logoUrl="https://i.imgur.com/pcrXLsK.png"
//               ></EmailForm> */}
//         {/* hidden form mail for data end */}
//       </div>
//     </div>
//   );
// };

// export default RegistrationPage;

"use client";
import React, { useRef, useState } from "react";

import Image from "next/image";
import TinyLoader from "@/components/reusable/loader/TinyLoader";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import {
  FiEye,
  FiEyeOff,
  FiCamera,
  FiPlus,
  FiUser,
  FiBriefcase,
  FiUsers,
  FiLock,
  FiCheck,
} from "react-icons/fi";
import EmailForm from "@/components/adminComponents/sendEmail/EmailForm";
import Navbar from "@/pages/landing/navAndFooter/Nav";

const RegistrationPage = ({ token }) => {
  const frontendUrl = process.env.NEXT_PUBLIC_FRONTEND_URL;
  const [error, seterror] = useState(null);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showConfirmPassword2, setShowConfirmPassword2] = useState(false);
  const [linkSending, setlinkSending] = useState(false);

  const countRef = useRef(5);

  const initialFormData = {
    name: "",
    email: "",
    date_of_birth: "",
    gender: "",
    tokenFromFrontend: token || "",
    orgName: "",
    ownerName: "",
    phnNumber: "",
    panNo: "",
    vatNo: "",
    contactPerson: "",
    contactPersonsPhNo: "",
    contactPersonsEmail: "",
    physicalAddress: "",
    password: "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const [cpassword, setcpassword] = useState("");

  const [loading, setloading] = useState(false);

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

  // Purely cosmetic reset for the new "Clear All" control — does not touch
  // any submit/validation logic below.
  const handleClearAll = () => {
    setFormData(initialFormData);
    setcpassword("");
    setdp(null);
    setPreview(null);
    seterror(null);
  };

  const router = useRouter();

  // SEND INVITATION FUNCTION FOR CLIENT SIDEee
  async function sendInvitationEmail(toEmail, link) {
    try {
      setlinkSending(true);
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: toEmail,
          subject: "Registration Successful.",
          paragraph: "Click On Login Button To Login",
          buttonText: "Login",
          buttonLink: link,
        }),
      });
      if (!res.ok) {
        const { error } = await res.json();
        throw new Error(error);
      }
      toast.success("Check Your Email for Login Link.");
      setlinkSending(false);
    } catch (err) {
      setlinkSending(false);
      toast.error("Register Successful but email failed: " + err.message);
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // console.log(formData.phnNumber, "phn from frone")

    if (formData.password !== cpassword)
      return seterror("Password and Confirm Password Must Match.");
    if (formData.panNo.length !== 9) {
      return seterror("A Valid PAN Number is Required of 9 digits.");
    }
    if (!formData.orgName.length) {
      return seterror("Organization  Name Required");
    }
    if (!formData.ownerName.length) {
      return seterror("Organization Owner Name Required");
    }
    if (!formData.contactPersonsEmail.length) {
      return seterror("Organization Email Required");
    }

    // if dob is not 18+ then show error
    if (formData.date_of_birth) {
      const today = new Date();
      const birthDate = new Date(formData.date_of_birth);
      const age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      const dayDiff = today.getDate() - birthDate.getDate();
      if (
        age < 18 ||
        (age === 18 && monthDiff < 0) ||
        (age === 18 && monthDiff === 0 && dayDiff < 0)
      ) {
        return seterror("You must be at least 18 years old to register.");
      }
    }

    seterror(null);
    setloading(true);

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

      const data = await response.json();

      // console.log(data, "data")

      if (data?.statusCode === 201) {
        setloading(false);
        // Success
        await sendInvitationEmail(data?.data?.userEmail, `${frontendUrl}/login`);

        toast.success(
          "Registration successful! Check your email for your login link.",
        );

        countRef.current = 5;

        const interval = setInterval(() => {
          countRef.current--;

          if (countRef.current > 0) {
            toast.success(
              `Redirecting to login in ${countRef.current} second${
                countRef.current === 1 ? "" : "s"
              }...`,
              { id: "redirect-toast" },
            );
          } else {
            clearInterval(interval);
            toast.dismiss("redirect-toast");
            router.push("/login");
          }
        }, 1000);
      }

      if (data?.statusCode !== 201) {
        setloading(false);
        return toast.error(data?.errors || data?.data?.errors);
      }
    } catch (error) {
      setloading(false);
      seterror("Something went wrong.");
      console.error(error);
    }
  };

  if (loading) {
    return (
      <div className="bg-[var(--loadingMainBg)] min-h-screen flex items-center justify-center">
        <TinyLoader></TinyLoader>
      </div>
    );
  }
  if (linkSending) {
    return (
      <div className="bg-[var(--loadingMainBg)] min-h-screen flex items-center justify-center">
        <TinyLoader></TinyLoader>
        <h1>Registration Succeeded. Sending Login Link...</h1>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-[4px] border border-slate-300 px-3.5 py-2.5 text-sm text-slate-700 placeholder:italic placeholder:text-slate-400 transition focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100";
  const labelClass = "mb-1.5 block text-sm font-medium text-slate-700";

  return (
    <div className="min-h-screen bg-slate-50 px-4 sm:px-6">
      <Navbar></Navbar>
      <form
        onSubmit={handleSubmit}
        className="mx-auto flex w-full max-w-6xl flex-col gap-6"
      >
        {/* Page header */}
        <div>
          <h1 className="font-serif text-2xl font-semibold text-slate-800 sm:text-3xl">
            New Client Enrollment
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Establish a new professional profile and configure organizational
            credentials.
          </p>
        </div>

        {/* Profile picture */}
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <SectionHeading icon={<FiCamera />} label="Profile Picture" />

          <div className="flex flex-col items-center">
            <div className="relative">
              <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-slate-100">
                {preview ? (
                  <img
                    src={preview}
                    alt="Preview"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <FiCamera className="h-7 w-7 text-slate-400" />
                )}
              </div>

              <label className="absolute -bottom-1 -right-1 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-indigo-600 text-white shadow-sm ring-2 ring-white transition hover:bg-indigo-700">
                <FiPlus className="h-4 w-4" />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            </div>

            <p className="mt-3 text-xs text-slate-500">
              Upload a professional photo
            </p>
          </div>
        </section>

        {/* Personal information */}
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <SectionHeading icon={<FiUser />} label="Personal Information" />

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label className={labelClass}>
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                required
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>Date of Birth</label>
              <input
                type="date"
                name="date_of_birth"
                value={formData.date_of_birth}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div>
              <label className={labelClass}>
                Gender 
              </label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className={`${inputClass} bg-white`}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
        </section>

        {/* Organizational details */}
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <SectionHeading icon={<FiBriefcase />} label="Organizational Details" />

          <div className="grid grid-cols-1 gap-5">
            <div>
              <label className={labelClass}>
                Organization Name  <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="orgName"
                placeholder="XYZ"
                value={formData.orgName}
                onChange={handleChange}
                className={inputClass}
              />
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label className={labelClass}>
                  Owner Name   <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="ownerName"
                  placeholder="Sarah Jhonson"
                  value={formData.ownerName}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              {/* <div>
                <label className={labelClass}>Organizational Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="email@organization.com"
                  value={formData.email}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div> */}

                            <div>
                <label className={labelClass}>
                  Phone Number
                </label>
                <input
                  type="text"
                  name="phnNumber"
                  placeholder="+977 9841 23456"
                  value={formData.phnNumber}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label className={labelClass}>PAN / Registration No. <span className="text-red-500">*</span></label>
                <input
                  type="text"
                  name="panNo"
                  placeholder="Federal Tax ID"
                  value={formData.panNo}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>VAT Compliance</label>
                <input
                  type="text"
                  name="vatNo"
                  placeholder="VAT Reference"
                  value={formData.vatNo}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label className={labelClass}>
                Business Address 
              </label>
              <textarea
                name="physicalAddress"
                placeholder="Street, City, State, ZIP"
                value={formData.physicalAddress}
                onChange={handleChange}
                rows={3}
                className={`${inputClass} resize-none`}
              />
            </div>
              <div>
                <label className={labelClass}>
                  Contact Full Name
                </label>
                <input
                  type="text"
                  name="contactPerson"
                  placeholder="Contact"
                  value={formData.contactPerson}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>
                  Phone Number
                </label>
                <input
                  type="text"
                  name="contactPersonsPhNo"
                  placeholder="+977 9841 23456"
                  value={formData.contactPersonsPhNo}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>
      

            <div>
              <label className={labelClass}>
                Email Address  <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="contactPersonsEmail"
                placeholder="contact@organization.com"
                value={formData.contactPersonsEmail}
                onChange={handleChange}
                className={inputClass}
              />
            </div>
          </div>
        </section>



        {/* Security & credentials */}
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
          <SectionHeading icon={<FiLock />} label="Security &amp; Credentials" />

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label className={labelClass}>
                Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  name="password"
                  placeholder="********"
                  value={formData.password}
                  onChange={handleChange}
                  className={`${inputClass} pr-10`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute inset-y-0 right-3 flex items-center text-slate-400 hover:text-slate-600"
                >
                  {showConfirmPassword ? (
                    <FiEyeOff size={18} />
                  ) : (
                    <FiEye size={18} />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label className={labelClass}>
                Confirm Password <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword2 ? "text" : "password"}
                  name="cpassword"
                  placeholder="********"
                  value={cpassword}
                  onChange={(e) => setcpassword(e.target.value)}
                  className={`${inputClass} pr-10`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword2((prev) => !prev)}
                  className="absolute inset-y-0 right-3 flex items-center text-slate-400 hover:text-slate-600"
                >
                  {showConfirmPassword2 ? (
                    <FiEyeOff size={18} />
                  ) : (
                    <FiEye size={18} />
                  )}
                </button>
              </div>
            </div>
          </div>

          <p className="mt-3 text-xs text-slate-500">
            Minimum 8 characters with at least one symbol.
          </p>
        </section>

        {/* Error message */}
        {error && (
          <p className="text-center text-sm font-medium text-red-600">
            {error}
          </p>
        )}

        {/* Footer actions */}
        <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-6 py-4 shadow-sm">
          <button
            type="button"
            onClick={handleClearAll}
            className="text-sm font-medium text-slate-500 transition hover:text-slate-700"
          >
            Clear All
          </button>

          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
          >
            Complete Registration
            <FiCheck className="h-4 w-4" />
          </button>
        </div>
      </form>

      {/* hidden form mail for data  */}
      {/* <EmailForm 
                email={email} 
          subject={`Greetings, you have received invitation Link from Dudhkoshi hydropower.`} 
          paragraph={`Click on the link bellow to register. Remember this Link will be expired in 48hrs from now on. Do register as soon as possible. Thank you and Regards.`}
          buttonText="Register Now"
          buttonLink={shareLink}
          isLinkCreated={isLinkCreated}
          logoUrl="https://i.imgur.com/pcrXLsK.png"
              ></EmailForm> */}
      {/* hidden form mail for data end */}
    </div>
  );
};

// Small helper for the repeated "icon + uppercase label" section heading
const SectionHeading = ({ icon, label }) => (
  <div className="mb-6 flex items-center gap-2">
    <span className="text-indigo-600">{icon}</span>
    <h2 className="text-xs font-semibold uppercase tracking-widest text-indigo-600">
      {label}
    </h2>
  </div>
);

export default RegistrationPage;





