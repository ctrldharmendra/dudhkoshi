
// landing_page_misc:
// copyright	email	email2	phn	address	location	footerDesc	logo	logoName	footerCtaTtitle	footerCtaPara	footerCtaBtn1Text	footerCtaBtn2Tetx	footerCtaBtn1Link	footerCtaBtn2Link	blogSecPara	fbLink	xLink	instaLink	ytLink	inquiryImage	phn2	powerEvacuationTopNote	teamSecPara	mw	c02Reduced	longLat	spatialTitle	spatialPara	estd	designDischarge	grossHead	aboutUsPara contactWalpaper	



const asyncHandler = require("../../utils/asyncHandler")
const ApiError = require("../../utils/ApiErrors")
const ApiResponse = require("../../utils/ApiResponse")
const { pool } = require('../../db/index')
const { saveFiles } = require("../../middlewares/upload")
const path = require('path')
const helper = require('../../helper/helper')
const fs = require("fs/promises");


// update miscellaneous 
const updateMiscellaneous = asyncHandler(async (req, res)=>{

    // const {copyright, email, email2, phn, address, location, footerDesc, logo, logoName, footerCtaTtitle, footerCtaPara, footerCtaBtn1Text, footerCtaBtn2Tetx, footerCtaBtn1Link, footerCtaBtn2Link, blogSecPara, fbLink, xLink, instaLink, ytLink, inquiryImage, phn2, powerEvacuationTopNote, teamSecPara, mw, c02Reduced, longLat, spatialTitle, spatialPara, estd, designDischarge, grossHead, aboutUsPara} = req.body;


    const saved = await saveFiles(req, 'landingPage/misc');
    const logo = saved.logo || null;
const inquiryImage = saved.inquiryImage || null;

console.log(logo)
console.log(inquiryImage)
console.log(saved)

try {
    // const [result] = await pool.query(
    //     `UPDATE landing_page_misc SET copyright = ?, email = ?, email2 = ?, phn = ?, address = ?, location = ?, footerDesc = ?, logo = ?, logoName = ?, footerCtaTtitle = ?, footerCtaPara = ?, footerCtaBtn1Text = ?, footerCtaBtn2Tetx = ?, footerCtaBtn1Link = ?, footerCtaBtn2Link = ?, blogSecPara = ?, fbLink = ?, xLink = ?, instaLink = ?, ytLink = ?, inquiryImage = ?, phn2 = ?, powerEvacuationTopNote = ?, teamSecPara = ?, mw = ?, c02Reduced = ?, longLat = ?, spatialTitle = ?, spatialPara = ?, estd = ?, designDischarge = ?, grossHead = ?, aboutUsPara = ? WHERE id = 1`,
    //     [copyright, email, email2, phn, address, location, footerDesc, logo, logoName, footerCtaTtitle, footerCtaPara, footerCtaBtn1Text, footerCtaBtn2Tetx, footerCtaBtn1Link, footerCtaBtn2Link, blogSecPara, fbLink, xLink, instaLink, ytLink, inquiryImage, phn2, powerEvacuationTopNote, teamSecPara, mw, c02Reduced, longLat, spatialTitle, spatialPara, estd, designDischarge, grossHead, aboutUsPara]
    // )

    // if(result.affectedRows  !==1) return res.status(500).json(new ApiError(500, [], "Failed to save."));

    return res.status(200).json(new ApiResponse(200, saved, "Miscellaneous updated successfully."))

} catch (error) {
    console.log(error)
    return res.status(500).json(new ApiError(500, [], "Internal Server Error."));
}

})
// get miscellaneous || ALL
const getMiscellaneous = asyncHandler(async (req, res) => {
  try {
    const [result] = await pool.query(`SELECT * FROM landing_page_misc`)
    return res.status(200).json(new ApiResponse(200, result, "Success."))
  } catch (error) {
    console.log(error, "from get miscellaneous")
    return res.status(500).json(new ApiError(500, [], "Internal Server Error."));
  }
})



module.exports = {
    updateMiscellaneous, 
    getMiscellaneous,
}