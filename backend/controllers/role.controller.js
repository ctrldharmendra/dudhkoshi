const asyncHandler = require("../utils/asyncHandler")
const ApiError = require("../utils/ApiErrors")
const ApiResponse = require("../utils/ApiResponse")
const { pool } = require("../db")
const path = require('path')
const fs = require('fs')
const helper = require('../helper/helper');






// CREATE A NEW ROLE 
const createRole = asyncHandler(async (req, res)=>{
    try {       
    const roleWithPermission = await helper.returnRolePermissionOfLoggedIn(req, res);
  if(!roleWithPermission || roleWithPermission.length<=0) return res.json(new ApiResponse(403, "No Any Permission found!"))

    // if no "create_role" permission then show error 
const hasCreateRoleAccess = roleWithPermission.some(
    p => p.permission_name === 'create_role'
);
if(!hasCreateRoleAccess) return res.json(new ApiError(403, [],"No Permission To Create Role."))


    const { roleName } = req?.body;  //receive from frontend
    console.log(roleName)

    // check if role already exists in db 
const [existingRole] = await pool.query(
    `SELECT name FROM roles WHERE name = ?`,
    [roleName]
)
if(existingRole?.length>=1){
    return res.json(new ApiError(404, [], "This role is already."))
}


const [result] = await pool.query(
    `INSERT INTO roles (name) VALUES (?)`,
    [roleName]
)

return res.json(new ApiResponse(201, result, `You Created a A Role: ${roleName}`))


        } catch (error) {
          if (error.code === 'ER_DUP_ENTRY') {
        return res.status(409).json(
            new ApiError(
                409,
                [],
                "Role already Exists."
            )
        );
    }
    }

})

// DELETE A ROLE
const deleteRole = asyncHandler(async (req, res)=>{
    const {roleId} = req?.params;  //role to be deleted from url 


    try {
        const roleWithPermission = await helper.returnRolePermissionOfLoggedIn(req, res);
      if(!roleWithPermission || roleWithPermission.length<=0) return res.json(new ApiResponse(403, "No Any Permission found!"))
      
       // if no "delete_role" permission then show error 
      const hasDeleteRoleAccess = roleWithPermission.some(
       p => p.permission_name === 'delete_role'
      );
      if(!hasDeleteRoleAccess) return res.json(new ApiError(403, [],"No Permission To Delete Role."))

        // does this role already exist or not in db
  const doesThisRoleExists = await helper.returnRole(req, res);
if(!doesThisRoleExists.length>=1) return res.json(new ApiError(404, [],'this role doesnt exisit')) 

    // if this role id used somewhere for any user then dont delet 
    const [usersUsingRole] = await pool.query(
  "SELECT COUNT(*) AS count FROM users WHERE role_id = ?",
  [roleId]
);
if (usersUsingRole[0].count > 0) {
  return res.status(400).json({
    message: `Cannot delete role. This role is assigned to users. This role still used by ${usersUsingRole[0].count}`,
  });
}

const [row] = await pool.query(
    `DELETE FROM roles WHERE id = ?`,[roleId]
) 

       return res.status(200).json(new ApiResponse(201, row, `Role Deletion Success.`))


    } catch (error) {
        
    }
})

// GET ALL ROLE 
const getAllRole = asyncHandler(async (req,res)=>{
         const roleWithPermission = await helper.returnRolePermissionOfLoggedIn(req, res);
      if(!roleWithPermission || roleWithPermission.length<=0) return res.json(new ApiResponse(403, "No Any Permission found!"))
      
       // if no "view_role" permission then show error 
      const hasViewRoleAccess = roleWithPermission.some(
       p => p.permission_name === 'view_role'
      );
      if(!hasViewRoleAccess) return res.json(new ApiError(403, [],"No Permission To View Role."))

//         const [roles] = await pool.query(
//             `SELECT
//     r.id AS roleId,
//     r.name AS roleName,
//     rp.permission_id AS permissionAssignedId,
//     p.name AS permissionAssignedName
// FROM roles r
// LEFT JOIN role_permissions rp
//     ON r.id = rp.role_id
// LEFT JOIN permissions p
//     ON rp.permission_id = p.id
// ORDER BY r.id;`
//         );
        const [rows] = await pool.query(
            `SELECT
        r.id AS roleId,
        r.name AS roleName,
        rp.permission_id AS permissionAssignedId,
        p.name AS permissionAssignedName
    FROM roles r
    LEFT JOIN role_permissions rp
        ON r.id = rp.role_id
    LEFT JOIN permissions p
        ON rp.permission_id = p.id
    ORDER BY r.id`
        );

        const rolesWithPermissionInNestetObject = rows.reduce((acc, row) => {
    let role = acc.find(r => r.roleId === row.roleId);

    if (!role) {
        role = {
            roleId: row.roleId,
            roleName: row.roleName,
            permissions: []
        };
        acc.push(role);
    }

    if (row.permissionAssignedId) {
        role.permissions.push({
            permissionAssignedId: row.permissionAssignedId,
            permissionAssignedName: row.permissionAssignedName
        });
    }

    return acc;
}, []);

        return res.json(new ApiResponse(200, rolesWithPermissionInNestetObject, "All Roles"))
})


module.exports = {
    createRole,
    deleteRole,
    getAllRole,
}