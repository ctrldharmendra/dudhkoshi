
"use client"
import { useState, useEffect, useRef } from 'react'
import { FiChevronDown, FiX } from 'react-icons/fi'

const RoleFilterDropdown = ({ users = [], onRoleSelect }) => {
  const [isOpen, setIsOpen]       = useState(false)
  const [selectedRole, setSelectedRole] = useState(null)
  const dropdownRef = useRef(null)

  // Extract unique roles from users array automatically
  const roles = [...new Set(users.map(u => u.roleName).filter(Boolean))]

const handleSelect = (role) => {
  console.log("Clicked role:", role);

  setSelectedRole(role);
  onRoleSelect(role);
  setIsOpen(false);
};

  const handleClear = () => {
    setSelectedRole(null)
    onRoleSelect(null)   // null = show all
    setIsOpen(false)
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={dropdownRef} className="relative">

      {/* Trigger button */}
      <button
        onClick={() => setIsOpen(prev => !prev)}
        className="flex items-center gap-2 px-4 py-2 rounded-[4px] border border-[#52a9ff] bg-white text-sm font-medium text-gray-700 hover:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[150px] justify-between"
      >
        <span className={selectedRole ? "text-gray-900" : "text-gray-400"}>
          {selectedRole || "Filter by Role"}
        </span>

        <div className="flex items-center gap-1">

          {selectedRole && (
            <FiX
              size={14}
              className="text-gray-400 hover:text-red-500 transition-colors"
              onClick={(e) => {
                e.stopPropagation() 
                handleClear()
              }}
            />
          )}
          <FiChevronDown
            size={14}
            className={`text-gray-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          />
        </div>
      </button>

      {/* Dropdown list */}
      {isOpen && (
        <div className="absolute z-20 mt-1 w-full min-w-[160px] rounded-xl border border-slate-200 shadow-lg overflow-hidden bg-white">

          {/* All roles option */}
          <button
            onClick={handleClear}
            className={`w-full text-left px-4 py-2.5 text-sm hover:bg-indigo-50 transition-colors ${
              !selectedRole
                ? "font-semibold text-indigo-600 bg-indigo-50"
                : "text-gray-700"
            }`}
          >
            All Roles
          </button>


          {roles.map((role) => (
            <button
              key={role}
              onClick={() => handleSelect(role)}
              className={`w-full text-left px-4 py-2.5 text-sm capitalize hover:bg-indigo-50 transition-colors ${
                selectedRole === role
                  ? "font-semibold text-indigo-600 bg-indigo-50"
                  : "text-gray-700"
              }`}
            >
              {role}
            </button>
          ))}

          {roles.length === 0 && (
            <p className="px-4 py-3 text-xs text-gray-400">No roles found</p>
          )}

        </div>
      )}
    </div>
  )
}

export default RoleFilterDropdown