const asyncHandler = require("../../utils/asyncHandler")
const ApiError = require("../../utils/ApiErrors")
const ApiResponse = require("../../utils/ApiResponse")
const { pool } = require('../../db/index')
const { saveFiles } = require("../../middlewares/upload")
const path = require('path')
const helper = require('../../helper/helper')
const fs = require("fs/promises");



// Create Hero | controller
const createHero = asyncHandler(async (req, res) => {


  const { shortTitle, title, description, btnText, btnLink } = req.body;



  // console.log(shortTitle, title, description, btnText, btnLink)

  try {

    const [result] = await pool.query(
      `UPDATE landing_page_hero SET shortTitle = ?, title = ?, description = ?, btnText = ?, btnLink = ?, userId = ? WHERE id = 6`,
      [shortTitle, title, description, btnText, btnLink, req?.user?.id]
    )


    if (result.affectedRows !== 1)
      return res.status(500).json(
        new ApiError(500, [], "Failed to save.")
      );

    // if there is image file then delete previous image file from server 
    if(req?.file){
    const [previousImage] = await pool.query(
      `SELECT mainWalpaper FROM landing_page_hero WHERE id = 6`,
    );

    // console.log(previousImage?.[0]?.mainWalpaper, "P path")

    if (previousImage?.[0]?.mainWalpaper) {
      const fullImgPath = path.join(
        process.cwd(),
        "uploads",
        previousImage?.[0]?.mainWalpaper
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
    const saved = await saveFiles(req, 'landingPage/hero');
    // console.log(saved)
    //      Update the DB row with the file path (if a file was uploaded)
    if (saved?.image) {
      await pool.query(
        'UPDATE landing_page_hero SET mainWalpaper = ? WHERE id = ?',
        [saved?.image, 6]
      )
    }
    }

    return res.status(200).json(new ApiResponse(200, [], "Hero updated successfully."))
  } catch (error) {
    console.log(error, "FROM HERO")
    return res.status(500).json(
      new ApiError(
        500,
        "",
        error.message
      )
    );
  }

})


// get hero 
const getHero = asyncHandler(async (req, res) => {
  try {

    const [result] = await pool.query(
      `SELECT * FROM landing_page_hero WHERE id = 6`,
      []
    )
    return res.status(200).json(new ApiResponse(200, result, "Success."))
  } catch (error) {
    console.log(error)
    return res.status(500).json(new ApiError(500, [], "Internal Server Error."));

  }
})



// HERO CARD || UPDATE
const updateHeroCard = asyncHandler(async (req, res) => {
  const connection = await pool.getConnection();

  const { id } = req.params;

  const { keye, valuee, title, para } = req.body;
// console.log(first)

  try {

    await connection.beginTransaction();
    const [result] = await connection.query(
      `UPDATE landing_page_hero_card SET keye = ?, valuee = ?, title = ?, para = ? WHERE id = ? `,
      [keye, valuee, title, para, id]
    )

    // if above update succes then update the image
    if (result.affectedRows !== 1)return res.status(500).json(new ApiError(500, [], "Failed to save."));



    // if there is image file then delete previous image file from server 
if(req?.file){
      const [previousImage] = await connection.query(`SELECT image FROM landing_page_hero_card WHERE id = ?`,[id])
if (previousImage?.[0]?.image) {
  const fullImgPath = path.join(process.cwd(),"uploads", previousImage?.[0]?.image);
try {
  await fs.unlink(fullImgPath);
} catch (err) {
  if (err.code !== "ENOENT") {
    throw err;
  }
}
  }
}
    // if there is image file then delete previous image file from server  END

    // save new image 
if(req?.file){
      const saved = await saveFiles(req, 'landingPage/herocard');
    if (saved?.image) {
      await connection.query(
        'UPDATE landing_page_hero_card SET image = ? WHERE id = ?',
        [saved?.image, id]
        )
    }
}


    // save new image END

    await connection.commit();
    return res.status(200).json(new ApiResponse(200, [], "Hero Card updated successfully."))

  } catch (error) {
    await connection.rollback();
    console.log(error)
    return res.status(500).json(new ApiError(500, [], "Internal Server Error."));
  } finally {
    // Always release the connection back to the pool
    connection.release();
  }
})

// GET HERO CARD || ALL
const getHeroCard = asyncHandler(async (req, res) =>{
    try {
const [result] = await pool.query(`SELECT * FROM landing_page_hero_card`)

return res.status(200).json(new ApiResponse(200, result, "Success."))

return res.status(200).json(new ApiResponse(200, result, "Success."))
    } catch (error) {
      console.log(error, "from get hero")
      return res.status(500).json(new ApiError(500, [], "Internal Server Error."));
    }
})
// GET PARTICULAR HERO CARD || 1, 2, 3...
const getHeroCardById = asyncHandler(async (req, res)=>{
  const {id} = req.params;
  try {
    const [result] = await pool.query(`SELECT * FROM landing_page_hero_card WHERE id = ?`,[id])
return res.status(200).json(new ApiResponse(200, result, "Success."))
  } catch (error) {
    console.log(error, "from get hero")
    return res.status(500).json(new ApiError(500, [], "Internal Server Error."));
  }
})

module.exports = {
  createHero,
  getHero,
  updateHeroCard,
  getHeroCardById,
  getHeroCard

}
