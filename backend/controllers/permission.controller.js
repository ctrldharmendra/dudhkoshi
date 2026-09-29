const asyncHandler = require("../utils/asyncHandler")
const ApiError = require("../utils/ApiErrors")
const ApiResponse = require("../utils/ApiResponse")
const { pool } = require("../db")
const path = require('path')
const fs = require('fs')
const helper = require('../helper/helper');

// ADD PERMISSION TO PARTICULAR ROlE 
const addPermission = asyncHandler(async (req, res)=>{
    try {    
        // check if this role exists or not in db    
const doesThisRoleExists = await helper.returnRole(req, res);
if(!doesThisRoleExists.length>=1) return res.json(new ApiError(404, [],'this role doesnt exisit')) 


    const roleWithPermission = await helper.returnRolePermissionOfLoggedIn(req, res);
  if(!roleWithPermission || roleWithPermission.length<=0) return res.json(new ApiResponse(403, "No Any Permission found!"))

    // if no "add_permission" permission then show error 
const hasAddPermissionAccess = roleWithPermission.some(
    p => p.permission_name === 'add_permission'
);
if(!hasAddPermissionAccess) return res.json(new ApiError(403, [],"No Permission To Add Permission."))


    const {roleId} = req?.params;   //the role for which permission being add 
    const { permissions } = req?.body;

// multiple permission values 
    const values = permissions?.map(permission_id => [
    roleId,
    permission_id,
]);
// if selected permission deosnt exist 
const [existingPermissions] = await pool.query(
    `
    SELECT id 
    FROM permissions
    WHERE id IN (?)
    `,
    [permissions]
);
if(existingPermissions?.length<=0){
    return res.json(new ApiError(404, [], "this permission NOt Foound"))
}

// role_id
// permission_id

const [result] = await pool.query(
    `
    INSERT INTO role_permissions
    (role_id, permission_id)
    VALUES ?
    `,
    [values]
);
// get roleName for what role permission added just to show 
const roleName =  await helper.returnRole(req, res)
return res.json(new ApiResponse(201, result, `You added Permission for ${roleName[0]?.name}`))


        } catch (error) {
          if (error.code === 'ER_DUP_ENTRY') {
        return res.status(409).json(
            new ApiError(
                409,
                [],
                "User already has This Permission"
            )
        );
    }
    }

})

// DELETE PERMISSION FOR PARTICULAR ROLE 
const deletePermission = asyncHandler(async (req, res)=>{
    try {
  
        // check if this role exists or not in db    
const doesThisRoleExists = await helper.returnRole(req, res);
if(!doesThisRoleExists.length>=1) return res.json(new ApiError(404, [],'this role doesnt exisit')) 


     const roleWithPermission = await helper.returnRolePermissionOfLoggedIn(req, res);
  if(!roleWithPermission || roleWithPermission.length<=0) return res.json(new ApiResponse(403, "No Any Permission found!"))

    // if no "delete_permission" permission then show error 
const hasDeletePermissionAccess = roleWithPermission.some(
    p => p.permission_name === 'delete_permission'
);
if(!hasDeletePermissionAccess) return res.json(new ApiError(403, [],"No Permission To Delete Permission."))

    const { permissions } = req?.body;   //get data from frontend
    // console.log(permissions)

// //    verify requested permission exist in table or not  | the one which requested to be removed
 const [existingPermissions] = await pool.query(
    `
    SELECT id 
    FROM permissions
    WHERE id IN (?)
    `,
    [permissions]
);
if(existingPermissions?.length<=0){
    return res.json(new ApiError(404, [], "this permission NOt Foound In Database"))
}
// //    Check assignment exists | Suppose frontend says:
//           // Remove permission 3 from admin
//           // But admin never had permission 3.
        const {roleId} = req?.params;
const [requestedPermissionContains] = await pool.query(
    `
    SELECT
        role_id,
        permission_id
    FROM role_permissions
    WHERE role_id = ?
    AND permission_id IN (?)
    `,
    [roleId, permissions]
);
// // get selected permission id 
const permissionIds = requestedPermissionContains.map(
    p => p.permission_id
);
console.log(permissionIds)
if (!permissionIds.length) {
    return res.status(400).json({
        message: "This permission has not assigned Yet."
    });
}

// // finally delet the permission 
const [result] = await pool.query(
    'DELETE FROM role_permissions where role_id = ? AND permission_id IN (?)',
    [roleId, permissionIds]
)

       const roleName =  await helper.returnRole(req, res)
       return res.status(200).json(new ApiResponse(200, result, `You Removed Permission for ${roleName[0]?.name}`))


    } catch (error) {
        
    }
})


const viewPermissionOfLoggedInUser = asyncHandler(async (req, res)=>{
    try {

//      const roleWithPermission = await helper.returnRolePermissionOfLoggedIn(req, res);
//   if(!roleWithPermission || roleWithPermission.length<=0) return res.json(new ApiResponse(403, "No Any Permission found!"))

//     // if no "delete_permission" permission then show error 
// const hasViewPermissionAccess = roleWithPermission.some(
//     p => p.permission_name === 'view_perssion'
// );
// if(!hasViewPermissionAccess) return res.json(new ApiError(403, [],"No Permission To View Permission."))

    const loggedInUserRoleId = req?.user?.role_id;

// permission of a role 
    const [row] = await pool.query(
        `  SELECT
    p.name AS permissionName
  FROM permissions p
  JOIN role_permissions rp
    ON rp.permission_id = p.id
  WHERE rp.role_id = ?
  `,
  [loggedInUserRoleId]
    )

    return res.json(new ApiResponse(200, row, "Permission Of This role"))


    } catch (error) {
        
    }
})


const getAllPermission = asyncHandler(async (req, res)=>{
             const roleWithPermission = await helper.returnRolePermissionOfLoggedIn(req, res);
        if(!roleWithPermission || roleWithPermission.length<=0) return res.json(new ApiResponse(403, "No Any Permission found!"))

    // if no "view_Permission" permission then show error 
const hasViewPermissionAccess = roleWithPermission.some(
    p => p.permission_name === 'view_Permission'
);
if(!hasViewPermissionAccess) return res.json(new ApiError(403, [],"No Permission To View Permission."))

    const [result] = await pool.query(
        `SELECT * FROM permissions`
    )
// console.log(result)
    return res.json(new ApiResponse(200, result, "All Permissions"))

})



module.exports = {
    addPermission,
    deletePermission,
    viewPermissionOfLoggedInUser,
    getAllPermission,
}