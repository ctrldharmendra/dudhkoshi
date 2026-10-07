    const asyncHandler = require("../../utils/asyncHandler")
const ApiError = require("../../utils/ApiErrors")
const ApiResponse = require("../../utils/ApiResponse")
const { pool } = require('../../db/index')
const { saveFiles } = require("../../middlewares/upload")
const path = require('path')
const helper = require('../../helper/helper')
const fs = require("fs/promises");


// CREATE PROJECT OVERVIEW
const createProjectOverView = asyncHandler(async (req, res)=>{
    const { icon, title, note, contentData } = req.body;

if(!title || !contentData) return res.status(409).json(new ApiResponse(409, [], "Title and Content title are required."));
const connection = await pool.getConnection();

try {
    
    await connection.beginTransaction();
    
    const [categResult] = await connection.query(
        `INSERT INTO landing_page_projover_cat (icon, title, note) VALUES (?, ?, ?)`,
        [icon, title, note]
    )
    if(categResult.affectedRows !==1) return res.status(500).json(new ApiError(500, [], "Failed to save."));
    
    const categId = categResult.insertId;
    
    
    // contentData is an array of objects [{conTitle, data, formula}, {conTitle, data, formula}, ...]
var contentResultLength = 0;
    for(let i=0; i<contentData.length; i++){
        const [contentResult] = await connection.query(
            `INSERT INTO landing_page_projeover_contents (conTitle, data, formula, categoryId) VALUES (?, ?, ?, ?)`, 
            [contentData[i].conTitle, contentData[i].data, contentData[i].formula, categId] 
        )
        if(contentResult.affectedRows !==1) return res.status(500).json(new ApiError(500, [], "Failed to save."));
        contentResultLength += contentResult.affectedRows;
    }



     if(contentResultLength <1) 
     {
         await connection.rollback();
         return res.status(500).json(new ApiError(500, [], "Failed to save."));

     }

    await connection.commit();
    return res.status(200).json(new ApiResponse(200, [], "Project Overview created successfully."))

} catch (error) {
    connection.rollback()
    console.log(error)
    return res.status(500).json(new ApiError(500, [], error.message));  
} finally {
    connection.release();
}

})

// UPDATE PROJECT OVERVIEW BY ID 
const updateProjectOverView = asyncHandler(async (req, res)=>{
if(!req?.params?.id) return res.status(409).json(new ApiResponse(409, [], "Project Overview ID is required."));

    const { id } = req.params;

    const { icon, title, note, contentData } = req.body;



if(!title || !contentData) return res.status(409).json(new ApiResponse(409, [], "Title and Content title are required."));
const connection = await pool.getConnection();

try {
    
    await connection.beginTransaction();
    const [categResult] = await connection.query(
        `UPDATE landing_page_projover_cat SET icon = ?, title = ?, note = ? WHERE id = ?`,
        [icon, title, note, id]
    )

     if(categResult.affectedRows !==1)     {
         await connection.rollback();
         return res.status(500).json(new ApiError(500, [], "Failed to save."));

     }

// contentData is an array of objects [{conTitle, data, formula}, {conTitle, data, formula}, ...]
var contentResultLength = 0;
    for(let i=0; i<contentData.length; i++){
        const [contentResult] = await connection.query(
            `UPDATE landing_page_projeover_contents SET conTitle = ?, data = ?, formula = ? WHERE id = ?`, 
            [contentData[i].conTitle, contentData[i].data, contentData[i].formula, contentData[i].id] 
        )
        // console.log(contentResult)
        contentResultLength += contentResult.affectedRows;
    }

     if(contentResultLength <1)     {
         await connection.rollback();
         return res.status(500).json(new ApiError(500, [], "Failed to save...."));

     }
        


    await connection.commit();
    return res.status(200).json(new ApiResponse(200, [], "Project Overview updated successfully."))

} catch (error) {
    console.log(error)
    connection.rollback()
    return res.status(500).json(new ApiError(500, [], error.message));  
} finally {
    connection.release();
}

})

// GET ALL PROJECT OVERVIEW
const getProjectOverView = asyncHandler(async (req, res) => {
  try {
    const [result] = await pool.query(`
        SELECT 
        cat.id AS categoryId,
        cat.icon AS categoryIcon,
        cat.title AS categoryTitle, 
        cat.note AS categoryNote,

        content.id AS contentId,
        content.conTitle AS contentTitle, 
        content.data AS contentData, 
        content.formula AS contentFormula

        FROM landing_page_projover_cat AS cat
        INNER JOIN landing_page_projeover_contents AS content
ON cat.id = content.categoryId

        `)





    return res.status(200).json(new ApiResponse(200, result, "Success."))
  } catch (error) {
    console.log(error, "from get project overview")
    return res.status(500).json(new ApiError(500, [], "Internal Server Error."));
  }
})

// GET PARTICULAR PROJECT OVERVIEW BY ID
const getProjectOverViewById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await pool.query(`
        SELECT
        cat.id AS categoryId,
        cat.icon AS categoryIcon, 
        cat.title AS categoryTitle, 
        cat.note AS categoryNote,
        content.id AS contentId,
        content.conTitle AS contentTitle, 
        content.data AS contentData, 
        content.formula AS contentFormula

        FROM landing_page_projover_cat AS cat
        INNER JOIN landing_page_projeover_contents AS content
        ON cat.id = content.categoryId
         WHERE cat.id = ?
        `, [id])
 


    return res.status(200).json(new ApiResponse(200, result, "Success."))
  } catch (error) {
    console.log(error, "from get project overview")
    return res.status(500).json(new ApiError(500, [], "Internal Server Error."));
  }
})



    // CREATE WIRE SYSTEM
    const createWireSystem = asyncHandler(async (req, res)=>{
        const { icon, title, title2, title3, contentData } = req.body;

        if(!title || !contentData.length) return res.status(409).json(new ApiResponse(409, [], "Title and Content title are required."));

        const connection = await pool.getConnection();
        try {
            
            await connection.beginTransaction();
            const [categResult] = await connection.query(
                `INSERT INTO landing_page_wiresys (icon, title, title2, title3) VALUES (?, ?, ?, ?)`,
                [icon, title, title2, title3]
            )
            if(categResult.affectedRows <1) {
                await connection.rollback();
                return res.status(500).json(new ApiError(500, [], "Failed to save."));
            }

            const categId = categResult.insertId;

            // contentData is an array of objects [{title, para, wireSysId}, {title, para, wireSysId}, ...]
            var contentResLength = 0;
            for(i=0; i<contentData.length; i++){
                const [contentResult] = await connection.query(
                    `INSERT INTO landing_page_wiresys_contents (title, para, wireSysId) VALUES (?, ?, ?)`,
                    [contentData[i].title, contentData[i].para, categId]
                )
                if(contentResult.affectedRows <1) {
                    await connection.rollback();
                    return res.status(500).json(new ApiError(500, [], "Failed to save."));
                }
                contentResLength += contentResult.affectedRows;
            }
            if(contentResLength <1) {
                await connection.rollback();
                return res.status(500).json(new ApiError(500, [], "Failed to save."));
            }

        return res.status(201).json(new ApiResponse(200, [], "Success."))


        } catch (error) {
            connection.rollback()
            console.log(error)
            return res.status(500).json(new ApiError(500, [], error.message));
        }finally {
            connection.release();
        }


    })

    // Update particular wire system
    const updateWireSystem = asyncHandler(async (req, res)=>{
        const {id} = req.params; 
        const {title, title2, title3, icon} = req.body;

        if(!title || !contentData.length) return res.status(409).json(new ApiResponse(409, [], "Title and Content title are required."));

        const connection = await pool.getConnection();
        try {
            
            await connection.beginTransaction();
            const [categResult] = await connection.query(
                `UPDATE landing_page_wiresys SET title = ?, title2 = ?, title3 = ?, icon = ? WHERE id = ?`,
                [title, title2, title3, icon, id]
            )

            if(categResult.affectedRows <1) {
                await connection.rollback();
                return res.status(500).json(new ApiError(500, [], "Failed to save."));
            }

            // contentData is an array of objects [{title, para, wireSysId}, {title, para, wireSysId}, ...]
            var contentResLength = 0;
            for(let i=0; i<contentData.length; i++){
                const [contentResult] = await connection.query(
                    `UPDATE landing_page_wiresys_contents SET title = ?, para = ? WHERE id = ?`, 
                    [contentData[i].title, contentData[i].para, contentData[i].id] 
                )
                // console.log(contentResult)
                contentResLength += contentResult.affectedRows;
            }
            if(contentResLength <1) {
                await connection.rollback();
                return res.status(500).json(new ApiError(500, [], "Failed to save...."));
            }


            await connection.commit();
            return res.status(200).json(new ApiResponse(200, [], "Success."));

        }   catch (error) {
            connection.rollback()
            console.log(error)
            return res.status(500).json(new ApiError(500, [], error.message));
        }finally {
            connection.release();
        }


    })

    // get all 
    const getWireSystem = asyncHandler(async (req, res) => {
      try {
const [rows] = await pool.query(`
  SELECT 
    lpw.id AS wireSysId, 
    lpw.title AS wireSysTitle, 
    lpw.title2 AS wireSysTitle2, 
    lpw.title3 AS wireSysTitle3, 
    lpw.icon AS wireSysIcon, 
    lpwc.id AS contentId, 
    lpwc.title AS contentTitle, 
    lpwc.para AS contentPara, 
    lpwc.wireSysId AS contentWireSysId 
  FROM landing_page_wiresys lpw 
  INNER JOIN landing_page_wiresys_contents lpwc ON lpw.id = lpwc.wireSysId
`);

// Group the flat rows into a structured object
const groupedMap = rows.reduce((acc, row) => {
  // If the wireSys doesn't exist in our accumulator yet, create it
  if (!acc[row.wireSysId]) {
    acc[row.wireSysId] = {
      id: row.wireSysId,
      title: row.wireSysTitle,
      title2: row.wireSysTitle2,
      title3: row.wireSysTitle3,
      icon: row.wireSysIcon,
      contents: [] // This will hold the multiple content parts
    };
  }

  // Push the content part into the wireSys content array
  if (row.contentId) {
    acc[row.wireSysId].contents.push({
      id: row.contentId,
      title: row.contentTitle,
      para: row.contentPara
    });
  }

  return acc;
}, {});

// Convert the object map back into a clean array
const result = Object.values(groupedMap);

        return res.status(200).json(new ApiResponse(200, result, "Success."))
      } catch (error) {
        console.log(error, "from get wire system")
        return res.status(500).json(new ApiError(500, [], "Internal Server Error."));
      }
    })
    // get particular wire system by id
    const getWireSystemById = asyncHandler(async (req, res) => {
      const { id } = req.params;
      try {
       
const [rows] = await pool.query(`
  SELECT 
    lpw.id AS wireSysId, 
    lpw.title AS wireSysTitle, 
    lpw.title2 AS wireSysTitle2, 
    lpw.title3 AS wireSysTitle3, 
    lpw.icon AS wireSysIcon, 
    lpwc.id AS contentId, 
    lpwc.title AS contentTitle, 
    lpwc.para AS contentPara, 
    lpwc.wireSysId AS contentWireSysId 
  FROM landing_page_wiresys lpw 
  INNER JOIN landing_page_wiresys_contents lpwc ON lpw.id = lpwc.wireSysId
    WHERE lpw.id = ?
`, [id])

// Group the flat rows into a structured object
const groupedMap = rows.reduce((acc, row) => {
  // If the wireSys doesn't exist in our accumulator yet, create it
  if (!acc[row.wireSysId]) {
    acc[row.wireSysId] = {
      id: row.wireSysId,
      title: row.wireSysTitle,
      title2: row.wireSysTitle2,
      title3: row.wireSysTitle3,
      icon: row.wireSysIcon,
      contents: [] // This will hold the multiple content parts
    };
  }

  // Push the content part into the wireSys content array
  if (row.contentId) {
    acc[row.wireSysId].contents.push({
      id: row.contentId,
      title: row.contentTitle,
      para: row.contentPara
    });
  }

  return acc;
}, {});

// Convert the object map back into a clean array
const result = Object.values(groupedMap);




        return res.status(200).json(new ApiResponse(200, result, "Success."))
      } catch (error) {
        console.log(error, "from get wire system")
        return res.status(500).json(new ApiError(500, [], "Internal Server Error."));
      }
    })

    // POWER EVACUATION
    // POWEER EVACUATION| LAST ONE BELLOW 
// landing_page_evacuation:
// icon, title, title2, para/
const updateEvacuation = asyncHandler(async (req, res)=>{
  const {id} = req.params;
  const {icon, title, title2, para} = req.body;

try {
  const [result] = await pool.query(
    `UPDATE landing_page_evacuation SET icon = ?, title = ?, title2 = ?, para = ? WHERE id = ?`,
    [icon, title, title2, para, id]
  )

  if(result.affectedRows  !==1) return res.status(500).json(new ApiError(500, [], "Failed to save."));

  return res.status(200).json(new ApiResponse(200, [], "Evacuation updated successfully."))

} catch (error) {
  console.log(error)
  return res.status(500).json(new ApiError(500, [], "Internal Server Error."));
}

})
// get evacuation || ALL
const getEvacuation = asyncHandler(async (req, res) => {
try {
  const [result] = await pool.query(`SELECT * FROM landing_page_evacuation`)
  return res.status(200).json(new ApiResponse(200, result, "Success."))
} catch (error) {
  console.log(error, "from get evacuation")
  return res.status(500).json(new ApiError(500, [], "Internal Server Error."));
}
})
// get evacuation || ALL
const getEvacuationById = asyncHandler(async (req, res) => {
const { id } = req.params;
try {
  const [result] = await pool.query(`SELECT * FROM landing_page_evacuation WHERE id = ?`, [id])
  return res.status(200).json(new ApiResponse(200, result, "Success."))
} catch (error) {
  console.log(error, "from get evacuation")
  return res.status(500).json(new ApiError(500, [], "Internal Server Error."));
}
})


module.exports = {
    createProjectOverView, 
    updateProjectOverView, 
    getProjectOverView,
    getProjectOverViewById, 
    createWireSystem, 
    getWireSystem, 
    getWireSystemById, 
    updateWireSystem, 
          updateEvacuation,
      getEvacuation,
      getEvacuationById
}