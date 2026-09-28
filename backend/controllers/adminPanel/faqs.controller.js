    const asyncHandler = require("../../utils/asyncHandler")
const ApiError = require("../../utils/ApiErrors")
const ApiResponse = require("../../utils/ApiResponse")
const { pool } = require('../../db/index')
const { saveFiles } = require("../../middlewares/upload")
const path = require('path')
const helper = require('../../helper/helper')
const fs = require("fs/promises");

// landing_page_faqs:
// ques	ans	category	
// CREATE faqs
const createFaqs = asyncHandler(async (req, res)=>{
    const { category, ques, ans } = req.body;

    
if(!ques, !ans) return res.status(409).json(new ApiResponse(409, [], "Ques. and Ans. required."));

try {
  
const [result] = await pool.query(
    `INSERT INTO landing_page_faqs (category, ques, ans) VALUES (?, ?, ?)`,
    [category, ques, ans]
  )
  
  if(result.affectedRows !==1) return res.status(500).json(new ApiError(500, [], "Failed to save."));

   
    return res.status(200).json(new ApiResponse(200, [], "faqs created successfully."))

} catch (error) {
  
    console.log(error)
    return res.status(500).json(new ApiError(500, [], error.message));  
}

})


// DELETE FAQS
const deleteFaqs = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {

   const [result] = await pool.query(
     `DELETE FROM landing_page_faqs WHERE id = ?`,
     [id]
   )

   if(result.affectedRows !==1) return res.status(500).json(new ApiError(500, [], "Failed to delete."));

    return res.status(200).json(new ApiResponse(200, [], "faqs deleted successfully."))
  } catch (error) {
    console.log(error, "from delete faqs")
    return res.status(500).json(new ApiError(500, [], "Internal Server Error."));
  }
})

// GET FAQS
const getFaqs = asyncHandler(async (req, res) => {
  try {
    const [result] = await pool.query(`SELECT * FROM landing_page_faqs`)
    return res.status(200).json(new ApiResponse(200, result, "Success."))
  } catch (error) {
    console.log(error, "from get faqs")
    return res.status(500).json(new ApiError(500, [], "Internal Server Error."));
  }
})

// GET PARTICULAR FAQS 
const getFaqsById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query(`SELECT * FROM landing_page_faqs WHERE id = ?`, [id])
    return res.status(200).json(new ApiResponse(200, result, "Success."))
  } catch (error) {
    console.log(error, "from get faqs")
    return res.status(500).json(new ApiError(500, [], "Internal Server Error."));
  }
})


// update faqs by id 
const updateFaqs = asyncHandler(async (req, res)=>{
  const {id} = req.params;
  const {category, ques, ans} = req.body;

  try {
    
    const [result] = await pool.query(
      `UPDATE landing_page_faqs SET category = ?, ques = ?, ans = ? WHERE id = ?`,
      [category, ques, ans, id]
    )

    return res.status(200).json(new ApiResponse(200, [], "faqs updated successfully."))

  } catch (error) {
    console.log(error)
    return res.status(500).json(new ApiError(500, [], error.message));
  }

})

module.exports = {
    createFaqs, 
    deleteFaqs,
    getFaqs,
    getFaqsById, 
    updateFaqs
}