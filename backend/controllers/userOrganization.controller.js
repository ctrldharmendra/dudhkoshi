const { pool } = require("../db");
const ApiError = require("../utils/ApiErrors");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");

// UPDATE ORGANIZATION 
const updateUserOrganization = asyncHandler(async (req, res)=>{
       try {
         const {id} = req?.user;  //who is logged in 

const { orgName, ownerName, phnNumber, panNo, vatNo, contactPerson, contactPersonsPhNo, contactPersonsEmail, physicalAddress, selectedRow} = req.body;

// console.log(orgName, ownerName, phnNumber, panNo, vatNo, contactPerson, contactPersonsPhNo, contactPersonsEmail, physicalAddress, selectedRow)

const [result ] = await pool.query(
    `UPDATE organizations SET 
    orgName = ?, ownerName = ?, phnNumber = ?, panNo = ?, vatNo = ?, contactPerson = ?, contactPersonsPhNo = ?, contactPersonsEmail = ?, physicalAddress = ? WHERE user_id = ? AND id = ?
    `,[orgName, ownerName, phnNumber, panNo, vatNo, contactPerson, contactPersonsPhNo, contactPersonsEmail, physicalAddress, id, selectedRow]
)


    // get updated row
    const [updatedOrganization] = await pool.query(
      `
      SELECT * FROM organizations
      WHERE user_id = ?
      `,
      [
        id
      ]
    );


        return res.json(new ApiResponse(201, updatedOrganization,"Updated" ))

       } catch (error) {
        console.error(error)
        return res.json(new ApiError(500, "", error))
       }

})

// GET ORGANIZATIONs 
const getUserOrganization = asyncHandler(async (req, res)=>{
       try {
         const {id} = req?.user;  //who is logged in 


const [rows] = await pool.query(
    `SELECT * FROM organizations
        WHERE user_id = ?    
    `,[id]
)


        return res.json(new ApiResponse(201, rows,"User Organization" ))

       } catch (error) {
          console.error(error);
        return res.json(new ApiError(500, "", error))
       }

})


module.exports = {
    updateUserOrganization,
    getUserOrganization,
}