const { pool } = require("../db");
const { saveFiles } = require("../middlewares/upload");
const ApiError = require("../utils/ApiErrors");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");
const path = require("path");
const fs = require("fs/promises");

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



// ORGANIZATION DOCUMENTS 
// GET ORG DOCS 
const getUserOrganizationDocs = asyncHandler(async (req, res)=>{
       try {
         const {id} = req?.user;  //who is logged in 

const [rows] = await pool.query(
    `SELECT * FROM organizationsDocs
        WHERE userId = ?    
    `,[id]
)


        return res.json(new ApiResponse(201, rows,"User Organization" ))

       } catch (error) {
          console.error(error);
        return res.json(new ApiError(500, "", error))
       }
})

// POST ORG DOCS 
const createOrganizationDocs = asyncHandler(async (req, res) => {
  try {

    const userId = req?.user?.id;

    const title = Array.isArray(req.body.title)
      ? req.body.title
      : [req.body.title];

    // oggedInUserId
    const savedFiles = await saveFiles(req, `organizations-docs/${userId}`);

    //  use filePaths consistentliy
    const filePaths = savedFiles.files || [];

    // normalize filePaths not filePaths (was file before)
    const normalizedPaths = typeof filePaths === 'string'
      ? [filePaths]
      : filePaths;

    let result = null;

    for (let i = 0; i < normalizedPaths.length; i++) {
      const [rows] = await pool.query(
        `INSERT INTO organizationsDocs (title, file, userId) VALUES (?, ?, ?)`,
        [title[i], normalizedPaths[i], userId]
      );
      result = rows;
    }

    return res.status(201).json(new ApiResponse(201, result, "Created"));

  } catch (error) {
    console.error(error);
    return res.status(500).json(new ApiError(500, "", error.message));
  }
});
// DELETE ORG DOCUMET FILE 
const deleteOrganizationDocs = asyncHandler(async (req, res)=>{
  try {
    const {id} = req?.params;  //who is logged in 

    // const [rows] = await pool.query(
    //   `DELETE FROM organizationsDocs
    //     WHERE id = ?    
    // `,[id]
    // )

    const [rows] = await pool.query(
      `select * FROM organizationsDocs
        WHERE id = ?    
    `,[id]
    ) 

    // also delete all files from disk

            // delete file from disk
  const fullPath = path.join(process.cwd(), "uploads", rows.value);

            return res.json(new ApiResponse(201, fullPath,"Deleted" ))

           } catch (error) {
              console.error(error);
            return res.json(new ApiError(500, "", error))
           }
})

module.exports = {
    updateUserOrganization,
    getUserOrganization,
    getUserOrganizationDocs,
    createOrganizationDocs,
    deleteOrganizationDocs,

}