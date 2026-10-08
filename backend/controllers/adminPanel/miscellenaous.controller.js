
// landing_page_misc:
// copyright	email	email2	phn	address	location	footerDesc	logo	logoName	footerCtaTtitle	footerCtaPara	footerCtaBtn1Text	footerCtaBtn2Tetx	footerCtaBtn1Link	footerCtaBtn2Link	blogSecPara	fbLink	xLink	instaLink	ytLink	inquiryImage	phn2	powerEvacuationTopNote	teamSecPara	mw	c02Reduced	longLat	spatialTitle	spatialPara	estd	designDischarge	grossHead	aboutUsPara contactWallpaper	



const asyncHandler = require("../../utils/asyncHandler")
const ApiError = require("../../utils/ApiErrors")
const ApiResponse = require("../../utils/ApiResponse")
const { pool } = require('../../db/index')
const { saveFiles } = require("../../middlewares/upload")
const path = require('path')
const helper = require('../../helper/helper')
const fs = require("fs/promises");

// Every column that may be written by updateMiscellaneous. Kept as a hardcoded
// whitelist so the column names interpolated into the SQL can never come from
// user input.
const MISC_UPDATABLE_COLUMNS = [
    'copyright', 'email', 'email2', 'phn', 'address', 'location', 'footerDesc',
    'logo', 'logoName', 'footerCtaTtitle', 'footerCtaPara', 'footerCtaBtn1Text',
    'footerCtaBtn2Tetx', 'footerCtaBtn1Link', 'footerCtaBtn2Link', 'blogSecPara',
    'fbLink', 'xLink', 'instaLink', 'ytLink', 'inquiryImage', 'phn2',
    'powerEvacuationTopNote', 'teamSecPara', 'mw', 'c02Reduced', 'longLat',
    'spatialTitle', 'spatialPara', 'estd', 'designDischarge', 'grossHead',
    'aboutUsPara', 'contactWallpaper','SpatialMapImage',
];

// Image columns that accept an uploaded file / can be cleared on demand.
const MISC_IMAGE_COLUMNS = ['logo', 'inquiryImage', 'contactWallpaper','SpatialMapImage'];

// Body flag that clears each image column (only honoured when no replacement
// file was uploaded).
const MISC_IMAGE_REMOVAL_FLAGS = {
    logo: 'removeLogo',
    inquiryImage: 'removeInquiryImage',
    contactWallpaper: 'removeContactWallpaper',
    SpatialMapImage: 'removeSpatialMapImage',
};

// The settings table is a single row and its schema may not yet contain every
// field the admin UI exposes (e.g. contactWallpaper). Resolve the columns that
// actually exist once per process so unknown columns are skipped instead of
// producing an "Unknown column" SQL error.
let miscColumnsPromise = null;
const getMiscColumns = () => {
    if (!miscColumnsPromise) {
        miscColumnsPromise = pool
            .query(`SHOW COLUMNS FROM landing_page_misc`)
            .then(([rows]) => rows.map((row) => row.Field))
            .catch((error) => {
                console.log(error, "from misc schema lookup");
                return [];
            });
    }
    return miscColumnsPromise;
};

// update miscellaneous 
const updateMiscellaneous = asyncHandler(async (req, res)=>{

try {
    // Resolve which of the known columns actually exist, then make sure the
    // settings row exists before writing any files to disk. The image columns
    // are read so a removal request can also clean up the previous file.
    const columns = await getMiscColumns();

    const writableColumns = MISC_UPDATABLE_COLUMNS.filter((column) =>
        columns.includes(column)
    );
    const imageColumns = MISC_IMAGE_COLUMNS.filter((column) =>
        columns.includes(column)
    );

    const [existing] = await pool.query(
        imageColumns.length
            ? `SELECT ${imageColumns.join(', ')} FROM landing_page_misc LIMIT 1`
            : `SELECT 1 FROM landing_page_misc LIMIT 1`
    );
    if (existing?.length !== 1) {
        return res.status(404).json(new ApiError(404, [], "Miscellaneous settings not found."));
    }

    // write any uploaded files (logo / inquiryImage / contactWallpaper) to disk
    const saved = await saveFiles(req, 'landingPage/misc');

    const setClauses = [];
    const values = [];

    // Sets a column, or overrides its value when the column is already staged.
    // Keeps setClauses and values index-aligned.
    const setColumn = (column, value) => {
        const clause = `${column} = ?`;
        const index = setClauses.indexOf(clause);
        if (index !== -1) {
            values[index] = value;
        } else {
            setClauses.push(clause);
            values.push(value);
        }
    };

    // Only touch the columns the client actually sent. The "Others" page posts a
    // subset of the table, so a full-column UPDATE would blank out everything else.
    for (const column of writableColumns) {
        if (Object.prototype.hasOwnProperty.call(req.body, column)) {
            setColumn(column, req.body[column]);
        }
    }

    // Uploaded files take precedence over a same-named body field.
    for (const column of imageColumns) {
        if (saved?.[column]) {
            setColumn(column, saved[column]);
        }
    }

    // Explicit removal (removeLogo / removeInquiryImage / removeContactWallpaper),
    // only honoured when no replacement file was uploaded. The old file is
    // deleted from disk once the DB row no longer points at it.
    const filesToUnlink = [];
    for (const column of imageColumns) {
        const flag = MISC_IMAGE_REMOVAL_FLAGS[column];
        if (!flag) continue;
        if (saved?.[column]) continue;
        if (String(req.body?.[flag]).toLowerCase() !== 'true') continue;

        const previous = existing?.[0]?.[column];
        if (previous) filesToUnlink.push(previous);
        setColumn(column, "");
    }

    if (setClauses.length === 0) {
        // NOTE: ApiError extends Error, whose `message` is non-enumerable and
        // therefore dropped by JSON.stringify. The user-facing text must go in
        // the enumerable `errors` field so it actually reaches the client.
        return res.status(400).json(new ApiError(400, [], "No fields to update."));
    }
console.log(values, "values")
    const [result] = await pool.query(
        `UPDATE landing_page_misc SET ${setClauses.join(', ')}`,
        values
    );

    // delete files whose rows no longer reference them (missing files are fine)
    for (const imagePath of filesToUnlink) {
        const fullImgPath = path.join(process.cwd(), "uploads", imagePath);
        try {
            await fs.unlink(fullImgPath);
        } catch (err) {
            if (err.code !== "ENOENT") {
                console.log(err, "from misc image cleanup");
            }
        }
    }

    // affectedRows is 0 when the submitted values match what is already stored,
    // so a successful query (not affectedRows) is what we report on.
    return res.status(200).json(new ApiResponse(200, result, "Miscellaneous updated successfully."))

} catch (error) {
    console.log(error)
    return res.status(500).json(new ApiError(500, [], error.message || "Internal Server Error."));
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