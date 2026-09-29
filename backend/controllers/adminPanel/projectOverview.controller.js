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

    const { icon, title, note, contentData, deletedContentIds } = req.body;



if(!title || !contentData) return res.status(409).json(new ApiResponse(409, [], "Title and Content title are required."));
const connection = await pool.getConnection();

try {
    
    await connection.beginTransaction();

    // check the row exists first - a save that changes nothing reports 0 affected rows
    const [existing] = await connection.query(
        `SELECT id FROM landing_page_projover_cat WHERE id = ?`,
        [id]
    )

    if(existing.length !== 1) {
        await connection.rollback();
        return res.status(500).json(new ApiError(500, [], "Failed to save."));
    }

    await connection.query(
        `UPDATE landing_page_projover_cat SET icon = ?, title = ?, note = ? WHERE id = ?`,
        [icon, title, note, id]
    )

// content rows the admin removed in the editor
// deletedContentIds is an array of existing content ids [1, 2, 3]
var deletedContentRows = 0;
    if(Array.isArray(deletedContentIds) && deletedContentIds.length > 0){
        const [deleteResult] = await connection.query(
            `DELETE FROM landing_page_projeover_contents WHERE id IN (?) AND categoryId = ?`,
            [deletedContentIds, id]
        )

        deletedContentRows += deleteResult.affectedRows;
    }

// contentData is an array of objects [{id, conTitle, data, formula}, {conTitle, data, formula}, ...]
// rows without an id are new and get inserted, rows with an id get updated
var savedContentRows = 0;
    for(let i=0; i<contentData.length; i++){
        const content = contentData[i];

        // a content row without an id has never been saved - insert it
        if(content?.id === undefined || content?.id === null){
            await connection.query(
                `INSERT INTO landing_page_projeover_contents (conTitle, data, formula, categoryId) VALUES (?, ?, ?, ?)`,
                [content?.conTitle, content?.data, content?.formula, id]
            )

            savedContentRows += 1;
            continue;
        }

        await connection.query(
            `UPDATE landing_page_projeover_contents SET conTitle = ?, data = ?, formula = ? WHERE id = ? AND categoryId = ?`, 
            [content?.conTitle, content?.data, content?.formula, content?.id, id] 
        )

        savedContentRows += 1;
    }

     if(savedContentRows + deletedContentRows <1)     {
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
    `);

    const categoryMap = new Map();

    result.forEach((row) => {
      if (!categoryMap.has(row.categoryId)) {
        categoryMap.set(row.categoryId, {
          categoryId: row.categoryId,
          categoryIcon: row.categoryIcon,
          categoryTitle: row.categoryTitle,
          categoryNote: row.categoryNote,
          contents: [],
        });
      }

      categoryMap.get(row.categoryId).contents.push({
        contentId: row.contentId,
        contentTitle: row.contentTitle,
        contentData: row.contentData,
        contentFormula: row.contentFormula,
      });
    });

    const categories = Array.from(categoryMap.values());

    return res
      .status(200)
      .json(new ApiResponse(200, categories, "Success."));
  } catch (error) {
    console.log(error, "from get project overview");

    return res
      .status(500)
      .json(new ApiError(500, [], "Internal Server Error."));
  }
});


// GET PARTICULAR PROJECT OVERVIEW BY ID
const getProjectOverViewById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await pool.query(
      `
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
      `,
      [id]
    );

    const categoryMap = new Map();

    result.forEach((row) => {
      if (!categoryMap.has(row.categoryId)) {
        categoryMap.set(row.categoryId, {
          categoryId: row.categoryId,
          categoryIcon: row.categoryIcon,
          categoryTitle: row.categoryTitle,
          categoryNote: row.categoryNote,
          contents: [],
        });
      }

      categoryMap.get(row.categoryId).contents.push({
        contentId: row.contentId,
        contentTitle: row.contentTitle,
        contentData: row.contentData,
        contentFormula: row.contentFormula,
      });
    });

    const category = Array.from(categoryMap.values())[0];

    return res
      .status(200)
      .json(new ApiResponse(200, category, "Success."));
  } catch (error) {
    console.log(error, "from get project overview");

    return res
      .status(500)
      .json(new ApiError(500, [], "Internal Server Error."));
  }
});


// DELETE PARTICULAR PROJECT OVERVIEW BY ID
const deleteProjectOverViewById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) return res.status(409).json(new ApiResponse(409, [], "Project Overview ID is required."));

  const connection = await pool.getConnection();

  try {
    await connection.beginTransaction();

    // remove the contents first so it works even without ON DELETE CASCADE
    await connection.query(
      `DELETE FROM landing_page_projeover_contents WHERE categoryId = ?`,
      [id]
    );

    const [result] = await connection.query(
      `DELETE FROM landing_page_projover_cat WHERE id = ?`,
      [id]
    );

    if (result.affectedRows !== 1) {
      await connection.rollback();
      return res.status(500).json(new ApiError(500, [], "Failed to delete."));
    }

    await connection.commit();
    return res.status(200).json(new ApiResponse(200, [], "Project Overview deleted successfully."));

  } catch (error) {
    await connection.rollback().catch(() => {});
    console.log(error, "from delete project overview");
    return res.status(500).json(new ApiError(500, [], "Internal Server Error."));
  } finally {
    connection.release();
  }
});

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
        const {title, title2, title3, icon, contentData, deletedContentIds} = req.body;

        if(!title || !contentData) return res.status(409).json(new ApiResponse(409, [], "Title and Content title are required."));

        const connection = await pool.getConnection();
        try {
            
            await connection.beginTransaction();

            // check the row exists first - a save that changes nothing reports 0 affected rows
            const [existing] = await connection.query(
                `SELECT id FROM landing_page_wiresys WHERE id = ?`,
                [id]
            )

            if(existing.length !== 1) {
                await connection.rollback();
                return res.status(500).json(new ApiError(500, [], "Failed to save."));
            }

            await connection.query(
                `UPDATE landing_page_wiresys SET title = ?, title2 = ?, title3 = ?, icon = ? WHERE id = ?`,
                [title, title2, title3, icon, id]
            )

            // content rows the admin removed in the editor
            // deletedContentIds is an array of existing content ids [1, 2, 3]
            let deletedContentRows = 0;
            if(Array.isArray(deletedContentIds) && deletedContentIds.length > 0){
                const [deleteResult] = await connection.query(
                    `DELETE FROM landing_page_wiresys_contents WHERE id IN (?) AND wireSysId = ?`,
                    [deletedContentIds, id]
                )

                deletedContentRows += deleteResult.affectedRows;
            }

            // contentData is an array of objects [{id, title, para}, {title, para}, ...]
            // rows without an id are new and get inserted, rows with an id get updated
            let savedContentRows = 0;
            for(let i=0; i<contentData.length; i++){
                const content = contentData[i];

                // a content row without an id has never been saved - insert it
                if(content?.id === undefined || content?.id === null){
                    await connection.query(
                        `INSERT INTO landing_page_wiresys_contents (title, para, wireSysId) VALUES (?, ?, ?)`,
                        [content?.title, content?.para, id]
                    )

                    savedContentRows += 1;
                    continue;
                }

                await connection.query(
                    `UPDATE landing_page_wiresys_contents SET title = ?, para = ? WHERE id = ? AND wireSysId = ?`, 
                    [content?.title, content?.para, content?.id, id] 
                )

                savedContentRows += 1;
            }
            if(savedContentRows + deletedContentRows <1) {
                await connection.rollback();
                return res.status(500).json(new ApiError(500, [], "Failed to save...."));
            }


            await connection.commit();
            return res.status(200).json(new ApiResponse(200, [], "Wire system updated successfully."));

        }   catch (error) {
            connection.rollback()
            console.log(error)
            return res.status(500).json(new ApiError(500, [], error.message));
        }finally {
            connection.release();
        }


    })

    // delete particular wire system by id
    const deleteWireSystemById = asyncHandler(async (req, res) => {
      const { id } = req.params;

      if (!id) return res.status(409).json(new ApiResponse(409, [], "Wire System ID is required."));

      const connection = await pool.getConnection();

      try {
        await connection.beginTransaction();

        // remove the contents first so it works even without ON DELETE CASCADE
        await connection.query(
          `DELETE FROM landing_page_wiresys_contents WHERE wireSysId = ?`,
          [id]
        );

        const [result] = await connection.query(
          `DELETE FROM landing_page_wiresys WHERE id = ?`,
          [id]
        );

        if (result.affectedRows !== 1) {
          await connection.rollback();
          return res.status(500).json(new ApiError(500, [], "Failed to delete."));
        }

        await connection.commit();
        return res.status(200).json(new ApiResponse(200, [], "Wire system deleted successfully."));

      } catch (error) {
        await connection.rollback().catch(() => {});
        console.log(error, "from delete wire system");
        return res.status(500).json(new ApiError(500, [], "Internal Server Error."));
      } finally {
        connection.release();
      }
    });

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
  // check the row exists first - a save that changes nothing reports 0 affected rows
  const [existing] = await pool.query(
    `SELECT id FROM landing_page_evacuation WHERE id = ?`,
    [id]
  )

  if(existing.length !== 1) return res.status(500).json(new ApiError(500, [], "Failed to save."));

  await pool.query(
    `UPDATE landing_page_evacuation SET icon = ?, title = ?, title2 = ?, para = ? WHERE id = ?`,
    [icon, title, title2, para, id]
  )

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
    deleteProjectOverViewById,
    createWireSystem, 
    getWireSystem, 
    getWireSystemById, 
    updateWireSystem, 
    deleteWireSystemById, 
          updateEvacuation,
      getEvacuation,
      getEvacuationById
}