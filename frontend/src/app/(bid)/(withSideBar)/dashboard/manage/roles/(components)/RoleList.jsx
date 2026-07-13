"use client";

import { setSelectedRole, setSelectedUser } from "@/app/(bid)/redux/slices/stateSlice";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Link from "next/link";

import { useEffect, useMemo, useState } from "react";
import { FaEdit, FaKey } from "react-icons/fa";
import { MdDelete, MdDeleteForever } from "react-icons/md";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { TbEyeSearch } from "react-icons/tb";
import { useDispatch, useSelector } from 'react-redux';
import EditRole from "./EditRole";
import Modal from "@/components/adminComponents/modal/Modal";
import { setIsDeleteOpened, setIsEditOpened, setIsPermissisonOpened } from "@/app/(bid)/redux/slices/activitySlice";
import { FiBarChart2 } from "react-icons/fi";
import { hasPermission } from "@/helper/helper";
import TinyLoader from "@/components/reusable/loader/TinyLoader";
import { deleteRole, getRolePermissionLoggedInUser } from "@/app/(bid)/redux/slices/rolesAndPermissionSlice";
import { useRouter } from 'next/navigation';
import { IoKey } from "react-icons/io5";
import PermissionPage from "../../permissions/page";

export default function RoleList({ roles, isThisRoleHasViewRolePermission}) {
          const router = useRouter();

  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const dispatch = useDispatch();


const [selectedRoleId, setselectedRoleId] = useState(null)


  const selectedRoleFromRolePage = useSelector((state) => state.userState.selectedRole);  //selectedrole object
    const isEdit = useSelector((state) => state?.activity?.isEditOpened);    //isEdit popup opened?
  const isDelete = useSelector((state) => state?.activity?.isDeleteOpened);    //isDelete popup opened?
  const isPermissionOpened = useSelector((state) => state?.activity?.isPermissionOpened);    //is add or remove permission popup opened for a role?


  const loading = useSelector((state) => state?.roleAndPermission?.loadingOfGetRolePermission);
  const deleteRoleLoading = useSelector((state) => state?.roleAndPermission?.deleteRoleLoading);
  const permissionOfLoggedInRoleOfUser = useSelector((state) => state?.roleAndPermission?.permissionOfLoggedInRoleOfUser);  //gets all permission of loggedin role
  const isThisRoleHasDeleteRolePermission = hasPermission(permissionOfLoggedInRoleOfUser, "delete_role");
  const isThisRoleHasUpdateRolePermission = hasPermission(permissionOfLoggedInRoleOfUser, "update_roleName");


const [isDropDownDisabled, setisDropDownDisabled] = useState(true)


    // when click on delete popup ko "yes"
    const handleDelete = async () => {
          const result = await dispatch(
        deleteRole({id:selectedRoleId})
      );
  
      // if (deleteRole.fulfilled.match(result)) {
      //    router.refresh();
      // }
    }


  const columns = useMemo(
    () => [
   {
  id: "serial",
  header: "ID",
  cell: ({ row, table }) => {
    return (
      row.index +
      1 +
      table.getState().pagination.pageIndex *
        table.getState().pagination.pageSize
    );
  },
},
      {
        accessorKey: "roleName",
        header: "Role Name",
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <div>
              <p className="font-medium">{row.original.roleName}</p>         
            </div>
          </div>
        ),
      },


      {
  header: "Actions",
  cell: ({ row }) => {
    const role = row.original;

    return (
      <div className="flex gap-2 justify-end w-full">

{ isThisRoleHasUpdateRolePermission &&(
        <button
        // href={`/dashboard/manage/roles/${role?.roleId}`}
         title={`Edit ${row?.original?.roleName}`}
        onClick={() => {
          setselectedRoleId(role?.roleId)
          dispatch(setSelectedRole(role))
          dispatch(setIsEditOpened(true))
        }} 
        className="flex items-center gap-2.5 viewParticularUser  cursor-pointer px-4 py-2 text-sm text-gray-800 rounded active:scale-95 transition"
        >
        <FaEdit className="text-[var(--adminPrimaryColor)]" />
      </button>
)

}
  {
    isThisRoleHasDeleteRolePermission &&(
          <button
          
         title={`Delete ${row?.original?.roleName}`}
        // href={`/dashboard/manage/roles/${role?.roleId}`}
        onClick={() => {
          setselectedRoleId(role?.roleId)
          dispatch(setSelectedRole(role))
          dispatch(setIsDeleteOpened(true))
        }} 
        className="flex items-center gap-2.5 viewParticularUser  cursor-pointer px-4 py-2 text-sm text-gray-800 rounded active:scale-95 transition"
        >
        <RiDeleteBin5Fill className="text-[var(--adminPrimaryColor)]" />
      </button>
    )
  }
  {/* ADD OR REMOVE PERMISSION BUTTON TRIGER POPUP */}
  {
    isThisRoleHasViewRolePermission &&(
          <button
          
         title={`Manage Permission Of ${row?.original?.roleName}`}
        onClick={() => {
          setselectedRoleId(role?.roleId)
          dispatch(setSelectedRole(role))
          dispatch(setIsPermissisonOpened(true))
          setisDropDownDisabled(true)
        }} 
        className="flex items-center gap-2.5 viewParticularUser  cursor-pointer px-4 py-2 text-sm text-gray-800 rounded active:scale-95 transition"
        >
        <IoKey className="text-[var(--adminPrimaryColor)]" />
      </button>
    )
  }
        </div>
    );
  },
},
    ],
    []
  );

  const table = useReactTable({
    data: roles,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

// console.log(selectedRoleId)

    if (loading) {
    return <div className='bg-[var(--loadingMainBg)] min-h-screen flex items-center justify-center'>
      <TinyLoader></TinyLoader>
    </div>;
  }

    if (deleteRoleLoading) {
    return <div className='bg-[var(--loadingMainBg)] min-h-screen flex items-center justify-center'>
      <TinyLoader></TinyLoader>
    </div>;
  }

    if (!permissionOfLoggedInRoleOfUser?.length) {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-6 text-center text-[var(--notFoundTextColor)]  h-screen flex items-center justify-center">
        Role data not found
      </div>
    );
  }


// const selectedUserData = useSelector((state) => state?.userState);


  return (
    <div className="space-y-5">
{/* MODAL POPUP  EIDT*/}
      <Modal
        isModalOpen={isEdit}
        onClose={() => dispatch(setIsEditOpened(false))}
        icon={<FiBarChart2 />}
        title="Update Details"
        description="You can Only Update Role of a User."
        >
       <EditRole roleId={selectedRoleId} ></EditRole>
      </Modal>

            {/* delete ROLE */}
            <Modal
              isModalOpen={isDelete}
              onClose={() => dispatch(setIsDeleteOpened(false))}
              icon={<MdDeleteForever />}
              title="Are You Sure?"
              description="Are You Sure to delete?"

            >
              <div className="flex justify-center gap-[45px]">
                   <button onClick={()=>dispatch(setIsDeleteOpened(false))} type="button" className="px-6 py-2 active:scale-95 transition bg-[var(--deleteIconColor)] rounded text-[var(--whiteText)] text-sm font-medium">No</button>
                     <button onClick={()=> handleDelete()} type="button" className="px-6 py-2 active:scale-95 transition bg-[var(--addBtnBg)] rounded text-[var(--whiteText)] text-sm font-medium">Yes</button>
              </div>
            </Modal>
        {/* MODAL POPUP  PERMISSION POPUP*/}

            <Modal
              isModalOpen={isPermissionOpened}
              onClose={() => dispatch(setIsPermissisonOpened(false))}
              icon={<IoKey />}
              title="Manage Permission"

            >

              <PermissionPage selectedRoleFromRolePage={selectedRoleFromRolePage} isDropDownDisabled={isDropDownDisabled}></PermissionPage>
            </Modal>
      
      <div className="flex justify-between items-center">
        <input
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search Roles..."
          className="w-full md:w-96 px-4 py-2 rounded-lg border border-[#52a9ff] focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="overflow-x-auto border border-gray-200 shadow-sm">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className="px-1 py-3 text-left font-semibold text-gray-600 cursor-pointer select-none"
                  >
                    <div className="flex gap-2">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}

                      <span>
                        {header.column.getIsSorted() === "asc"
                          ? "↑"
                          : header.column.getIsSorted() === "desc"
                          ? "↓"
                          : ""}
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="border-t hover:bg-gray-50 transition"
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-1 py-1">
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>

  <style jsx>{`
        table > thead > tr > th:nth-child(3) {
          display: flex;
          justify-content: flex-end;
        }
      `}</style>

      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm text-gray-500">
          Page <b>{table.getState().pagination.pageIndex + 1}</b> of{" "}
          <b>{table.getPageCount()}</b>
        </p>

        <div className="flex gap-2">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="px-4 py-2 rounded-lg border disabled:opacity-50"
          >
            Prev
          </button>

          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="px-4 py-2 rounded-lg border disabled:opacity-50"
          >
            Next
          </button>
        </div>

        <select
          value={table.getState().pagination.pageSize}
          onChange={(e) => table.setPageSize(Number(e.target.value))}
          className="border rounded-lg px-3 py-2"
        >
          {[10, 20, 50].map((size) => (
            <option key={size} value={size}>
              {size} rows
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

