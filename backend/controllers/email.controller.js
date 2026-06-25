const asyncHandler = require("../utils/asyncHandler")
const ApiError = require("../utils/ApiErrors")
const ApiResponse = require("../utils/ApiResponse")
const { pool } = require("../db")
const path = require('path')
const fs = require('fs')
// const helper = require('../helper/helper');
// const { saveFiles } = require("../middlewares/upload")

const getEmailContents = asyncHandler(async (req, res)=>{
        try {
                const [row] = await pool.query(
                    `SELECT * from emailContent`
                )
        return res.status(200).json(new ApiResponse(200, row, "Success."))
        } catch (error) {
            return res.status(500).json(new ApiError(500, `ErorrU.") In Email Controller:` ,error?.message))
        }

})


module.exports = {
    getEmailContents,
}