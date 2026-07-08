"use client";
import { getAllBidForm } from '@/app/(bid)/redux/slices/bids/bidFormSlice';
import TinyLoader from '@/components/reusable/loader/TinyLoader';
import useDebounce from '@/utils/debounceSearch';
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import Link from 'next/link';
import React, { useEffect, useMemo, useState } from 'react'
import {
  FiEdit2,
  FiTrash2,
  FiUsers,
} from "react-icons/fi";
import { useDispatch, useSelector } from 'react-redux';
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { HiOutlinePlus, HiOutlineUserGroup } from 'react-icons/hi';
import { VscGitStashApply } from 'react-icons/vsc';
import { getRolePermissionLoggedInUser } from '@/app/(bid)/redux/slices/rolesAndPermissionSlice';
import { hasPermission } from '@/helper/helper';
import { RiAuctionFill } from 'react-icons/ri';




const page = () => {
const dispatch = useDispatch();
const router = useRouter();
const pathname = usePathname();

  const allBids = useSelector((state) => state?.bidForm?.allBidFormFromDb?.bids ??  []);  //all bids object
  const allBidsLoading = useSelector((state) => state?.bidForm?.allBidFormLoading);  //all loading state


// console.log(allBids, "allBids")

  const searchParams = useSearchParams();

const [bidPage, setbidPage] = useState(
  Number(searchParams.get("page")) || 1
);
const [limit, setLimit] = useState(
  Number(searchParams.get("limit")) || 4
);

const [bidSearch, setbidSearch] = useState(
  searchParams.get("search") || ""
);




  const total = useSelector((state) => state?.bidForm?.allBidFormFromDb?.pagination?.total);  //Total Bid
  const hasNextPage = useSelector((state) => state?.bidForm?.allBidFormFromDb?.pagination?.hasNextPage);  //Has Nexdt
  const hasPreviousPage = useSelector((state) => state?.bidForm?.allBidFormFromDb?.pagination?.hasPreviousPage);  //Has Previous
  const totalPages = useSelector((state) => state?.bidForm?.allBidFormFromDb?.pagination?.totalPages);  //Total page


    const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const [dateFilter, setDateFilter] = useState({
  from: "",
  to: "",
});



//   debouncing search | only when user typing stop for 4 seconds 
const debouncedSearch = useDebounce(bidSearch, 2000);

  //FIRST : check if logged in role has permission to view bid or not 
  //FIRST : fetch permissions on mount
  useEffect(() => {
    dispatch(getRolePermissionLoggedInUser({}));
  }, [dispatch]);
  
  const permissionOfLoggedInRoleOfUser = useSelector((state) => state?.roleAndPermission?.permissionOfLoggedInRoleOfUser);
  const loading = useSelector((state) => state.roleAndPermission?.loadingOfGetRolePermission);
  
  const canViewBid = hasPermission(permissionOfLoggedInRoleOfUser, "view_bid");
  const canCreateBid = hasPermission(permissionOfLoggedInRoleOfUser, "create_bid");
  
  // only "true" once permission data has actually arrived
  const permissionChecked = !loading && !!permissionOfLoggedInRoleOfUser;
  const hasBidAccess = canViewBid && canCreateBid;
  
  useEffect(() => {
    if (!permissionChecked) return;
    if (!hasBidAccess) {
      router.replace("/forbidden");
    }
  }, [permissionChecked, hasBidAccess, router]);
  //   check if logged in role has permission to view bid or not END
  
  // SECOND :Fetch only when permission exists
  // SECOND: fetch bids only when access is confirmed
  useEffect(() => {
    if (!permissionChecked || !hasBidAccess) return;
  
    dispatch(
      getAllBidForm({
        bidPage,
        bidSearch: debouncedSearch,
        limit,
        from: dateFilter.from,
        to: dateFilter.to,
      })
    );
  }, [
    permissionChecked,
    hasBidAccess,
    bidPage,
    debouncedSearch,
    limit,
    dateFilter.from,
    dateFilter.to,
    dispatch,
  ]);
  // Fetch only when permission exists END 
  // -----------------------------------------------------

  // CHANGE URL 
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
  
    params.set("page", bidPage);
  
    params.set("limit", limit);
    if (debouncedSearch.trim()) {
      params.set("search", debouncedSearch);
    } else {
      params.delete("search");
    }
  
    params.set("from", dateFilter.from);
  params.set("to", dateFilter.to);
  
    router.replace(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  }, [bidPage, debouncedSearch, limit, dateFilter.from, dateFilter.to]);
  // CHANGE URL END

const columns = useMemo(
  () => [
    {
      id: "serial",
      header: "#",
      cell: ({ row, table }) =>
        row.index +
        1 +
        table.getState().pagination.pageIndex *
          table.getState().pagination.pageSize,
    },

    {
      accessorKey: "title",
      header: "Bid Title",
      cell: ({ row }) => (
        <div className="min-w-[220px]">
          <p className="font-semibold twoLinePara text-[var(--blackText)]">
            {row.original.title}
          </p>

          <p className="text-xs text-gray-500 twoLinePara">
            {row.original.description}
          </p>
        </div>
      ),
    },

    {
      accessorKey: "publishDate",
      header: "Publish Date",
      cell: ({ getValue }) =>
        new Date(getValue()).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
    },

    {
      accessorKey: "openDate",
      header: "Open Date",
      cell: ({ getValue }) =>
        new Date(getValue()).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }),
    },

    {
      accessorKey: "status",
      header: "Status",
      cell: ({ getValue }) => {
        const status = getValue();

        return (
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold MedTextSize
            ${
              status == "ACTIVE"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-600"
            }`}
          >
            {status}
          </span>
        );
      },
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
        const bid = row?.original;

        return (
          <div className="flex items-center gap-2">

{
  row?.original?.applicationStatus && row?.original?.applicationId && (
<div className='flex flex-col gap-[3px]'>
  <button className='bg-gray-300 px-2 text-[15px] py-0 rounded-md cursor-not-allowed opacity-50" disabled' title='You Already Applied'>Applied</button>
  <button className='bg-gray-300 px-2 text-[15px] py-0 rounded-md cursor-not-allowed opacity-50" disabled' title='Neither Won nor Rejected'>{row?.original?.applicationStatus}</button>

</div>    
  )
}
{
  !row?.original?.applicationStatus && !row?.original?.applicationId && (
                <Link
              href={`/dashboard/manage/bids/apply/${bid.id}`}
              // href={`/dashboard/manage/bids/${bid.id}/bidders`}
              className="h-9 w-9 rounded-full bg-[var(--iconBgColro)] hover:scale-105 flex items-center justify-center transition"
              title='Apply Bid'
            >
              <VscGitStashApply
                className="text-lg text-[var(--iconColor)]"
              />
            </Link>
  )
}

          </div>
        );
      },
    },
  ],
  []
);

// table 
  const table = useReactTable({
    data: allBids,
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



if (!permissionChecked) {
  return (
    <div className='bg-[var(--loadingMainBg)] min-h-screen flex items-center justify-center'>
      <TinyLoader />
    </div>
  );
}

if (!hasBidAccess) {
  // redirect is already in-flight via the effect above
  return null;
}
if (allBidsLoading) {
  return (
    <div className='bg-[var(--loadingMainBg)] min-h-screen flex items-center justify-center'>
      <TinyLoader />
    </div>
  );
}
  return (


<>
        <header className="flex  sm:px-6 lg:px-8 py-6 flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-1">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 flex items-center gap-3">
              <HiOutlineUserGroup className="text-indigo-600 w-8 h-8" />
              List of Bids
            </h1>
     <div>
               <p className="text-slate-500 mt-1 text-sm sm:text-base">
             Explore bids
            </p>
               <p className="text-slate-500 mt-1 text-sm sm:text-base">
           Total Bid Created So Far: <span className='text-[#00aa00]'> {total}</span>
            </p>
     </div>
          </div>
      
          {
            1==1 &&     <Link
            href="applied"
            
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl sm:rounded-2xl font-bold shadow-lg flex items-center gap-2 transition-all hover:scale-105 w-full sm:w-auto justify-center text-sm sm:text-base"
          >
            <RiAuctionFill className="w-5 h-5" />
           View Your Applied
          </Link>
          }
        </header>


{/* SEARCH | FROM | TO  */}
<div className="mb-6 flex px-4 rounded-[6px] pt-2 pb-2 flex-wrap items-end bg-gray-200 gap-4">

  {/* Search */}
  <div className="flex-1 min-w-[260px]">
    <label className="mb-2 block text-sm font-medium text-[var(--blackText)]">
      Search Bid
    </label>

    <input
      type="text"
      value={bidSearch}
      onChange={(e) => {
        setbidSearch(e.target.value);
        setbidPage(1);
      }}
      placeholder="Search bids..."
      className="h-11 w-full rounded-lg border border-[#52a9ff] px-4 outline-none transition focus:ring-2 focus:ring-blue-500"
    />
  </div>

  {/* From Date */}
  <div className="min-w-[180px]">
    <label className="mb-2 block text-sm font-medium text-[var(--blackText)]">
      From Date
    </label>

    <input
      type="date"
      value={dateFilter.from}
      onChange={(e) =>
        setDateFilter((prev) => ({
          ...prev,
          from: e.target.value,
        }))
      }
      className="h-11 w-full rounded-lg border border-gray-300 px-3 outline-none transition focus:border-[var(--adminPrimaryColor)] focus:ring-2 focus:ring-purple-100"
    />
  </div>

  {/* To Date */}
  <div className="min-w-[180px]">
    <label className="mb-2 block text-sm font-medium text-[var(--blackText)]">
      To Date
    </label>

    <input
      type="date"
      value={dateFilter.to}
      onChange={(e) =>
        setDateFilter((prev) => ({
          ...prev,
          to: e.target.value,
        }))
      }
      className="h-11 w-full rounded-lg border border-gray-300 px-3 outline-none transition focus:border-[var(--adminPrimaryColor)] focus:ring-2 focus:ring-purple-100"
    />
  </div>

  {/* Buttons */}
  <div className="flex gap-3 flex-wrap">

{
    dateFilter.to || dateFilter.from ||  bidSearch && (
            <button
      onClick={() =>
   {
         setDateFilter({
          from: "",
          to: "",
        })
        setbidSearch("")
   }
      }
      className="h-11 text-[var(--deleteIconColor)] rounded-lg border border-gray-300 px-5 font-medium transitionbg-[var(--deleteIconBg)] hover:bg-[var(--deleteIconBgHOver)]"
    >
      Clear
    </button>
    )
}


  </div>

</div>

  <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">



  <table className="min-w-full">

    <thead className="sticky top-0 bg-gray-50 z-10">

      {table.getHeaderGroups().map((headerGroup) => (
        <tr key={headerGroup.id}>

          {headerGroup.headers.map((header) => (
            <th
              key={header.id}
              onClick={header.column.getToggleSortingHandler()}
              className="px-5 py-4 text-left text-sm font-semibold text-gray-600 whitespace-nowrap cursor-pointer"
            >
              <div className="flex items-center gap-2">

                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}

                {{
                  asc: "↑",
                  desc: "↓",
                }[header.column.getIsSorted()] ?? null}

              </div>
            </th>
          ))}

        </tr>
      ))}

    </thead>

    <tbody>

      {table?.getRowModel()?.rows?.length ? (
        table?.getRowModel()?.rows.map((row) => (
          <tr
            key={row.id}
            className="odd:bg-white even:bg-gray-50 hover:bg-blue-50 transition"
          >
            {row.getVisibleCells().map((cell) => (
              <td
                key={cell.id}
                className="px-5 py-4 max-w-[220px] text-sm whitespace-nowrap"
              >
                {flexRender(
                  cell.column.columnDef.cell,
                  cell.getContext()
                )}
              </td>
            ))}
          </tr>
        ))
      ) : (
        <tr>
          <td
            colSpan={columns.length}
            className="py-14 text-center text-[var(--notFoundTextColor)]"
          >
            No bids found.
          </td>
        </tr>
      )}

    </tbody>

  </table>


{/* pagination  */}
<div className="mt-6 px-5 py-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

  <p className="text-sm text-[var(--greyText)]">
    Page <span className="font-semibold text-black">{bidPage}</span> of{" "}
    <span className="font-semibold text-black">{totalPages}</span>
  </p>

  <div className="flex items-center gap-2">


<button
  disabled={!hasPreviousPage}
  onClick={() => {
    if (hasPreviousPage) {
      setbidPage((prev) => prev - 1);
    }
  }}
  className={`
    rounded-lg px-4 py-2 font-medium transition-all duration-200 border
    ${
      hasPreviousPage
        ? "bg-[var(--adminPrimaryColor)] text-white border-[var(--adminPrimaryColor)] hover:opacity-90 active:scale-95 cursor-pointer"
        : "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed opacity-70"
    }
  `}
>
   ← Prev
</button>

<button
  disabled={!hasNextPage}
  onClick={() => {
    if (hasNextPage) {
      setbidPage((prev) => prev + 1);
    }
  }}
  className={`
    rounded-lg px-4 py-2 font-medium transition-all duration-200 border
    ${
      hasNextPage
        ? "bg-[var(--adminPrimaryColor)] text-white border-[var(--adminPrimaryColor)] hover:opacity-90 active:scale-95 cursor-pointer"
        : "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed opacity-70"
    }
  `}
>
  Next →
</button>
        


  </div>

  <select value={limit} onChange={(e) => setLimit(Number(e.target.value))} className="rounded-lg border px-3 py-2">
    <option value={4}>4 rows</option>
    <option value={10}>10 rows</option>
    <option value={20}>20 rows</option>
    <option value={50}>50 rows</option>
  </select>

</div>
</div>

</>

  )
}

export default page