import { getRoleCounts } from "@/helper/helper";
import { FaUserCog } from "react-icons/fa";
import { HiOutlineUserGroup } from "react-icons/hi";

const AllRoleUserCount = ({users}) => {

  const howManyRole = users ? getRoleCounts(users) : {};

  // console.log(howManyRole)

  return (
    <>
      {/* Total Users */}
      <div className="bg-white rounded-xl sm:rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">
              Total Users
            </p>

            <p className="text-2xl sm:text-3xl font-bold text-slate-800 mt-1">
              {users?.length || 0}
            </p>
          </div>

          <div className="bg-indigo-50 text-indigo-600 rounded-lg p-3">
            <HiOutlineUserGroup className="w-6 h-6 sm:w-8 sm:h-8" />
          </div>
        </div>
      </div>


      {/* Dynamic Roles */}
      {Object.entries(howManyRole).map(([role, count]) => (
        <div
          key={role}
          className="bg-white rounded-xl sm:rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-5"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500 capitalize">
                {role}
              </p>

              <p className="text-2xl sm:text-3xl font-bold text-slate-800 mt-1">
                {count}
              </p>
            </div>

            <div className="bg-blue-50 text-blue-600 rounded-lg p-3">
              <FaUserCog className="w-6 h-6 sm:w-8 sm:h-8" />
            </div>
          </div>
        </div>
      ))}
    </>
  )
}


export default AllRoleUserCount;