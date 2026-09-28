const asyncHandler = require("../../utils/asyncHandler")
const ApiError = require("../../utils/ApiErrors")
const ApiResponse = require("../../utils/ApiResponse")
const { pool } = require('../../db/index')
const { saveFiles } = require("../../middlewares/upload")
const path = require('path')
const helper = require('../../helper/helper')
const fs = require("fs/promises");


// TECHNICAL SPECIFICATION
// update aboutus technical specification | controller
const updateTechnicalSpecification = asyncHandler(async (req, res) => {
 
const {id} = req.params; 
  const { title, title2, title3, icon } = req.body;
  try {

    const [result] = await pool.query(
      `UPDATE landing_page_technicalspec SET title = ?, title2 = ?, title3 = ?, icon = ? WHERE id = ?`,
      [title, title2, title3, icon, id]
    )


    if (result.affectedRows !== 1) return res.status(500).json( new ApiError(500, [], "Failed to save."));

    // if there is image file then delete previous image file from server 
if(req?.file){
      const [previousImage] = await pool.query(
      `SELECT image FROM landing_page_technicalspec WHERE id = ?`,
      [id]
    );

    // console.log(previousImage?.[0]?.mainWalpaper, "P path")

    if (previousImage?.[0]?.image) {
      const fullImgPath = path.join(
        process.cwd(),
        "uploads",
        previousImage?.[0]?.image
      );
      try {
        await fs.unlink(fullImgPath);
      } catch (err) {
        if (err.code !== "ENOENT") {
          throw err;
        }
      }
    }

    // // ?after above query completion | SAVE update document field in reinvitation_attachment table
    const saved = await saveFiles(req, 'landingPage/aboutus');
    // console.log(saved)
    //      Update the DB row with the file path (if a file was uploaded)
    if (saved?.image) {
      await pool.query(
        'UPDATE landing_page_technicalspec SET image = ? WHERE id = ?',
        [saved?.image, id]
      )
    }
}

    return res.status(200).json(new ApiResponse(200, [], "aboutUs updated successfully."))
  } catch (error) {
    console.log(error, "FROM aboutUs")
    return res.status(500).json(
      new ApiError(
        500,
        "",
        error.message
      )
    );
  }

})
// get technical specification || ALL
const getTechnicalSpecification = asyncHandler(async (req, res) => {
  try {
    const [result] = await pool.query(`SELECT * FROM landing_page_technicalspec`)
    return res.status(200).json(new ApiResponse(200, result, "Success."))
  } catch (error) {
    console.log(error, "from get technical specification")
    return res.status(500).json(new ApiError(500, [], "Internal Server Error."));
  }
})
// get technical specification || ALL
const getTechnicalSpecificationById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query(`SELECT * FROM landing_page_technicalspec WHERE id = ?`, [id])
    return res.status(200).json(new ApiResponse(200, result, "Success."))
  } catch (error) {
    console.log(error, "from get technical specification")
    return res.status(500).json(new ApiError(500, [], "Internal Server Error."));
  }
})  

// SPAATIAL CONSTRAINTTS 
const updateSpatialConstraints = asyncHandler(async (req, res)=>{
    const {id} = req.params; 
    const {title, title2, title3, icon} = req.body;


try {
    const [result] = await pool.query(
        `UPDATE landing_page_spatialcons SET title = ?, title2 = ?, title3 = ?, icon = ? WHERE id = ?`,
        [title, title2, title3, icon, id]
    )
    

if(result.affectedRows  !==1) return res.status(500).json(new ApiError(500, [], "Failed to save."));

return res.status(200).json(new ApiResponse(200, [], "Spatial Constraints updated successfully."))

} catch (error) {
    console.log(error)
    return res.status(500).json(new ApiError(500, [], "Internal Server Error."));
}


})
// get spatial constraints || ALL
const getSpatialConstraints = asyncHandler(async (req, res) => {
  try {
    const [result] = await pool.query(`SELECT * FROM landing_page_spatialcons`)
    return res.status(200).json(new ApiResponse(200, result, "Success."))
  } catch (error) {
    console.log(error, "from get spatial constraints")
    return res.status(500).json(new ApiError(500, [], "Internal Server Error."));
  }
})
// get spatial constraints || ALL
const getSpatialConstraintsById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query(`SELECT * FROM landing_page_spatialcons WHERE id = ?`, [id])
    return res.status(200).json(new ApiResponse(200, result, "Success."))
  } catch (error) {
    console.log(error, "from get spatial constraints")
    return res.status(500).json(new ApiError(500, [], "Internal Server Error."));
  }
})




module.exports = {
  updateTechnicalSpecification,
    getTechnicalSpecification,
    getTechnicalSpecificationById, 
    updateSpatialConstraints, 
    getSpatialConstraints,
    getSpatialConstraintsById, 

}
