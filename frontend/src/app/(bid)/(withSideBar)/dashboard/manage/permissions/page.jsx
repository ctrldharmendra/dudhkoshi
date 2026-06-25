

"use client"

import { getAllRoleWithItsPermission } from "@/app/(bid)/redux/slices/rolesAndPermissionSlice";
import { useDispatch, useSelector } from "react-redux";
import { addPermissionFn, deletePermissionFn, getAllPermissionFromDbFn } from "@/app/(bid)/redux/slices/permissionSlice";
import React, { useEffect, useRef, useState } from "react";
import { FiPlus, FiX, FiShield, FiChevronDown, FiCheck, FiTrash2 } from "react-icons/fi";
import { HiOutlineUserGroup } from "react-icons/hi";
import TinyLoader from "@/components/reusable/loader/TinyLoader";
import { permanentRedirect } from "next/navigation";
import toast from "react-hot-toast";
import { hasPermission } from "@/helper/helper";

const PermissionPage = ({selectedRoleFromRolePage=null, isDropDownDisabled}) => {
  const dispatch = useDispatch();
  const hasMounted = useRef(false);


  const allRoleWithPermission = useSelector((state) => state?.roleAndPermission?.RoleWithItsPermission);
  const allPermissionss = useSelector((state) => state?.permissions?.allPermissionFromDb);

  // loading from reducx slice 
  const addPermissionLoading = useSelector((state) => state?.permissions?.addPermissionLoading);
  const deletePermissionLoading = useSelector((state) => state?.permissions?.deletePermissionLoading);
  const loadingGetAllRoleWithPermission = useSelector((state) => state?.roleAndPermission?.loadingGetAllRoleWithPermission);
  // loading from reducx slice end
  
  const isPermissionOpened = useSelector((state) => state?.activity?.isPermissionOpened);    //is add or remove permission popup opened for a role?


  // loading from reducx slice end

  // Selected role from dropdown
  const [selectedRoleId, setSelectedRoleId] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Multi-select state — separate sets for remove and add
  const [selectedToRemove, setSelectedToRemove] = useState([]); // permissionAssignedIds to remove
  const [selectedToAdd, setSelectedToAdd] = useState([]);       // permission ids to add

// Runs once on mount — fetches fresh data when page opens
// useEffect(() => {
//   dispatch(getAllRoleWithItsPermission({}));
// }, []);

//  Re-fetches after a permission popup closes (to reflect changes)
useEffect(() => {
  if (isPermissionOpened === false) {
    dispatch(getAllRoleWithItsPermission({}));
  }
}, [isPermissionOpened]);
// useEffect(() => {
//   if (!hasMounted.current) {
//     hasMounted.current = true;
//     return; // skip the very first render
//   }
//   if (isPermissionOpened === false) {
//     dispatch(getAllRoleWithItsPermission({}));
//   }
// }, [isPermissionOpened]);

// get all permission from db 
useEffect(() => {
  if (!allPermissionss?.length) {
    dispatch(getAllPermissionFromDbFn({}));
  }
}, []);

  // Reset selections when role changes
  useEffect(() => {
    setSelectedToRemove([]);
    setSelectedToAdd([]);
  }, [selectedRoleId]);


// IS LOGGED IN Role HAS PERMISSION TO VIEW, DELETE, ADD?? 
const permissionOfLoggedInRoleOfUser = useSelector((state) => state?.roleAndPermission?.permissionOfLoggedInRoleOfUser);   

    // if this loggedIn Role has add_permision acces or not | if not dont show in ui 
      const isThisRoleHasAddRolePermission = hasPermission(permissionOfLoggedInRoleOfUser,"create_role");
  
//IS LOGGED IN role HAS  PERMISSION TO VIEW, DELETE, ADD END?
  


  
  const selectedRole = allRoleWithPermission?.find((r) => r.roleId === selectedRoleId) || selectedRoleFromRolePage || null;


  const allowedIds = selectedRole?.permissions.map((p) => p.permissionAssignedId) || [];

  const notAllowedPermissions = allPermissionss?.filter(
    (permission) => !allowedIds.includes(permission.id)
  ) || [];

  const toggleToRemove = (id) => {
    setSelectedToRemove((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const toggleToAdd = (id) => {
    setSelectedToAdd((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };
// delte permission from role | calling api 
  const handleRemovePermission = () => {
    dispatch(deletePermissionFn({roleId:selectedRole?.roleId, permissions:selectedToRemove}))
  };
  // add permission for a role | calling api 
  const handleAddPermission = () => {
    dispatch(addPermissionFn({roleId:selectedRole?.roleId, permissions:selectedToAdd}))
  };

  if(addPermissionLoading) return  <div className='bg-[var(--loadingMainBg)] min-h-screen flex items-center justify-center'>
      <TinyLoader></TinyLoader>
      <div>Adding Permission</div>
    </div>;
  if(loadingGetAllRoleWithPermission) return  <div className='bg-[var(--loadingMainBg)] min-h-screen flex items-center justify-center'>
      <TinyLoader></TinyLoader> 
      <div>Getting All ROle</div>

    </div>;
  if(deletePermissionLoading) return  <div className='bg-[var(--loadingMainBg)] min-h-screen flex items-center justify-center'>
      <TinyLoader></TinyLoader> 
      <div>Deleting permission</div>
    </div>;


  return (
    <div className="min-h-screen" style={{ background: "var(--pageBg, #f8fafc)" }}>
      <div className="max-w-3xl mx-auto px-4 py-8">

        {/* HEADER */}
        <header className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 flex items-center gap-3">
            <HiOutlineUserGroup className="text-indigo-600 w-8 h-8" />
            Role Permissions
          </h1>
          <p className="text-slate-500 mt-1 text-sm sm:text-base">
            Select a role to manage its permissions
          </p>
        </header>

        {/* ROLE DROPDOWN */}
        <div className="relative mb-6">
          <button
            onClick={() => setDropdownOpen((prev) => !prev)}

                            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border border-slate-200 shadow-sm text-sm font-semibold transition hover:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-300 ${
    isDropDownDisabled ? "pointer-events-none" : "pointer-events-auto"
  }`}
            style={{
              background: "var(--whiteBg, #fff)",
              color: "var(--blackText, #1e293b)",
            }}
          >
            <div className="flex items-center gap-3">
              <FiShield className="text-indigo-500" size={18} />
              {selectedRole ? (
                <span className="capitalize">{selectedRole.roleName}</span>
              ) : (
                <span className="text-slate-400 font-normal">Select a role…</span>
              )}
            </div>
            <FiChevronDown
              className={`text-slate-400 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
              size={18}
            />
          </button>

          {dropdownOpen && (
            <div
              className="absolute z-20 mt-2 w-full rounded-xl border border-slate-200 shadow-lg overflow-hidden"
              style={{ background: "var(--whiteBg, #fff)" }}
            >
              {allRoleWithPermission?.map((role) => (
                <button
                  key={role.roleId}
                  onClick={() => {
                    setSelectedRoleId(role.roleId);
                    setDropdownOpen(false);
                  }}
                  className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium capitalize hover:bg-indigo-50 transition"
                  style={{ color: "var(--blackText, #1e293b)" }}
                >
                  <div className="flex items-center gap-3">
                    <FiShield className="text-indigo-400" size={16} />
                    {role.roleName}
                    <span className="text-xs text-slate-400 font-normal">
                      {role.permissions.length} permissions
                    </span>
                  </div>
                  {selectedRoleId === role.roleId && (
                    <FiCheck className="text-indigo-600" size={16} />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* PERMISSION PANELS — only shown when a role is selected */}
        {selectedRole ? (
          <div className="flex flex-col gap-6">

            {/* ALLOWED PERMISSIONS */}
            <div
              className="rounded-2xl border border-slate-200 shadow-sm p-5"
              style={{ background: "var(--whiteBg, #fff)" }}
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-bold text-slate-800">Allowed Permissions</h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Click permissions to select, then hit Remove
                  </p>
                </div>
                {selectedToRemove.length > 0 && (
                  <button
                    onClick={handleRemovePermission}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white transition hover:opacity-90 active:scale-95"
                    style={{ background: "#ef4444" }}
                  >
                    <FiTrash2 size={14} />
                    Remove ({selectedToRemove.length})
                  </button>
                )}
              </div>

              {selectedRole.permissions.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {selectedRole.permissions.map((permission) => {
                    const isSelected = selectedToRemove.includes(permission.permissionAssignedId);
                    return (
                      <button
                        key={permission.permissionAssignedId}
                        onClick={() => toggleToRemove(permission.permissionAssignedId)}
                        className="flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium transition hover:scale-[1.03] border-2"
                        style={{
                          background: isSelected ? "#fee2e2" : "#f3e8ff",
                          color: isSelected ? "#dc2626" : "var(--adminPrimaryColor, #7c3aed)",
                          borderColor: isSelected ? "#fca5a5" : "transparent",
                        }}
                      >
                        {isSelected ? <FiX size={13} /> : <FiCheck size={13} />}
                        {permission.permissionAssignedName}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <p className="text-sm" style={{ color: "var(--notFoundTextColor, #94a3b8)" }}>
                  No permissions assigned to this role.
                </p>
              )}

              {/* Selection summary */}
              {selectedToRemove.length > 0 && (
                <div className="mt-4 p-3 rounded-lg bg-red-50 border border-red-100">
                  <p className="text-xs text-red-600 font-semibold mb-1">
                    Selected to remove ({selectedToRemove.length}):
                  </p>
                  <p className="text-xs text-red-500 font-mono break-all">
                    [{selectedToRemove.join(", ")}]
                  </p>
                </div>
              )}
            </div>

            {/* AVAILABLE PERMISSIONS */}
            <div
              className="rounded-2xl border border-slate-200 shadow-sm p-5"
              style={{ background: "var(--whiteBg, #fff)" }}
            >
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-bold text-slate-800">Available Permissions</h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Click permissions to select, then hit Add
                  </p>
                </div>
                {selectedToAdd.length > 0 && (
                  <button
                    onClick={handleAddPermission}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold text-white transition hover:opacity-90 active:scale-95"
                    style={{ background: "var(--addBtnBg, #6366f1)" }}
                  >
                    <FiPlus size={14} />
                    Add ({selectedToAdd.length})
                  </button>
                )}
              </div>

              {notAllowedPermissions.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {notAllowedPermissions.map((permission) => {
                    const isSelected = selectedToAdd.includes(permission.id);
                    return (
                      <button
                        key={permission.id}
                        onClick={() => toggleToAdd(permission.id)}
                        className="flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium transition hover:scale-[1.03] border-2"
                        style={{
                          background: isSelected
                            ? "var(--iconBgColro, #ede9fe)"
                            : "var(--iconBgColro, #ede9fe)",
                          color: isSelected ? "#4f46e5" : "var(--iconColor, #6366f1)",
                          borderColor: isSelected ? "#6366f1" : "transparent",
                          fontWeight: isSelected ? 700 : 500,
                        }}
                      >
                        <FiPlus size={13} />
                        {permission.name}
                      </button>
                    );
                  })}
                </div>
              ) : (
                <p className="text-sm text-slate-400">
                  All permissions are already assigned to this role.
                </p>
              )}

              {/* Selection summary */}
              {selectedToAdd.length > 0 && (
                <div className="mt-4 p-3 rounded-lg bg-indigo-50 border border-indigo-100">
                  <p className="text-xs text-indigo-600 font-semibold mb-1">
                    Selected to add ({selectedToAdd.length}):
                  </p>
                  <p className="text-xs text-indigo-500 font-mono break-all">
                    [{selectedToAdd.join(", ")}]
                  </p>
                </div>
              )}
            </div>

          </div>
        ) : (
          /* EMPTY STATE */
          <div
            className="rounded-2xl border border-dashed border-slate-300 p-12 flex flex-col items-center justify-center text-center"
            style={{ background: "var(--whiteBg, #fff)" }}
          >
            <FiShield className="text-slate-300 mb-3" size={40} />
            <p className="text-slate-500 font-medium">No role selected</p>
            <p className="text-slate-400 text-sm mt-1">
              Pick a role from the dropdown above to manage its permissions.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PermissionPage;