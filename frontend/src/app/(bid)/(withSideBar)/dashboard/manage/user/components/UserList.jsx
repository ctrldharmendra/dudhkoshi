"use client";

import { setSelectedUser } from "@/app/(bid)/redux/slices/stateSlice";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import Link from "next/link";

import { useMemo, useState } from "react";
import { TbEyeSearch } from "react-icons/tb";
import { useDispatch, useSelector } from 'react-redux';

export default function UserList({ users }) {
  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const dispatch = useDispatch();

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
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <div>
              <p className="font-medium">{row.original.name}</p>
              <p className="text-xs text-gray-900">{row.original.email}</p>
            </div>
          </div>
        ),
      },
      {
        accessorKey: "email",
        header: "Email",
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <div>
              <p className="text-xs text-gray-900">{row.original.email}</p>
            </div>
          </div>
        ),
      },
      {
        accessorKey: "gender",
        header: "Gender",
      },
      {
        accessorKey: "roleName",
        header: "Role",
        cell: ({ getValue }) => {
          const role = getValue();
          return (
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                role === "admin"
                  ? "bg-purple-100 text-purple-700"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              {role}
            </span>
          );
        },
      },
      {
        accessorKey: "date_of_birth",
        header: "DOB",
        cell: ({ getValue }) =>
          new Date(getValue()).toLocaleDateString("en-GB"),
      },
      {
        accessorKey: "created_at",
        header: "Created",
        cell: ({ getValue }) =>
          new Date(getValue()).toLocaleDateString("en-GB"),
      },
      {
  header: "Actions",
  cell: ({ row }) => {
    const user = row.original;
console.log(user)
    return (
      <Link
        href={`/dashboard/manage/user/${user?.userId}`}
        onClick={() => dispatch(setSelectedUser(user))}
        className="flex items-center gap-2.5 border border-gray-500/30 px-4 py-2 text-sm text-gray-800 rounded active:scale-95 transition"
      >
        <TbEyeSearch className="text-[var(--adminPrimaryColor)]" />
    View
      </Link>
    );
  },
},
    ],
    []
  );

  const table = useReactTable({
    data: users,
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




const selectedUserData = useSelector((state) => state?.userState);

console.log(selectedUserData)

  return (
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
                    className="px-5 py-3 text-left font-semibold text-gray-600 cursor-pointer select-none"
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
                  <td key={cell.id} className="px-5 py-4">
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
  );
}