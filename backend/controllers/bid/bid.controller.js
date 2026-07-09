const asyncHandler = require("../../utils/asyncHandler")
const ApiError = require("../../utils/ApiErrors")
const ApiResponse = require("../../utils/ApiResponse")
const { pool } = require("../../db")
const path = require('path')
const fs = require('fs')
const { saveFiles } = require('../../middlewares/upload');
const helper = require('../../helper/helper')
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

// EDIT CREATED BID FORM 
const editBidForm = asyncHandler(async (req, res)=>{
  const connection = await pool.getConnection();
  const {id} = req.params;  //particular bid ko id 
  const {publishDate, openDate, title, description, status, closeDate, fields} = req.body; 

  // console.log(fields, " fields")
  try {
    
     // Basic validation
        if (!publishDate ||!openDate ||!title ||!description ||!status ||!Array.isArray(fields) || fields.length === 0
        ) {
            return res
                .status(400)
                .json(new ApiError(400, "Missing required fields."));
        }
  await connection.beginTransaction();
        const [bidMasterRow] = await connection.query(
            `SELECT id FROM bid_master WHERE id = ?`,
            [id]
        );
        if(bidMasterRow.length ==0) return res.status(404).json(
            new ApiError(
                404,
                "Bid not found."
            )
        )
        // it has a single row of a bid 
        const bid = bidMasterRow[0];

        // check if this bid has already applied by user, then we cannot edit it
        const [existingApplications] = await connection.query(
            `SELECT id FROM bid_applications WHERE bid_id = ?`,
            [id]
        );
        if (existingApplications.length > 0) {
            return res.status(400).json(new ApiError(400, "", "Cannot edit this bid form because applicants have already applied."));
        }

  await connection.query(
    `UPDATE bid_master SET publishDate = ?, openDate = ?, title = ?, description = ?, status = ?, closeDate = ?, updated_by = ? WHERE id = ?`,
    [publishDate, openDate, title, description, status, closeDate, req.user.id, id]
  );

  // Delete existing fields
  await connection.query(
    `DELETE FROM bid_fields WHERE bid_id = ?`,
    [id]
  );

  // Insert new fields
  for (const field of fields) {
    await connection.query(
      `INSERT INTO bid_fields (bid_id, field_name, created_by, modified_by, field_type) VALUES (?, ?, ?, ?, ?)`,
      [id, field.field_name, req.user.id, req.user.id, field.field_type]
    );
  }

  // update that particular fields 
// for (const field of fields) {
//   await connection.query(
//     `UPDATE bid_fields
//      SET field_name = ?, field_type = ?, modified_by = ?
//      WHERE id = ?`,
//     [
//       field.field_name,
//       field.field_type,
//       req.user.id,
//       field.id
//     ]
//   );
// }

  await connection.commit();  
return res.status(200).json(new ApiResponse(200, {id, publishDate, openDate, title, description, status, closeDate}, "Bid form edited successfully."))
  } catch (error) {
    await connection.rollback();
    return res.status(500).json(new ApiError(500, "Failed to edit bid form.", error.message))

  }
  finally {
    connection.release();
  }
})

// GET BID FORM | TO LIST IN FRONTED SIDE 
// const getAllBids = asyncHandler(async (req, res) => {
//     try {
//         // Read query parameters
//         const page = Number(req.query.page) || 1;
//         const limit = Number(req.query.limit) || 4;


//         const search = req.query.search || "";
//         const status = req.query.status || "";
//         const fromDate = req.query.from || "";
//         const toDate = req.query.to || "";



//     // first check if user has permission to view bid or not 
//     const userWithPermission = await helper.returnRolePermissionOfLoggedIn(req, res);
// if(!userWithPermission || userWithPermission.length<=1) return res.json(new ApiResponse(403, "No Any Permission!"))

//     // if no "crete_user" permission then show error 
// const hasViewBidPermission = userWithPermission.some(
//     p => p.permission_name === 'view_bid'
// );

// if(!hasViewBidPermission) return res.json(new ApiError(403, [],"No Permission To View Bid."))

//         // Calculate offset
//         const offset = (page - 1) * limit;

//         //  SELECT query
//         let selectQuery = `
//             SELECT
//                 id,
//                 publishDate,
//                 openDate,
//                 title,
//                 description,
//                 status,
//                 user_id,
//                 created_at
//             FROM bid_master
//             WHERE 1=1
//         `;
        

//         const selectValues = [];

//         // Search by title
//         if (search) {
//             selectQuery += ` AND title LIKE ?`;
//             selectValues.push(`%${search}%`);
//         }

//         // Filter by status
//         if (status) {
//             selectQuery += ` AND status = ?`;
//             selectValues.push(status);
//         }

//         // from and to date 
//         if (fromDate) {
//     selectQuery += ` AND created_at >= ?`;
//     selectValues.push(fromDate);
//         }

//       if (toDate) {
//     selectQuery += ` AND created_at <= ?`;
//     selectValues.push(toDate);
//         }

//         // Latest bids first
//         selectQuery += `
//             ORDER BY created_at DESC
//             LIMIT ?
//             OFFSET ?
//         `;

//         selectValues.push(limit);
//         selectValues.push(offset);

//         const [bids] = await pool.query(selectQuery, selectValues);

//         //  COUNT query
//         let countQuery = `
//             SELECT COUNT(*) AS total
//             FROM bid_master
//             WHERE 1=1
//         `;

//         const countValues = [];

//         if (search) {
//             countQuery += ` AND title LIKE ?`;
//             countValues.push(`%${search}%`);
//         }

//         if (status) {
//             countQuery += ` AND status = ?`;
//             countValues.push(status);
//         }

//         if (fromDate) {
//     countQuery += ` AND created_at >= ?`;
//     countValues.push(fromDate);
// }

// if (toDate) {
//     countQuery += ` AND created_at <= ?`;
//     countValues.push(toDate);
// }

//         const [[countResult]] = await pool.query(countQuery, countValues);

//         const total = countResult.total;

//         //  response
//         return res.status(200).json(
//             new ApiResponse(
//                 200,
//                 {
//                     bids,
//                     pagination: {
//                         page,
//                         limit,
//                         total,
//                         totalPages: Math.ceil(total / limit),
//                         hasNextPage: page < Math.ceil(total / limit),
//                         hasPreviousPage: page > 1
//                     }
//                 },
//                 "Bids fetched successfully."
//             )
//         );

//     } catch (error) {

//         return res.status(500).json(
//             new ApiError(
//                 500,
//                 "Failed to fetch bids.",
//                 error.message
//             )
//         );
//     }
// });
const getAllBids = asyncHandler(async (req, res) => {
  try {
    // Read query parameters
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 4;

    const search = req.query.search || "";
    const status = req.query.status || "";
    const fromDate = req.query.from || "";
    const toDate = req.query.to || "";

    // Logged-in user
    const loggedInUserId = req.user.id;

    // Check permission
    const userWithPermission = await helper.returnRolePermissionOfLoggedIn(req, res);

    if (!userWithPermission || userWithPermission.length <= 1) {
      return res
        .status(403)
        .json(new ApiError(403, "No Any Permission!"));
    }

    const hasViewBidPermission = userWithPermission.some(
      (p) => p.permission_name === "view_bid"
    );

    if (!hasViewBidPermission) {
      return res
        .status(403)
        .json(new ApiError(403, "No Permission To View Bid."));
    }

    const offset = (page - 1) * limit;

    //SELECT QUERY 
    // returns all from left table, matching from right --> Give me all bids, and if user 5 has an application for that bid, attach it.
    let selectQuery = `
      SELECT
        bm.id,
        bm.publishDate,
        bm.openDate,
        bm.title,
        bm.description,
        bm.status,
        bm.user_id,
        bm.created_at,

        ba.id AS applicationId,
        ba.status AS applicationStatus

      FROM bid_master bm

      LEFT JOIN bid_applications ba
        ON ba.bid_id = bm.id
       AND ba.applicant_user_id = ?

      WHERE 1=1
    `;

    // First value is always logged-in user id
    const selectValues = [loggedInUserId];

    // Search
    if (search) {
      selectQuery += ` AND bm.title LIKE ?`;
      selectValues.push(`%${search}%`);
    }

    // Status
    if (status) {
      selectQuery += ` AND bm.status = ?`;
      selectValues.push(status);
    }

    // From date
    if (fromDate) {
      selectQuery += ` AND bm.created_at >= ?`;
      selectValues.push(fromDate);
    }

    // To date
    if (toDate) {
      selectQuery += ` AND bm.created_at <= ?`;
      selectValues.push(toDate);
    }

    // Pagination
    selectQuery += `
      ORDER BY bm.created_at DESC
      LIMIT ?
      OFFSET ?
    `;

    selectValues.push(limit);
    selectValues.push(offset);

    const [bids] = await pool.query(selectQuery, selectValues);

    // ---------------- COUNT QUERY ----------------

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

    if (fromDate) {
      countQuery += ` AND created_at >= ?`;
      countValues.push(fromDate);
    }

    if (toDate) {
      countQuery += ` AND created_at <= ?`;
      countValues.push(toDate);
    }

    const [[countResult]] = await pool.query(countQuery, countValues);

    const total = countResult.total;

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
            hasPreviousPage: page > 1,
          },
        },
        "Bids fetched successfully."
      )
    );
  } catch (error) {
    return res.status(500).json(
      new ApiError(500, "Failed to fetch bids.", error.message)
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
                closeDate,
                title,
                description,
                status,
                user_id,
                created_at,
                updated_at, 
                updated_by
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
     return res.status(500).json(
        new ApiError(
            500,
            `error.message || Failed to fetch bid.`,`error.message || Failed to fetch bid.`,
        )
    );
   }})


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

    // first check if user has permission to apply bid or not 
    const userWithPermission = await helper.returnRolePermissionOfLoggedIn(req, res);
if(!userWithPermission || userWithPermission.length<=1) return res.json(new ApiResponse(403, "No Any Permission!"))

    // if no "crete_user" permission then show error 
const hasApplyBidPermission = userWithPermission.some(
    p => p.permission_name === 'apply_bid'
);

if(!hasApplyBidPermission) return res.json(new ApiError(403, [],"No Permission To Apply Bid."))


    // values comes as a JSON STRING because we sent FormData (not JSON)
    // so we must parse it manually
    // shape: [
    //   { field_id: 1, value: "Hydropower", type: "text" },
    //   { field_id: 2, value: null, type: "file", fileIndex: 0 },
    //   { field_id: 3, value: null, type: "file", fileIndex: 1 },
    // ]
    let values;

    // console.log(JSON.parse(req.body.values), "JSON.parse(req.body.values)")
    try {
      values = JSON.parse(req.body.values);
      // console.log("json:", JSON.stringify(values));
    } catch (e) {
      return res.status(400).json(new ApiError(400, "", "Invalid values format. Must be valid JSON."));
    }



    // req.files → array of file objects multer held in memory
    // multer has NOT saved them to disk yet at this point
    const files = req.files || [];


    // 2 — BASIC VALIDATION
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
      // if (item.type === "text" && item.value === undefined) return false;
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
  if (now >= closeDate) {
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


// EDIT APPLIED BID || THE ONE WHO APPLIED WILL EDIT
const editAppliedBid = asyncHandler(async (req, res)=>{
  const connection = await pool.getConnection();

  try {
    const bid_id = req.params.id;
    const applicant_user_id = req.user.id;

    // first check if user has permission to apply bid or not 
    const userWithPermission = await helper.returnRolePermissionOfLoggedIn(req, res);
if(!userWithPermission || userWithPermission.length<=1) return res.json(new ApiResponse(403, "No Any Permission!"))

    // if no "crete_user" permission then show error 
const hasApplyBidPermission = userWithPermission.some(
    p => p.permission_name === 'apply_bid'
);

if(!hasApplyBidPermission) return res.json(new ApiError(403, [],"No Permission To Apply Bid."))

    // values comes as a JSON STRING because we sent FormData (not JSON)
    let values;
    try {
      values = JSON.parse(req.body.values);
    } catch (e) {
      return res.status(400).json(new ApiError(400, "Invalid values format. Must be valid JSON."));
    }

    const files = req.files || [];
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

    // STEP 2 — CHECK BID EXISTS
    const [[bid]] = await pool.query(
      `SELECT id, closeDate, status FROM bid_master WHERE id = ?`,
      [bid_id]
    );

    if (!bid) {
      return res.status(404).json(new ApiError(404, "Bid not found."));
    }

    // STEP 3 — CHECK BID IS STILL OPEN
    const now = new Date();
    if (bid.closeDate) {
      const closeDate = new Date(bid.closeDate);
      if (now >= closeDate) {
        return res.status(400).json(new ApiError(400, "", "This bid is closed."));
      }
    }

    // STEP 4 — CHECK USER HAS ALREADY APPLIED
    const [[existingApplication]] = await pool.query(
      `SELECT id FROM bid_applications 
       WHERE bid_id = ? AND applicant_user_id = ?`,
      [bid_id, applicant_user_id]
    );

    if (!existingApplication) {
      return res.status(400).json(new ApiError(400, "", "You have not applied to this bid yet."));
    }

    const application_id = existingApplication.id;

    // STEP 5 — START TRANSACTION
    await connection.beginTransaction();


    // DELETE EXISTING (PREVIOUS) FILES FROM DISK
    const [existingFiles] = await connection.query(
      `SELECT * FROM bid_application_values`,

//       SELECT value
// FROM bid_application_values
// WHERE application_id = ?
    );
    for (const row of existingFiles) {
      if (!row.value.startsWith("bid-applications/")) continue;  // if the value doenst start with bid-applications/ then skip it. its not file


  const fullPath = path.join(process.cwd(), "uploads", row.value);
    if (fs.existsSync(fullPath)) {
   try {
     fs.unlinkSync(fullPath);
    console.log("Deleted:", fullPath);
   } catch (error) {
    console.error("Error deleting file:", error);
   }
  }
}

    
    // STEP 6 — DELETE EXISTING VALUES
    await connection.query(
      `DELETE FROM bid_application_values WHERE application_id = ?`,
      [application_id]
    );


    // STEP 7 — SAVE FILES TO DISK
    let savedFilePaths = [];

    if (files.length > 0) {
      const savedFiles = await saveFiles(req, 'bid-applications');
      savedFilePaths = savedFiles.files || [];
      if (typeof savedFilePaths === 'string') {
        savedFilePaths = [savedFilePaths];
      }
    }

    // STEP 8 — BUILD FINAL VALUES WITH FILE PATHS RESOLVED
    const processedValues = values.map(item => {
      if (item.type === 'file') {
        const filePath = savedFilePaths[item.fileIndex] || null;
        return {
          field_id: item.field_id,
          value: filePath
        };
      }
      return {
        field_id: item.field_id,
        value: item.value
      };
    });

    // STEP 9 — INSERT NEW VALUES
    for (const item of processedValues) {
      await connection.query(
        `INSERT INTO bid_application_values 
         (application_id, field_id, value, created_by) 
         VALUES (?, ?, ?, ?)`,
        [application_id, item.field_id, item.value, applicant_user_id]
      );
    }

    // STEP 10 — COMMIT
    await connection.commit();

    return res.status(200).json(
      new ApiResponse(200, { application_id }, "Application updated successfully.")
    );  

  } catch (error) {
    await connection.rollback();
    return res.status(500).json(new ApiError(500, "An error occurred while updating the application."));
  }

})

// GET HOW MANY PEOPLE HAS APPLIED TO A PARTICULA BID FORM || GET ALL APPLICANTS OF A PARTICULAR BID
const getBidApplicants = asyncHandler(async (req, res)=>{
  const selectedBidId = req.params.id;
try {
    const [bidMasterRows] = await pool.query(
    `SELECT 
          bidApps.applicant_user_id AS applicant_user_id,
          bidApps.status AS application_status,
          bidApps.id AS applicationId,
          bidApps.created_at AS applied_at,
          u.name AS applicant_name,
          u.email AS applicant_email,
          u.gender as applicant_gender,
          org.orgName AS applicant_organization_name
    FROM bid_applications bidApps
    INNER JOIN users u ON bidApps.applicant_user_id = u.id
    LEFT JOIN organizations org ON u.id = org.user_id
           WHERE bidApps.bid_id = ?`,
    [selectedBidId]
  )

  return res.status(200).json(new ApiResponse(200, bidMasterRows, "List of People Who Apllied to this Bid."))
} catch (error) {
  return res.status(500).json(new ApiError(500, "An error occurred while fetching bid forms."));
}

  


})


// GET DOCUMENT OF PARTICULAR BID APPLIED BY BIDDERS | user A applied to BID1 --> this shows what document user A submitted to BID1
const getBidApplicantDocument = asyncHandler(async (req, res)=>{
  try {
       const bidId = req.params.bidId;
    const applicationId = req.params.applicationId;


    // console.log(applicationId, "applicationId")

if (!bidId || !applicationId || isNaN(bidId) || isNaN(applicationId)) {
  return res.status(400).json(new ApiError(400, "Invalid bid ID or application ID."));
}


    // first check if user has permission to view applicants bid or not 
    const userWithPermission = await helper.returnRolePermissionOfLoggedIn(req, res);
if(!userWithPermission || userWithPermission.length<=1) return res.json(new ApiResponse(403, "No Any Permission!"))

    // if no "crete_user" permission then show error 
const hasViewApplicantsPermission = userWithPermission.some(
    p => p.permission_name === 'view_applicants'
);

// yadi aafno bid xa vhanne dekhaune, dekhaune, loggediuser ko bid xa vhanne
// check garne if "bid_application" table ma yedi "req.user.id"  ko "bid_id" (jun usle request garya xa) match xa then it means user ko aafno bid xa tyo. 
const [isThisBidBelongsToLoggedInUser] = await pool.query(`
      SELECT * FROM bid_applications WHERE bid_id = ? AND applicant_user_id = ? 
  `, [bidId, req?.user?.id])

const belongsToLoggedInUser = isThisBidBelongsToLoggedInUser.length > 0;

// yedi user ko aafno bid xa vhanne dekhaune ya user lai permission xa vhanne sabai dekhaune 
if (!hasViewApplicantsPermission && !belongsToLoggedInUser) {
  return res.status(403).json(
    new ApiError(403, [], "No Permission To View Applicants.")
  );
}

    // dynamic field details 
    const [bidDynamiDocumentDets] = await pool.query(
      `SELECT 
          bav.field_id AS field_id,
          bav.value AS document_path,
          bf.field_name AS field_name,
          bf.field_type AS field_type
      FROM bid_application_values bav
      JOIN bid_fields bf ON bav.field_id = bf.id
      JOIN bid_applications ba ON bav.application_id = ba.id
      WHERE ba.bid_id = ? AND ba.id = ?`,
      [bidId, applicationId]
    );
if (bidDynamiDocumentDets.length === 0) {
  return res.status(404).json(new ApiError(404, "No documents found for this bid application."));
}


// bid mater row 
    const [bidMasterRow] = await pool.query(
      `SELECT 
          id,
          publishDate,
          openDate,
          title,
          description,
          status,
          user_id,
          created_at
      FROM bid_master
      WHERE id = ?`,
      [bidId]
    );

    if (bidMasterRow.length === 0) {
      return res.status(404).json(new ApiError(404, "Bid not found."));
    }

    const bidMasterDetails = bidMasterRow[0];

    const [theOneWhoApplied] = await pool.query(
  `SELECT 
      u.id AS user_id,
      u.name AS user_name,
      u.email AS user_email,
      u.gender AS user_gender,
      org.orgName AS organization_name
  FROM bid_applications ba
  JOIN users u ON ba.applicant_user_id = u.id
  LEFT JOIN organizations org ON u.id = org.user_id
  WHERE ba.bid_id = ? AND ba.id = ?`,
  [bidId, applicationId]
);

const applierDetails = theOneWhoApplied.length > 0 ? theOneWhoApplied[0] : null;
const applicantAllDets = {
  applicantDetails: applierDetails,
  bidMasterDetails: bidMasterDetails,
  bidDynamicDocumentDetails: bidDynamiDocumentDets
};



    return res.status(200).json(new ApiResponse(200, applicantAllDets, "Bid applicant documents fetched successfully."));
  } catch (error) {
    return res.status(500).json(new ApiError(500, "An error occurred while fetching bid applicant documents.", error.message));
  }
});


// GET APPLIED BID OF LOGGED IN USER 
const getAppliedBid = asyncHandler(async (req, res) => {
  try {
    const search = req?.query?.search || "";
    const page = Number(req?.query?.page) || 1;
    const limit = Number(req?.query?.limit) || 4;
    const offset = (page - 1) * limit;

    const from = req?.query?.from || null;
    const to = req?.query?.to || null;


    const searchValue = `%${search}%`;

    // Get total count
    const [countResult] = await pool.query(
      `
      SELECT COUNT(*) AS total
      FROM bid_master bm
      INNER JOIN bid_applications ba
        ON bm.id = ba.bid_id
      WHERE ba.applicant_user_id = ?
        AND (
          bm.title LIKE ?
          OR bm.description LIKE ?
        )
        AND (? IS NULL OR bm.created_at >= ?)
        AND (? IS NULL OR bm.created_at < DATE_ADD(?, INTERVAL 1 DAY))
      `,
      [
        req.user.id,
        searchValue,
        searchValue,
        from, from,
        to, to
      ]
    );


    const total = countResult[0].total;


    // Get paginated data
    const [rows] = await pool.query(
      `
      SELECT 
        bm.id,
        bm.title,
        bm.description,
        bm.publishDate,
        bm.openDate,
        bm.status,
        bm.created_at,
        ba.status AS applicationStatus,
        ba.id AS applicationId
      FROM bid_master bm
      INNER JOIN bid_applications ba
        ON bm.id = ba.bid_id
      WHERE ba.applicant_user_id = ?
        AND (
          bm.title LIKE ?
          OR bm.description LIKE ?
        )
        AND (? IS NULL OR bm.created_at >= ?)
        AND (? IS NULL OR bm.created_at < DATE_ADD(?, INTERVAL 1 DAY))
      LIMIT ? OFFSET ?
      `,
      [
        req.user.id,
        searchValue,
        searchValue,
        from, from,
        to, to,
        limit,
        offset
      ]
    );


    const totalPages = Math.ceil(total / limit);


    return res.status(200).json(
      new ApiResponse(
        200,
        {
          bids: rows,
          pagination: {
            total,
            page,
            limit,
            totalPages,
            hasNextPage: page < totalPages,
            hasPreviousPage: page > 1
          }
        },
        "List Of Bid Applied By You."
      )
    );


  } catch (error) {
    return res.status(500).json(
      new ApiError(
        500,
        "An error occurred while fetching Your Applied Bid.",
        error.message
      )
    );
  }
});

module.exports = {
    createBidForm,
    getAllBids,
    getSingleBidForm,
    applyBid,
    editAppliedBid,
    getBidApplicants,
    getBidApplicantDocument,
    editBidForm,
    getAppliedBid,
}