    const asyncHandler = require("../../utils/asyncHandler")
const ApiError = require("../../utils/ApiErrors")
const ApiResponse = require("../../utils/ApiResponse")
const { pool } = require('../../db/index')
const { saveFiles } = require("../../middlewares/upload")
const path = require('path')
const helper = require('../../helper/helper')
const fs = require("fs/promises");


// CREATE CONTACTS
const createContacts = asyncHandler(async (req, res)=>{
    const { fullname, email, subject, message } = req.body;

if(!fullname || !email || !message) return res.status(409).json(new ApiResponse(409, [], "Message, Email and Fullname are required."));


try {
    const [result] = await pool.query(
        `INSERT INTO landing_page_contactus (fullname, email, subject, message) VALUES (?, ?, ?, ?)`,
        [fullname, email, subject, message]
    )
    
    if(result.affectedRows !==1) return res.status(500).json(new ApiError(500, [], "Failed to save."));

   
    return res.status(200).json(new ApiResponse(200, [], "Contacts created successfully."))

} catch (error) {
  
    console.log(error)
    return res.status(500).json(new ApiError(500, [], error.message));  
}

})

// GET ALL CONTACTS 
const getContacts = asyncHandler(async (req, res) => {
  try {
    const [result] = await pool.query(`SELECT * FROM landing_page_contactus`)
    return res.status(200).json(new ApiResponse(200, result, "Success."))
  } catch (error) {
    console.log(error, "from get contacts")
    return res.status(500).json(new ApiError(500, [], "Internal Server Error."));
  }
})


// DELETE PARTICULAR CONTACTS
const deleteContacts = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query(`DELETE FROM landing_page_contactus WHERE id = ?`, [id])
    if(result.affectedRows !==1) return res.status(500).json(new ApiError(500, [], "Failed to delete."));
    return res.status(200).json(new ApiResponse(200, [], "Contacts deleted successfully."))
  } catch (error) {
    console.log(error, "from delete contacts")
    return res.status(500).json(new ApiError(500, [], "Internal Server Error."));
  }
})

module.exports = {
    createContacts, 
    getContacts, 
    deleteContacts
}