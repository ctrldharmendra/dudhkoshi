

"use client";
import { getAllActiveNonAwardedBid, getAllBidForm } from '@/app/(bid)/redux/slices/bids/bidFormSlice';
import TinyLoader from '@/components/reusable/loader/TinyLoader';
import useDebounce from '@/utils/debounceSearch';
import { flexRender, getCoreRowModel, getFilteredRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';
import Link from 'next/link';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { HiOutlineUserGroup } from 'react-icons/hi';
import { VscGitStashApply } from 'react-icons/vsc';
import { getRolePermissionLoggedInUser } from '@/app/(bid)/redux/slices/rolesAndPermissionSlice';
import { hasPermission } from '@/helper/helper';
import { RiAuctionFill } from 'react-icons/ri';

// Reference-stable fallback array defined outside component
const EMPTY_BIDS = [];

const Page = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Reference stable fallback
  const allBids = useSelector((state) => state?.bidForm?.activeBids?.bids) ?? EMPTY_BIDS;
  const allBidsLoading = useSelector((state) => state?.bidForm?.activeBidLoading);

  const [bidPage, setbidPage] = useState(Number(searchParams.get("page")) || 1);
  const [limit, setLimit] = useState(Number(searchParams.get("limit")) || 4);
  const [bidSearch, setbidSearch] = useState(searchParams.get("search") || "");

  const total = useSelector((state) => state?.bidForm?.activeBids?.pagination?.total);
  const hasNextPage = useSelector((state) => state?.bidForm?.activeBids?.pagination?.hasNextPage);
  const hasPreviousPage = useSelector((state) => state?.bidForm?.activeBids?.pagination?.hasPreviousPage);
  const totalPages = useSelector((state) => state?.bidForm?.activeBids?.pagination?.totalPages ?? 1);

  const [sorting, setSorting] = useState([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [dateFilter, setDateFilter] = useState({ from: "", to: "" });

  const debouncedSearch = useDebounce(bidSearch, 2000);

  console.log(allBids, "JSX")

  // 1. Fetch permissions on mount
  useEffect(() => {
    dispatch(getRolePermissionLoggedInUser({}));
  }, [dispatch]);
  
  const permissionOfLoggedInRoleOfUser = useSelector((state) => state?.roleAndPermission?.permissionOfLoggedInRoleOfUser);
  const loading = useSelector((state) => state.roleAndPermission?.loadingOfGetRolePermission);
  
  const canViewBid = hasPermission(permissionOfLoggedInRoleOfUser, "view_bid");
  const canApplyBid = hasPermission(permissionOfLoggedInRoleOfUser, "apply_bid");
  const permissionChecked = !loading && !!permissionOfLoggedInRoleOfUser;
  
  // 2. Handle unauthorized redirect safely
  useEffect(() => {
    if (permissionChecked && !canViewBid) {
      router.replace("/forbidden");
    }
  }, [permissionChecked, canViewBid, router]);
  
  // 3. Fetch data only when authorized
  useEffect(() => {
    if (!permissionChecked || !canViewBid) return;
  
    dispatch(
      getAllActiveNonAwardedBid({
        bidPage,
        bidSearch: debouncedSearch,
        limit,
        from: dateFilter.from,
        to: dateFilter.to,
      })
    );
  }, [permissionChecked, canViewBid, bidPage, debouncedSearch, limit, dateFilter.from, dateFilter.to, dispatch]);
  
  // 4. Safe URL synchronization without loops
  useEffect(() => {
    if (!permissionChecked || !canViewBid) return; // Don't modify URL if they aren't allowed here

    const nextParams = new URLSearchParams();
    nextParams.set("page", String(bidPage));
    nextParams.set("limit", String(limit));
    
    if (debouncedSearch.trim()) nextParams.set("search", debouncedSearch.trim());
    if (dateFilter.from) nextParams.set("from", dateFilter.from);
    if (dateFilter.to) nextParams.set("to", dateFilter.to);
  
    const currentQuery = searchParams.toString();
    const nextQuery = nextParams.toString();

    if (currentQuery !== nextQuery) {
      router.replace(`${pathname}?${nextQuery}`, { scroll: false });
    }
  }, [bidPage, debouncedSearch, limit, dateFilter.from, dateFilter.to, pathname, router, permissionChecked, canViewBid]);

  const columns = useMemo(() => [
{
  id: "serial",
  header: "#",
  cell: ({ row, table }) => {
    const visibleIndex = table
      .getRowModel()
      .rows.findIndex(r => r.id === row.id);

    return visibleIndex + 1 + (bidPage - 1) * limit;
  },
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
        getValue() ? new Date(getValue()).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }) : "-",
    },
    {
      accessorKey: "openDate",
      header: "Open Date",
      cell: ({ getValue }) =>
        getValue() ? new Date(getValue()).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }) : "-",
    },
    {
      accessorKey: "closeDate",
      header: "Close Date",
      cell: ({ getValue }) =>
        getValue() ? new Date(getValue()).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }) : "-",
    },
    {
      accessorKey: "created_at",
      header: "Created",
      cell: ({ getValue }) =>
        getValue() ? new Date(getValue()).toLocaleDateString("en-GB") : "-",
    },
    {
      header: "Actions",
      cell: ({ row }) => {
        const bid = row?.original;
        const isExpired = bid.closeDate ? new Date() > new Date(bid.closeDate) : false;
        return (
          <div className="flex items-center gap-2">
            {row?.original?.applicationStatus && row?.original?.applicationId &&  row?.original?.award_status !== "AWARDED" &&  (
              <div className='flex flex-col gap-[3px]'>
                <button 
                  className='bg-gray-300 px-2 text-[15px] py-0 rounded-md cursor-not-allowed opacity-50' 
                  disabled 
                  title='You Already Applied'
                >
                  Applied
                </button>
              </div>    
            )}

              {
                row?.original?.award_status === "AWARDED" ?(
                  <Link href={`/dashboard/manage/users/${row?.original?.awarded_to}`} className="" title='See Winner'> 
                    <button className="px-2 text-[15px] py-1 rounded-md bg-green-200 hover:underline cursor-pointer text-green-600 rounded-md">
                      Awarded {row?.original?.isThisAwardedToMe === true ? "(You)" : ""}
                    </button>
                  </Link>
                  ) : !bid.applicationStatus && !bid.applicationId && canApplyBid && !isExpired && (
              <Link
                href={`/dashboard/manage/bids/apply/${bid.id}`}
                className="h-9 w-9 rounded-full bg-[var(--iconBgColro)] hover:scale-105 flex items-center justify-center transition"
                title="Apply Bid"
              >
                <VscGitStashApply className="text-lg text-[var(--iconColor)]" />
              </Link>
            )
              }

            {!bid.applicationStatus && !bid.applicationId && isExpired && (
              <button className="px-2 text-[15px] py-1 rounded-md bg-red-100 text-red-600">
                Bid Closed
              </button>
            )}
          </div>
        );
      },
    },
  ], [canApplyBid, bidPage, limit]);

  const table = useReactTable({
    data: allBids,
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    manualPagination: true,
    pageCount: totalPages,
  });

  // CRITICAL SHORT-CIRCUIT: Handled early so unauthorized trees never evaluate hooks unexpectedly
  if (!permissionChecked) {
    return (
      <div className='bg-[var(--loadingMainBg)] min-h-screen flex items-center justify-center'>
        <TinyLoader />
      </div>
    );
  }

  if (!canViewBid) return null; // Exit early safely; redirect is in motion

  if (allBidsLoading) {
    return (
      <div className='bg-[var(--loadingMainBg)] min-h-screen flex items-center justify-center'>
        <TinyLoader />
      </div>
    );
  }

  return (
    <>
      <header className="flex sm:px-6 lg:px-8 py-6 flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-1">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 flex items-center gap-3">
            <HiOutlineUserGroup className="text-indigo-600 w-8 h-8" />
            List of Bids
          </h1>
          <div>
            <p className="text-slate-500 mt-1 text-sm sm:text-base">Explore and Apply bids</p>
            <p className="text-slate-500 mt-1 text-sm sm:text-base">
              Awarded bid by someone or you, closed bids will not be shown : <span className='text-[#00aa00]'> {total}</span>
            </p>
          </div>
        </div>
        <Link
          href="applied"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl sm:rounded-2xl font-bold shadow-lg flex items-center gap-2 transition-all hover:scale-105 w-full sm:w-auto justify-center text-sm sm:text-base"
        >
          <RiAuctionFill className="w-5 h-5" />
          View Your Applied
        </Link>
      </header>

      {/* FILTER SEARCH BLOCK */}
      <div className="mb-6 flex px-4 rounded-[6px] pt-2 pb-2 flex-wrap items-end bg-gray-200 gap-4">
        <div className="flex-1 min-w-[260px]">
          <label className="mb-2 block text-sm font-medium text-[var(--blackText)]">Search Bid</label>
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
        <div className="min-w-[180px]">
          <label className="mb-2 block text-sm font-medium text-[var(--blackText)]">From Date</label>
          <input
            type="date"
            value={dateFilter.from}
            onChange={(e) => setDateFilter((prev) => ({ ...prev, from: e.target.value }))}
            className="h-11 w-full rounded-lg border border-gray-300 px-3 outline-none transition focus:ring-2 focus:ring-purple-100"
          />
        </div>
        <div className="min-w-[180px]">
          <label className="mb-2 block text-sm font-medium text-[var(--blackText)]">To Date</label>
          <input
            type="date"
            value={dateFilter.to}
            onChange={(e) => setDateFilter((prev) => ({ ...prev, to: e.target.value }))}
            className="h-11 w-full rounded-lg border border-gray-300 px-3 outline-none transition focus:ring-2 focus:ring-purple-100"
          />
        </div>
        <div className="flex gap-3 flex-wrap">
          {(dateFilter.to || dateFilter.from || bidSearch) && (
            <button
              onClick={() => {
                setDateFilter({ from: "", to: "" });
                setbidSearch("");
              }}
              className="h-11 text-[var(--deleteIconColor)] rounded-lg border border-gray-300 px-5 font-medium transition bg-[var(--deleteIconBg)] hover:bg-[var(--deleteIconBgHOver)]"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* TABLE DATA SECTION */}
      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
        <table className="min-w-full">
          <thead className="sticky top-0 bg-gray-50 z-10">
            {table?.getHeaderGroups()?.map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    className="px-5 py-4 text-left text-sm font-semibold text-gray-600 whitespace-nowrap cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {{ asc: "↑", desc: "↓" }[header.column.getIsSorted()] ?? null}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table?.getRowModel()?.rows?.length ? (
              table?.getRowModel()?.rows.map((row) => (
                <tr key={row.id} className="odd:bg-white even:bg-gray-50 hover:bg-blue-50 transition">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-5 py-3 max-w-[220px] text-sm whitespace-nowrap">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="py-14 text-center text-[var(--notFoundTextColor)]">
                  No bids found.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* PAGINATION SECTION */}
        <div className="mt-6 px-5 py-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-[var(--greyText)]">
            Page <span className="font-semibold text-black">{bidPage}</span> of{" "}
            <span className="font-semibold text-black">{totalPages}</span>
          </p>
          <div className="flex items-center gap-2">
            <button
              disabled={!hasPreviousPage}
              onClick={() => hasPreviousPage && setbidPage((prev) => prev - 1)}
              className={`rounded-lg px-4 py-2 font-medium transition-all duration-200 border ${
                hasPreviousPage
                  ? "bg-[var(--adminPrimaryColor)] text-white border-[var(--adminPrimaryColor)] hover:opacity-90 active:scale-95 cursor-pointer"
                  : "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed opacity-70"
              }`}
            >
              ← Prev
            </button>
            <button
              disabled={!hasNextPage}
              onClick={() => hasNextPage && setbidPage((prev) => prev + 1)}
              className={`rounded-lg px-4 py-2 font-medium transition-all duration-200 border ${
                hasNextPage
                  ? "bg-[var(--adminPrimaryColor)] text-white border-[var(--adminPrimaryColor)] hover:opacity-90 active:scale-95 cursor-pointer"
                  : "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed opacity-70"
              }`}
            >
              Next →
            </button>
          </div>
          <select 
            value={limit} 
            onChange={(e) => {
              setLimit(Number(e.target.value));
              setbidPage(1);
            }} 
            className="rounded-lg border px-3 py-2"
          >
            <option value={4}>4 rows</option>
            <option value={10}>10 rows</option>
            <option value={20}>20 rows</option>
            <option value={50}>50 rows</option>
          </select>
        </div>
      </div>
    </>
  );
};

export default Page;