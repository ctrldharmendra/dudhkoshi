const { pool } = require("../db");
const ApiError = require("../utils/ApiErrors");
const asyncHandler = require("../utils/asyncHandler");

// RETURN USER NAME WITH ITS ALL PERMISSION 
 
const returnRolePermissionOfLoggedIn = async (req, res)=>{
    const loggedInUserRoleId = req?.user?.role_id;  //Logged In User Role Id

const [rows] = await pool.query(
    `SELECT 
    p.id AS permission_id,
    p.name AS permission_name,
    p.description
FROM role_permissions rp
INNER JOIN permissions p
    ON rp.permission_id = p.id
WHERE rp.role_id = ?`,
    [loggedInUserRoleId]
);

return rows
}

// RETURN IF THE USER EXIST OR NOT IN DATABASE 
const doesUserExist = async (req, res)=>{
    const {id} = req?.params;

    const [exists] = await pool.query(  //the one for whom permission is beign assigned. 
    `
    SELECT id, name
    FROM users
    WHERE id = (?)
    `,
    [id]
);
return exists;
}


const returnRole = async (req, res)=>{
    const {roleId} = req?.params;
    const [row] = await pool.query(
        `SELECT name FROM roles WHERE id = ?`,
        [roleId]
    )
  return row
}
module.exports={
    returnRolePermissionOfLoggedIn,
    doesUserExist,
    returnRole,
}