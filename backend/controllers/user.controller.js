const asyncHandler = require("../utils/asyncHandler")
const ApiError = require("../utils/ApiErrors")
const ApiResponse = require("../utils/ApiResponse")
const { pool } = require("../db")
const path = require('path')
const fs = require("fs/promises");
const helper = require('../helper/helper');
const { saveFiles } = require("../middlewares/upload")



//   this.statusCode = statusCode;
//         this.data = data;
//         this.message = message;
//         this.success = statusCode < 400
// catch 
//   statusCode, 
//         message =  "Something went wrong",
//         errors = [],


// GET ALL USER 

// GET ALL USERS 
const getAllUser = asyncHandler(async (req, res)=>{
        try {

 const roleWithPermission = await helper.returnRolePermissionOfLoggedIn(req, res);
  if(!roleWithPermission || roleWithPermission.length<=0) return res.json(new ApiResponse(403, "No Any Permission found!"))

    // if no "view_users" permission then show error 
const hasViewUserAccess = roleWithPermission.some(
    p => p.permission_name == 'view_users'
);
if(!hasViewUserAccess) return res.json(new ApiError(403, [],"No Permission To View USER."))



        const [rows] = await pool.query(
            `SELECT 
                dp,
                gender,
                date_of_birth,
                email,
                u.id AS userId,
                u.name AS Name,
                r.name AS roleName,
                r.id AS role_id
                FROM users u
            INNER JOIN roles r
            ON u.role_id = r.id
            WHERE u.isActive = 1;
            `
        );
        return res.status(200).json(new ApiResponse(200, rows, "User fetched successfully."))
        } catch (error) {
            return res.status(500).json(new ApiError(500, `ErorrU.") In getAllUser:` ,error?.message))
        }

})

// DELET USER (BY PARTICULAR USER'S ID)
const deleteUser = asyncHandler(async (req, res)=>{
    try {
 const roleWithPermission = await helper.returnRolePermissionOfLoggedIn(req, res);
  if(!roleWithPermission || roleWithPermission.length<=0) return res.json(new ApiResponse(403, "No Any Permission found!"))

    // if no "delete_user" permission then show error 
const hasDeleteUserAccess = roleWithPermission.some(
    p => p.permission_name == 'delete_user'
);
if(!hasDeleteUserAccess) return res.json(new ApiError(403, [],"No Permission To Delete User."))



        const {id} = req?.params;
       const [rows] = await pool.query('select * from users where id = ?', [id]);

       if(!rows.length){
        return res.status(404).json({success:false, message:"user not found."})
       }

    //    deltee user 
    // await pool.query("delete from users where id = ?", [id])
    //     // delete user dp 
    //    const uploadFolderPath = path.join(__dirname, '..', 'uploads'+"/");
    //    const dpToBeDeleted = uploadFolderPath+rows[0].dp;
    //    if(dpToBeDeleted){
    //     fs.unlink(dpToBeDeleted, (err)=>{
    //         if(err) console.error("failed to delete user dp. ", err)
    //             else console.log("user dp deleted sucessfully.")
    //     })
    //    }

    const [resultDel] =  await pool.query("UPDATE users SET isActive = 0 WHERE id = ?", [id])

       return res.status(201).json(new ApiResponse(200, resultDel, "User Soft deleted."))
    } catch (error) {
        console.log(error)
        return res.status(500).json(new ApiError(500, "", `${error?.message} In deleteUser:`))
    }
})

// GET PARTICULAR USER DETAILS 
const getUserById = asyncHandler(async (req, res)=>{
        try {

            const {id} = req?.params;

 const roleWithPermission = await helper.returnRolePermissionOfLoggedIn(req, res);
  if(!roleWithPermission || roleWithPermission.length<=0) return res.json(new ApiResponse(403, "No Any Permission found!"))

    // if no "view_users" permission then show error 
const hasViewUserAccess = roleWithPermission.some(
    p => p.permission_name == 'view_users'
);
if(!hasViewUserAccess) return res.json(new ApiError(403, [],"No Permission To View USER."))

    // fetching particular user details by user's id and role's id 
        const [rows] = await pool.query(
            `SELECT 
                u.id AS userId,
                u.name,
                u.email,
                u.date_of_birth,
                u.dp,
                u.gender,
                u.created_at,
                r.name AS roleName,
                r.id AS roleId
            from users u
            INNER JOIN roles r
                ON r.id = u.role_id
            WHERE u.id = ?`,
            [id]
        );

        if(rows?.length===0)     return res.status(404).json(new ApiError(404, `ErorrU.") In getUserById:` ,"No User Found."))

    const [userOrganizations] = await pool.query(`
            SELECT * FROM organizations WHERE user_id = ? 
        `, [id])
        // console.log(userOrganizations, "ORG")


        rows[0].userOrganizations = userOrganizations;

        return res.status(200).json(new ApiResponse(200, rows, "User fetched successfully."))
        } catch (error) {
            return res.status(500).json(new ApiError(500, `ErorrU.") In getUserById:` ,error?.message))
        }

})
  

// UPDATE USER DETAILS Basic
const updateUserDetails = asyncHandler(async (req, res)=>{
       try {
         const {id} = req?.user;  //who is logged in 
         const { name, email, date_of_birth, gender } = req.body;

        

         const [row] = await pool.query(
            `UPDATE users 
            SET name = ?, email = ?, date_of_birth = ?, gender = ? 
            WHERE id = ?`,
            [name, email, date_of_birth, gender, id]
         )


        return res.json(new ApiResponse(201, row,"Updated" ))

       } catch (error) {
        return res.json(new ApiError(500, "", error))
       }

})
// UPDATE LOGGED IN USER PROFILE IMAGE 
const updateUserProfileImage = asyncHandler(async (req, res)=>{
       try {
         const {id} = req?.user;  //who is logged in 
         
const [rows] = await pool.query(
  "SELECT dp FROM users WHERE id = ?",
  [id]
);

const previousImgPath = rows[0]?.dp;


if (previousImgPath) {
  const fullImgPath = path.join(
    process.cwd(),
    "uploads",
    previousImgPath
  );
try {
  await fs.unlink(fullImgPath);
} catch (err) {
  if (err.code !== "ENOENT") {
    throw err;
  }
}
  }
            
         const saved = await saveFiles(req, 'users');
        if (saved?.dp) {
            const [dets] = await pool.query(
                'UPDATE users SET dp = ? WHERE id = ?',
                [saved?.dp, id]
            )
            return res.json(new ApiResponse(201, dets,"Updated" ))
        }

       } catch (error) {
  console.error(error);
  return res.json(new ApiError(500, "", error));
}
})

// GET MY DETAILS : THE ONE WHO LOGGED IN 
const getMe = asyncHandler(async (req, res)=>{

        const [row] = await pool.query(
            `SELECT
                u.id AS userId,
             u.name AS name,
             r.id AS roleId,
             r.name AS userRole,
             gender,
             email,
             date_of_birth,
             dp
            from users u
            INNER JOIN
            roles r
            ON r.id = u.role_id 
             WHERE u.id = ?`,
            [req?.user?.id]
        )
        return res.json(new ApiResponse(200, row, "Your Details Fetched Successfully."))
})

// CHANGE USER ROLE || ONLY THE ONE WHO HAS PERMISSION TO "change_role" CAN BE ABLE TO CHANGE
const changeUserRole = asyncHandler(async (req, res)=>{
    const  userId  = req?.params?.id;  //target user, the role getting changed for  
    const role_id  = req?.body?.role_id;   //roleId from frontend which is going to be added


     const roleWithPermission = await helper.returnRolePermissionOfLoggedIn(req, res);
     if(!roleWithPermission || roleWithPermission.length<=0) return res.json(new ApiResponse(403, "No Any Permission found!"))
        
        // if no "change_role" permission then show error 
        const hasViewUserAccess = roleWithPermission.some(
            p => p.permission_name == 'change_role'
        );
        if(!hasViewUserAccess) return res.json(new ApiError(403, [],"No Permission To change the role of  USER."))

        // does user exist the one who getting role changed 
            const userExist = await helper.doesUserExist(req, res);
            if(userExist.length<=0) return res.json(new ApiError(404, "", "User not found."))

            // does the role exist 
            const [isRoleExist] = await pool.query(
                `SELECT id, name FROM roles WHERE id = ?`,
                [role_id]
            )
            if(isRoleExist.length<=0) return res.json(new ApiError(404, "", "Role Not Found"))



    const [row] = await pool.query(
        `UPDATE users SET role_id = ? WHERE id = ?`,
        [role_id, userId]
    )

    return res.json(new ApiResponse(200, isRoleExist, "Role Changed."))

})



module.exports = {
    getAllUser,
    deleteUser,
    getUserById,
    updateUserDetails,
    getMe,
    changeUserRole,
    updateUserProfileImage,
}