
"use client";

import { createInvitation, getEmailContents } from "@/app/(bid)/redux/slices/registerSlice";
import { getRolePermissionLoggedInUser } from "@/app/(bid)/redux/slices/rolesAndPermissionSlice";
import EmailForm from "@/components/adminComponents/sendEmail/EmailForm";
import Main from "@/components/adminComponents/sendEmail/Main";
import TinyLoader from "@/components/reusable/loader/TinyLoader";
import { hasPermission } from  "@/helper/helper";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";


export default function SharePage() {
const router = useRouter();
      const dispatch = useDispatch()
// const logoUrl = "https://i.imgur.com/pcrXLsK.png"

  const [email, setEmail] = useState("");
  const [copied, setCopied] = useState(false);



  const [shareLink, setshareLink] = useState("")
const [linkSending, setlinkSending] = useState(false)

const [isLinkCreated, setisLinkCreated] = useState(false)
const frontendUrl = process.env.NEXT_PUBLIC_FRONTEND_URL;

// console.log(shareLink, "shareLink")
// SEND INVITATION FUNCTION FOR CLIENT SIDEee
async function sendInvitationEmail(toEmail, link) {
  try {
    setlinkSending(true)
    const res = await fetch("/api/send-email", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        to: toEmail,
        subject: "You have received an invitation from Dudhkoshi Hydropower",
        paragraph:
          "You have been invited to register on the Dudhkoshi Hydropower portal.\n\nClick the button below to complete your registration. This link will expire in 48 hours.",
        buttonText: "Register Now",
        buttonLink: link,
      }),
    });
    if (!res.ok) {
      const { error } = await res.json();
      throw new Error(error);
    }
    toast.success("Invitation email sent!");
    setlinkSending(false)
  } catch (err) {
    setlinkSending(false)
    toast.error("Link created but email failed: " + err.message, { id: "invite-email-err" });
  }
}



  const invitationCreationLoading = useSelector((state) => state?.registration?.invitationCreationLoading);  //Loading status for creation invite
  const emailContentsLoading = useSelector((state) => state?.registration?.emailContentsLoading);  //Loading status for email contents 
//   const emailContents = useSelector((state) => state?.registration?.emailContents);  //Email content from db 



   //FIRST : check if logged in role has permission to view bid or not 
          //FIRST : fetch permissions on mount
          useEffect(() => {
            dispatch(getRolePermissionLoggedInUser({}));
          }, [dispatch]);
          
          const permissionOfLoggedInRoleOfUser = useSelector((state) => state?.roleAndPermission?.permissionOfLoggedInRoleOfUser);
          const loadingOfGetRolePermission = useSelector((state) => state.roleAndPermission?.loadingOfGetRolePermission);
          
          const create_user = hasPermission(permissionOfLoggedInRoleOfUser, "create_user");
          
          // only "true" once permission data has actually arrived
          const permissionChecked = !loadingOfGetRolePermission && !!permissionOfLoggedInRoleOfUser;
          const createUser = create_user;
           
          useEffect(() => {
            if (!permissionChecked) return;
            if (!createUser) {
              router.replace("/forbidden");
            }
          }, [permissionChecked, createUser, router]);
          //   check if logged in role has permission to view bid or not END
          



if (!permissionChecked || linkSending) {
  return (
    <div className='bg-[var(--loadingMainBg)] min-h-screen flex items-center justify-center'>
      <TinyLoader />
    </div>
  );
}

if (!create_user) {
  // redirect is already in-flight via the effect above
  return null;
}


// console.log(emailContents?.[0]?.body, "emailcondb")


  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareLink);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };
  const handleRefresh = () => {
    setEmail("");
    setshareLink("");
    setisLinkCreated(false);
  }
// console.log(shareLink, "sharelink")

// AFTER LINK CREATION EMAIL WILL BE SENDF 
const handleCreateLink = async () => {
  const result = await dispatch(createInvitation({ email }));

  if (createInvitation.fulfilled.match(result)) {
    setisLinkCreated(true);
  }

  let finalLink = "";

  if (result?.payload?.registerLink) {
    finalLink = result.payload.registerLink;
    setshareLink(finalLink);
  }

  if (result?.payload?.[0]) {
    finalLink = `${frontendUrl}/register?token=${result.payload[0].token}`;
    // finalLink = `${frontendUrl}/register?token=${result.payload[0].token}/c=${result.payload[0].email}`;
    setshareLink(finalLink);
  }

  // Send email automatically as soon as link is ready
  if (finalLink && createInvitation.fulfilled.match(result)) {
    await sendInvitationEmail(email, finalLink);
  }
};
// loading for generatinf link  
    if(invitationCreationLoading) return  <div className='bg-[var(--loadingMainBg)] min-h-screen flex items-center justify-center'>
      <TinyLoader></TinyLoader>
      <div>Generating Links</div>
    </div>;
// loading for email contents  
    if(emailContentsLoading) return  <div className='bg-[var(--loadingMainBg)] min-h-screen flex items-center justify-center'>
      <TinyLoader></TinyLoader>
      <div>Getting Ready</div>
    </div>;

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-lg p-6 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-8">
          Share Invitation
        </h1>

        {/* Email Section */}
        <div className="space-y-3">
          <label className="block text-sm font-medium text-slate-700">
            Email Address
          </label>

          <div className="flex flex-col gap-3">
            <input
              type="email"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 border border-slate-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
<div className="">
{
  email.length >= 12 &&
  email.includes("@") && 
  isLinkCreated==false &&
  (
    <button
      onClick={handleCreateLink}
      className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg transition font-medium"
    >
      Send Invitation
    </button>
  )
}
 
      <EmailForm 
        email={email} 
  subject={`Greetings, you have received invitation Link from Dudhkoshi hydropower.`} 
  paragraph={`Click on the link bellow to register. Remember this Link will be expired in 48hrs from now on. Do register as soon as possible. Thank you and Regards.`}
  buttonText="Register Now"
  buttonLink={shareLink}
  isLinkCreated={isLinkCreated}
  logoUrl="https://i.imgur.com/pcrXLsK.png"
      ></EmailForm>
</div>

          </div>
        </div>

        {/* Divider */}
        <div className="my-8 border-t border-slate-200" />

  {/* { 
    isLinkCreated && (
        <div className="space-y-3">
          <label className="block text-sm font-medium text-slate-700">
            Share Link
          </label>

          <div className="flex flex-col sm:flex-row gap-3">
            <input
              readOnly
              value={shareLink}
              className="flex-1 border border-slate-300 rounded-lg px-4 py-3 bg-slate-100"
            />

            <button
              onClick={handleCopy}
              className={`px-6 py-3 rounded-lg font-medium transition ${
                copied
                  ? "bg-green-600 text-white"
                  : "bg-slate-800 hover:bg-slate-900 text-white"
              }`}
            >
              {copied ? "Copied!" : "Copy Link"}
            </button>
          </div>
        </div>
    )

  } */}
  {isLinkCreated && (
        <button
      onClick={handleRefresh}
      className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg transition font-medium"
    >
      Clear
    </button>
  )}
      </div>
    </main>
  );
}

