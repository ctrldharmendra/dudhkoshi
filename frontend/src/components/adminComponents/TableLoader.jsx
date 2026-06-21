const TableLoader = () => {
  const rows = Array.from({ length: 7 });

  return (
    <div className="space-y-5 animate-pulse">

      {/* Search Skeleton */}
      <div className="w-full md:w-96 h-10 bg-slate-200 rounded-lg" />


      {/* Table Skeleton */}
      <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-sm">

        <table className="min-w-full text-sm">

          {/* Header */}
          <thead className="bg-slate-100">
            <tr>
              {[
                "ID",
                "Name",
                "Email",
                "Gender",
                "Role",
                "DOB",
                "Created",
              ].map((item) => (
                <th
                  key={item}
                  className="px-5 py-3 text-left font-semibold text-slate-500"
                >
                  {item}
                </th>
              ))}
            </tr>
          </thead>


          {/* Body */}
          <tbody>

            {rows.map((_, index) => (

              <tr
                key={index}
                className="border-t border-slate-200"
              >

                {/* ID */}
                <td className="px-5 py-4">
                  <div className="h-4 w-6 rounded bg-slate-200" />
                </td>


                {/* Name */}
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">

                    <div className="w-9 h-9 rounded-full bg-slate-200" />

                    <div className="space-y-2">
                      <div className="h-3 w-24 bg-slate-200 rounded" />
                      <div className="h-2 w-32 bg-slate-100 rounded" />
                    </div>

                  </div>
                </td>


                {/* Email */}
                <td className="px-5 py-4">
                  <div className="h-3 w-28 bg-slate-200 rounded" />
                </td>


                {/* Gender */}
                <td className="px-5 py-4">
                  <div className="h-3 w-16 bg-slate-200 rounded" />
                </td>


                {/* Role */}
                <td className="px-5 py-4">
                  <div className="h-6 w-16 bg-slate-200 rounded-full" />
                </td>


                {/* DOB */}
                <td className="px-5 py-4">
                  <div className="h-3 w-20 bg-slate-200 rounded" />
                </td>


                {/* Created */}
                <td className="px-5 py-4">
                  <div className="h-3 w-24 bg-slate-200 rounded" />
                </td>


              </tr>

            ))}


          </tbody>

        </table>

      </div>


      {/* Pagination Skeleton */}
      <div className="flex justify-between items-center">

        <div className="h-4 w-32 bg-slate-200 rounded" />


        <div className="flex gap-3">

          <div className="h-9 w-20 bg-slate-200 rounded-lg" />

          <div className="h-9 w-20 bg-slate-200 rounded-lg" />

        </div>


        <div className="h-9 w-24 bg-slate-200 rounded-lg" />

      </div>


    </div>
  );
};


export default TableLoader;