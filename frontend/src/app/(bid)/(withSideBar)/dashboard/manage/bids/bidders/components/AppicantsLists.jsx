"use client";

import { getApplicantsToParticularBid } from "@/app/(bid)/redux/slices/bids/bidApplicationSlice";
import { setSelectedUser } from "@/app/(bid)/redux/slices/stateSlice";
import TinyLoader from "@/components/reusable/loader/TinyLoader";
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
import { TbEyeSearch } from "react-icons/tb";
import { useDispatch, useSelector } from 'react-redux';

export default function ApplicantsLists({ bid}) {
  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const applicantToParticularBid = useSelector((state) => state?.bidApplication?.applicantsToParticularBid);  //applicantToParticularBid
  const applicantsToParticularBidLoading = useSelector((state) => state?.bidApplication?.applicantsToParticularBidLoading);  //applicantToParticularBid Loading



  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getApplicantsToParticularBid({bid}))
  }, [])
  

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
        accessorKey: "applicant_name",
        header: "Name",
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <div>
              <p className="font-medium">{row.original.applicant_name}</p>         
            </div>
          </div>
        ),
      },
      {
        accessorKey: "applicant_email",
        header: "Email",
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <div>
              <p className="text-xs text-gray-900">{row.original.applicant_email}</p>
            </div>
          </div>
        ),
      },
      {
        accessorKey: "applicant_gender",
        header: "Gender",
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <div>
              <p className="text-xs text-gray-900">{row.original.applicant_gender}</p>
            </div>
          </div>
        ),
      },
      {
        accessorKey: "applicant_organization_name",
        header: "Applicant Org. Name",
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <div>
              <p className="text-xs text-gray-900">{row.original.applicant_organization_name}</p>
            </div>
          </div>
        ),
      },

      {
  header: "Actions",
  cell: ({ row }) => {
    console.log(row.original, "ROW ")
    const user = row.original;
// console.log(user)
    return (
      <Link
      // /dashboard/manage/bids/bidders?bid=${bid.id}
        href={`/dashboard/manage/applicant/documents?bid=${bid}&id=${row?.original?.applicationId}`}
        onClick={() => dispatch(setSelectedUser(user))}
        className="flex items-center gap-2.5 viewParticularUser w-fit px-4 py-2 text-gray-800 rounded active:scale-95 transition"
      >
        <TbEyeSearch className="text-[var(--adminPrimaryColor)]" />
      </Link>
    );
  },
},
    ],
    []
  );

  const table = useReactTable({
    data: applicantToParticularBid,
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

// console.log(!applicantToParticularBid.length)
if(!applicantToParticularBid?.length){
 return  <div className="flex justify-center items-center text-[22px] md:text-[20px] text-[var(--deleteIconColor)] min-h-[200px]">

    No Any Applicants To this Bid yet.
  </div>
}


if (applicantsToParticularBidLoading) {
  return <div className='bg-[var(--loadingMainBg)] min-h-screen flex items-center justify-center'>
   <TinyLoader></TinyLoader>
  </div>;
}

// const selectedUserData = useSelector((state) => state?.userState);



  return (
  <div className="pt-[12px]">
          <h2 className="text-lg font-bold text-[var(--adminPrimaryColor)]">
          List of Applicants Applied to this Bid
        </h2>
    <div className="space-y-5">
      <div className="flex justify-between items-center">
        <input
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search users..."
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
  </div>

  );
}