



    const asyncHandler = require("../../utils/asyncHandler")
const ApiError = require("../../utils/ApiErrors")
const ApiResponse = require("../../utils/ApiResponse")
const { pool } = require('../../db/index')
const { saveFiles } = require("../../middlewares/upload")
const path = require('path')
const helper = require('../../helper/helper')
const fs = require("fs/promises");



// create team
const createTeam = asyncHandler(async (req, res) => {
 const { name, designation, background, focus, experience, description } = req.body;
//  if not image 
if(!req?.file) return res.status(409).json(new ApiResponse(409, [], "Team Image is required."));

  try {

   const [result] = await pool.query(
    `INSERT INTO landing_page_team (name, designation, background, focus, experience, description) VALUES (?, ?, ?, ?, ?, ?)`,
    [name, designation, background, focus, experience, description]
   )
  
   if (result.affectedRows !== 1) return res.status(500).json( new ApiError(500, [], "Failed to save."));
   const teamId = result.insertId;


    // // ?after above query completion | SAVE update document field in reinvitation_attachment table
    const saved = await saveFiles(req, 'landingPage/team');
    //      Update the DB row with the file path (if a file was uploaded)
    if (saved?.image) {
      await pool.query(
        'UPDATE landing_page_team SET image = ? WHERE id = ?',
        [saved?.image, teamId]
      )
    }

    return res.status(200).json(new ApiResponse(200, [], "team updated successfully."))
  } catch (error) {
    console.log(error, "FROM team")
    return res.status(500).json(
      new ApiError(
        500,
        "",
        error.message
      )
    );
  }

})

// update particlar team
const updateTeam = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, designation, background, focus, experience, description } = req.body;
  // if not image 
  try {

    const [result] = await pool.query(
      `UPDATE landing_page_team SET name = ?, designation = ?, background = ?, focus = ?, experience = ?, description = ? WHERE id = ?`,
      [name, designation, background, focus, experience, description, id]
    )


    if (result.affectedRows !== 1) return res.status(500).json( new ApiError(500, [], "Failed to save."));
if(req?.file){
  
    // if there is image file then delete previous image file from server 
    const [previousImage] = await pool.query(
      `SELECT image FROM landing_page_team WHERE id = ?`,
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
     const saved = await saveFiles(req, 'landingPage/team');
    // console.log(saved)
    //      Update the DB row with the file path (if a file was uploaded)
    if (saved?.image) {
      await pool.query(
        'UPDATE landing_page_team SET image = ? WHERE id = ?',
        [saved?.image, id]
      )
    }
}

    return res.status(200).json(new ApiResponse(200, [], "team updated successfully."))
  } catch (error) {
    console.log(error, "FROM team")
    return res.status(500).json(
      new ApiError(
        500,
        "",
        error.message
      )
    );
  } 
})

// Get all team members
const getTeam = asyncHandler(async (req, res) => {
  try {
    const [result] = await pool.query(`SELECT * FROM landing_page_team`)
    return res.status(200).json(new ApiResponse(200, result, "Success."))

    } catch (error) {
        console.log(error, "from get team")
        return res.status(500).json(new ApiError(500, [], "Internal Server Error."));
    }

    })

// Get particular team member
const getTeamById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query(`SELECT * FROM landing_page_team WHERE id = ?`, [id])
    return res.status(200).json(new ApiResponse(200, result, "Success."))
  } catch (error) {
    console.log(error, "from get team")
    return res.status(500).json(new ApiError(500, [], "Internal Server Error."));
  }
})


// delete particular team 
const deleteTeam = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {

    // if there is image file then delete previous image file from server 
    const [previousImage] = await pool.query(
      `SELECT image FROM landing_page_team WHERE id = ?`,
      [id]
    );

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

    const [result] = await pool.query(`DELETE FROM landing_page_team WHERE id = ?`, [id])
    if(result.affectedRows !==1) return res.status(500).json(new ApiError(500, [], "Failed to delete."));




    return res.status(200).json(new ApiResponse(200, [], "Team deleted successfully."))
  } catch (error) {
    console.log(error, "from delete team")
    return res.status(500).json(new ApiError(500, [], "Internal Server Error."));
  }
})

module.exports = {
  createTeam,
  updateTeam, 
    getTeam,
    getTeamById, 
    deleteTeam
}
