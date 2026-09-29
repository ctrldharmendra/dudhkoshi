

"use client"


import { useRouter } from "next/navigation";
import PowerGen from "./PowerGen";
import TechSpec from "./TechPara";
import WaterWire from "./WaterWire";
import { getRolePermissionLoggedInUser } from "@/app/(bid)/redux/slices/rolesAndPermissionSlice";
import { hasPermission } from "@/helper/helper";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function Page() {



// CHECK PERMISSION 
const router = useRouter();
const dispatch = useDispatch();
const [permissionChecked, setpermissionChecked] = useState(false)
  const permissionOfLoggedInRoleOfUser = useSelector((state) => state?.roleAndPermission?.permissionOfLoggedInRoleOfUser);   
  const loadingRole  = useSelector((state) => state.roleAndPermission?.loadingOfGetRolePermission);  //loading state

      useEffect(()=>{
      dispatch(getRolePermissionLoggedInUser({}))
    },[]);

useEffect(() => {
  if (loadingRole) return;
  if (!permissionOfLoggedInRoleOfUser){
    setpermissionChecked(false)
    return 
  } 

  const canUpdateLandingPage = hasPermission(permissionOfLoggedInRoleOfUser, "update_landing_page_content");
  if (!canUpdateLandingPage) {
    return router.replace("/forbidden");
  }
  else{
    setpermissionChecked(true)
  }

}, [loadingRole, permissionOfLoggedInRoleOfUser, router]);
  // CHECK PERMISSION END 
// Fetch content ONLY after permission is confirmed
useEffect(() => {
  if (!permissionChecked) return;

}, [permissionChecked, dispatch]);
  
     return (
      permissionChecked &&
            <div>
      <TechSpec />
      <WaterWire />
      <PowerGen />
    </div>
      
  );
}
