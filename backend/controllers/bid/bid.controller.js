const asyncHandler = require("../../utils/asyncHandler")
const ApiError = require("../../utils/ApiErrors")
const ApiResponse = require("../../utils/ApiResponse")
const { pool } = require("../../db")
const path = require('path')
const fs = require('fs')
const { saveFiles } = require('../../middlewares/upload');

// CREATE BID FORM 
const createBidForm = asyncHandler(async (req, res) => {
    // Get a dedicated connection from the pool
    const connection = await pool.getConnection();

    try {
        const {
            publishDate,
            openDate,
            title,
            description,
            status,
            fields,
            closeDate
        } = req.body;

        const loggedInUserId = req.user.id;

        // Basic validation
        if (!publishDate ||!openDate ||!title ||!description ||!status ||!Array.isArray(fields) || fields.length === 0
        ) {
            return res
                .status(400)
                .json(new ApiError(400, "Missing required fields."));
        }

        // START TRANSACTION
        // Nothing is permanently saved until commit()
        await connection.beginTransaction();

        // STEP 1: Insert into bid_master
        const [result] = await connection.query(
            `INSERT INTO bid_master
            (publishDate, openDate, title, description, status, user_id, closeDate)
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [
                publishDate,
                openDate,
                title,
                description,
                status,
                loggedInUserId,
                closeDate
            ]
        );

        // Get generated bid id
        const bidId = result.insertId;

        // STEP 2: Insert all fields
        // If ANY insert fails, execution jumps to catch block
        for (const field of fields) {
            await connection.query(
                `INSERT INTO bid_fields
                (bid_id, field_name, created_by, field_type)
                VALUES (?, ?, ?, ?)`,
                [
                    bidId,
                    field.fieldName,
                    loggedInUserId,
                    field.fieldType
                ]
            );
        }

        // STEP 3: Everything succeeded
        // Save all changes permanently
        await connection.commit();

        return res.status(201).json(
            new ApiResponse(
                201,
                { bidId },
                "Bid created successfully."
            )
        );

    } catch (error) {
        // Something failed
        // Undo ALL database changes
        // bid_master insert will also be removed
        await connection.rollback();

        return res.status(500).json(
            new ApiError(500, "Failed to create bid.", error.message)
        );

    } finally {
        // Always release the connection back to the pool
        connection.release();
    }
});

// GET BID FORM 
const getAllBids = asyncHandler(async (req, res) => {
    try {
        // Read query parameters
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;


        const search = req.query.search || "";
        const status = req.query.status || "";

        // Calculate offset
        const offset = (page - 1) * limit;

        //  SELECT query
        let selectQuery = `
            SELECT
                id,
                publishDate,
                openDate,
                title,
                description,
                status,
                user_id,
                created_at
            FROM bid_master
            WHERE 1=1
        `;

        const selectValues = [];

        // Search by title
        if (search) {
            selectQuery += ` AND title LIKE ?`;
            selectValues.push(`%${search}%`);
        }

        // Filter by status
        if (status) {
            selectQuery += ` AND status = ?`;
            selectValues.push(status);
        }

        // Latest bids first
        selectQuery += `
            ORDER BY created_at DESC
            LIMIT ?
            OFFSET ?
        `;

        selectValues.push(limit);
        selectValues.push(offset);

        const [bids] = await pool.query(selectQuery, selectValues);

        //  COUNT query
        let countQuery = `
            SELECT COUNT(*) AS total
            FROM bid_master
            WHERE 1=1
        `;

        const countValues = [];

        if (search) {
            countQuery += ` AND title LIKE ?`;
            countValues.push(`%${search}%`);
        }

        if (status) {
            countQuery += ` AND status = ?`;
            countValues.push(status);
        }

        const [[countResult]] = await pool.query(countQuery, countValues);

        const total = countResult.total;

        //  response
        return res.status(200).json(
            new ApiResponse(
                200,
                {
                    bids,
                    pagination: {
                        page,
                        limit,
                        total,
                        totalPages: Math.ceil(total / limit),
                        hasNextPage: page < Math.ceil(total / limit),
                        hasPreviousPage: page > 1
                    }
                },
                "Bids fetched successfully."
            )
        );

    } catch (error) {

        return res.status(500).json(
            new ApiError(
                500,
                "Failed to fetch bids.",
                error.message
            )
        );
    }
});


// GET A SINGLE BIDS WITH DETAILS || shows those fields as input boxes to the applicant so bidders can fill them and submit their bids
const getSingleBidForm = asyncHandler(async (req, res)=>{
    // Read bid_id from req.params.id.
// Validate — check it's a valid number, not undefined.
// Query bid_master where id = bid_id → get the main bid info.
// If no bid found → send 404 response immediately, stop here.
// Query bid_fields where bid_id = bid_id → get all dynamic fields for this bid.
// Combine both results into one response object:
   const {id} = req.params; //particular bid id

   try {
      //  Get main bid information
        const [bidMasterRow] = await pool.query(
            `
            SELECT 
                id,
                publishDate,
                openDate,
                title,
                description,
                status,
                user_id,
                created_at
            FROM bid_master
            WHERE id = ?
            `,
            [id]
        );
                 //  If bid doesn't exist
        if(bidMasterRow.length ==0) return res.status(404).json(
            new ApiError(
                404,
                "Bid not found."
            )
        )
        // it has a single row of a bid 
        const bid = bidMasterRow[0];

    //    Get dynamic fields
    const [bidFields] = await pool.query(
        `
        SELECT
            id,
            bid_id,
            field_name,
            field_type,
            created_by,
            created_at
        FROM bid_fields
        WHERE bid_id = ?
        `,
        [id]
    );

    // Combine results
    const response = {
        ...bid,
        fields: bidFields
    };

    return res.status(200).json(
        new ApiResponse(
            200,
            response,
            "Bid fetched successfully."
        )
    );  
           
   } catch (error) {
    
   }





})


// APPLY BID CONTROLLER || Apply to Bid Controller ||
const applyBid = asyncHandler(async (req, res) => {

  // Get a dedicated connection for transaction
  const connection = await pool.getConnection();

  try {
    // STEP 1 — READ INCOMING DATA
    // bid_id comes from URL → /bidform/101/apply
    const bid_id = req.params.id;

    // logged in user is the applicant
    const applicant_user_id = req.user.id;

    // values comes as a JSON STRING because we sent FormData (not JSON)
    // so we must parse it manually
    // shape: [
    //   { field_id: 1, value: "Hydropower", type: "text" },
    //   { field_id: 2, value: null, type: "file", fileIndex: 0 },
    //   { field_id: 3, value: null, type: "file", fileIndex: 1 },
    // ]
    let values;
    try {
      values = JSON.parse(req.body.values);
    } catch (e) {
      return res.status(400).json(new ApiError(400, "Invalid values format. Must be valid JSON."));
    }

    // req.files → array of file objects multer held in memory
    // multer has NOT saved them to disk yet at this point
    const files = req.files || [];

    // STEP 2 — BASIC VALIDATION
    if (!bid_id) {
      return res.status(400).json(new ApiError(400, "Bid ID is required."));
    }

    if (!Array.isArray(values) || values.length === 0) {
      return res.status(400).json(new ApiError(400, "Values must be a non-empty array."));
    }

    // Check every item has field_id and either a value or a file reference
    const isValid = values.every(item => {
      if (!item.field_id) return false;               // field_id missing
      if (item.type === "text" && !item.value) return false;  // text but no value
      if (item.type === "file" && item.fileIndex === undefined) return false; // file but no fileIndex
      return true;
    });

    if (!isValid) {
      return res.status(400).json(
        new ApiError(400, "Each value must have field_id, type, and either value or fileIndex.")
      );
    }

    // STEP 3 — CHECK BID EXISTS
    const [[bid]] = await pool.query(
      `SELECT id, closeDate, status FROM bid_master WHERE id = ?`,
      [bid_id]
    );

    if (!bid) {
      return res.status(404).json(new ApiError(404, "Bid not found."));
    }

    // STEP 4 — CHECK BID IS STILL OPEN
    const now = new Date();
//  only check closeDate if it actually exists
if (bid.closeDate) {
  const now = new Date();
  const closeDate = new Date(bid.closeDate);
  if (now > closeDate) {
    return res.status(400).json(new ApiError(400, "", "This bid is closed."));
  }
}

    // STEP 5 — CHECK USER HASN'T ALREADY APPLIED
    const [[existingApplication]] = await pool.query(
      `SELECT id FROM bid_applications 
       WHERE bid_id = ? AND applicant_user_id = ?`,
      [bid_id, applicant_user_id]
    );

    if (existingApplication) {
      return res.status(400).json(new ApiError(400, "", "You have already applied to this bid."));
    }
    // STEP 6 — VALIDATE field_ids ACTUALLY BELONG TO THIS BID
    // Security check — prevent someone from sending field_ids
    // from a completely different bid

    const [validFields] = await pool.query(
      `SELECT id FROM bid_fields WHERE bid_id = ?`,
      [bid_id]
    );

    // extract just the ids into a flat array → [1, 2, 3]
    const validFieldIds = validFields.map(f => f.id);

    // check every field_id in req.body exists in validFieldIds
    const allFieldsValid = values.every(item =>
      validFieldIds.includes(Number(item.field_id))
    );

    if (!allFieldsValid) {
      return res.status(400).json(
        new ApiError(400, "", "One or more field_ids do not belong to this bid.")
      );
    }

    // STEP 7 — START TRANSACTION
    // From here, nothing is permanently saved until commit()

    await connection.beginTransaction();
    // STEP 8 — INSERT INTO bid_applications

    const [applicationResult] = await connection.query(
      `INSERT INTO bid_applications 
       (bid_id, applicant_user_id, status) 
       VALUES (?, ?, 'pending')`,
      [bid_id, applicant_user_id]
    );

    // This is the key we attach to every value row
    const application_id = applicationResult.insertId;

    // STEP 9 — SAVE FILES TO DISK
    // We only save files to disk NOW — after DB insert started succeeding
    // If this fails, catch block will rollback the bid_applications insert too
    // savedFiles shape: { files: ['bid-applications/172xxx-abc.pdf', ...] }

    let savedFilePaths = [];

    if (files.length > 0) {
      const savedFiles = await saveFiles(req, 'bid-applications');
      // savedFiles.files is array of paths because we used .array('files')
      savedFilePaths = savedFiles.files || [];
      // if only 1 file, saveFiles returns a string not array — normalize it
      if (typeof savedFilePaths === 'string') {
        savedFilePaths = [savedFilePaths];
      }
    }

    // STEP 10 — BUILD FINAL VALUES WITH FILE PATHS RESOLVED
    // Replace fileIndex references with the actual saved file path

    const processedValues = values.map(item => {
      if (item.type === 'file') {
        const filePath = savedFilePaths[item.fileIndex] || null;
        return {
          field_id: item.field_id,
          value: filePath   // e.g. "bid-applications/1719820000-a3b2.pdf"
        };
      }
      // text field — use value as-is
      return {
        field_id: item.field_id,
        value: item.value
      };
    });

    // STEP 11 — INSERT INTO bid_application_values

    for (const item of processedValues) {
      await connection.query(
        `INSERT INTO bid_application_values 
         (application_id, field_id, value, created_by) 
         VALUES (?, ?, ?, ?)`,
        [application_id, item.field_id, item.value, applicant_user_id]
      );
    }

    // STEP 12 — COMMIT — saves everything permanently
    await connection.commit();

    return res.status(201).json(
      new ApiResponse(201, { application_id }, "Application submitted successfully.")
    );

  } catch (error) {
    // STEP 13 — ROLLBACK — undoes ALL db changes if anything failed
    await connection.rollback();

    return res.status(500).json(
      new ApiError(500, "Failed to submit application.", error.message)
    );

  } finally {
    // STEP 14 — ALWAYS release connection back to pool
    connection.release();
  }

})


module.exports = {
    createBidForm,
    getAllBids,
    getSingleBidForm,
    applyBid,
}