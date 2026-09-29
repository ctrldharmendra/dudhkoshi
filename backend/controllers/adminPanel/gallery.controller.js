    const asyncHandler = require("../../utils/asyncHandler")
const ApiError = require("../../utils/ApiErrors")
const ApiResponse = require("../../utils/ApiResponse")
const { pool } = require('../../db/index')
const { saveFiles } = require("../../middlewares/upload")
const path = require('path')
const helper = require('../../helper/helper')
const fs = require("fs/promises");

// landing_page_gallery:
// image	category	
// CREATE CONTACTS
const createGallery = asyncHandler(async (req, res)=>{
    const { category } = req.body;
console.log(req?.file)


if(!req?.file) return res.status(409).json(new ApiResponse(409, [], "Image required."));


try {
  
   const [result] = await pool.query(
        `INSERT INTO landing_page_gallery (category) VALUES (?)`,
        [category]
    )
    
    if(result.affectedRows !==1) return res.status(500).json(new ApiError(500, [], "Failed to save."));


        const saved = await saveFiles(req, 'landingPage/gallery');
    //      Update the DB row with the file path (if a file was uploaded)
    if (saved?.image) {
      await pool.query(
        'UPDATE landing_page_gallery SET image = ? WHERE id = ?',
        [saved?.image, result.insertId]
      )
    }




    return res.status(200).json(new ApiResponse(200, [], "Gallery created successfully."))

} catch (error) {
  
    console.log(error)
    return res.status(500).json(new ApiError(500, [], error.message));  
}

})

// DELETE GALLERY PARTICULAR ONE 
const deleteGallery = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {

    // delete image from server 
    const [previousImage] = await pool.query(
      `SELECT image FROM landing_page_gallery WHERE id = ?`,
      [id]
    );
    if(previousImage?.length !==1) return res.status(500).json(new ApiError(500, [], "Failed to delete."));

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


    const [result] = await pool.query(`DELETE FROM landing_page_gallery WHERE id = ?`, [id])
    if(result.affectedRows !==1) return res.status(500).json(new ApiError(500, [], "Failed to delete."));
    return res.status(200).json(new ApiResponse(200, [], "Gallery deleted successfully."))
  } catch (error) {
    console.log(error, "from delete gallery")
    return res.status(500).json(new ApiError(500, [], "Internal Server Error."));
  }
})

// GET GALLERY
const getGallery = asyncHandler(async (req, res) => {
  try {
    const [result] = await pool.query(`SELECT * FROM landing_page_gallery`)
    return res.status(200).json(new ApiResponse(200, result, "Success."))
  } catch (error) {
    console.log(error, "from get gallery")
    return res.status(500).json(new ApiError(500, [], "Internal Server Error."));
  }
})

// GET PARTICULAR GALLERY 
const getGalleryById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query(`SELECT * FROM landing_page_gallery WHERE id = ?`, [id])
    return res.status(200).json(new ApiResponse(200, result, "Success."))
  } catch (error) {
    console.log(error, "from get gallery")
    return res.status(500).json(new ApiError(500, [], "Internal Server Error."));
  }
})
// UPDATE GALLERY PARTICULAR ONE
const updateGalleryById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { category = "" } = req.body;
  try {

    // make sure the row exists before doing anything
    const [existing] = await pool.query(
      `SELECT id, image FROM landing_page_gallery WHERE id = ?`,
      [id]
    );
    if (existing?.length !== 1) return res.status(404).json(new ApiError(404, [], "Gallery image not found."));

    // a replacement image is optional
    let newImage = null;
    if (req?.file) {
      const saved = await saveFiles(req, 'landingPage/gallery');
      if (saved?.image) newImage = saved.image;
    }

    await pool.query(
      `UPDATE landing_page_gallery SET category = ?${newImage ? ", image = ?" : ""} WHERE id = ?`,
      newImage ? [category, newImage, id] : [category, id]
    );

    // remove the previous file from disk only after the DB points at the new one
    if (newImage && existing?.[0]?.image) {
      const fullImgPath = path.join(
        process.cwd(),
        "uploads",
        existing?.[0]?.image
      );
      try {
        await fs.unlink(fullImgPath);
      } catch (err) {
        if (err.code !== "ENOENT") {
          throw err;
        }
      }
    }

    return res.status(200).json(new ApiResponse(200, [], "Gallery updated successfully."))
  } catch (error) {
    console.log(error, "from update gallery")
    return res.status(500).json(new ApiError(500, [], "Internal Server Error."));
  }
})

module.exports = {
    createGallery, 
    deleteGallery, 
    getGallery,
    getGalleryById,
    updateGalleryById
}