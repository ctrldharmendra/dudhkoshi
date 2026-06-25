

// these function return all permission of logged in user 
export const hasPermission = (permissions, permissionName) => {
    if (!Array.isArray(permissions)) return false;
  return permissions?.some(
    (permission) => permission.permissionName === permissionName
  );
};


// this function returns how many role are thre 
export const getRoleCounts = (users = []) => {
  return users.reduce((acc, user) => {
    const role = user.roleName || "Unknown";

    acc[role] = (acc[role] || 0) + 1;

    return acc;
  }, {});
};