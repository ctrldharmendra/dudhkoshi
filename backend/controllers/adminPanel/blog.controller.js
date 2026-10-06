// landing_page_blogs:
// title	content	coverImage


const asyncHandler = require("../../utils/asyncHandler")
const ApiError = require("../../utils/ApiErrors")
const ApiResponse = require("../../utils/ApiResponse")
const { pool } = require('../../db/index')
const { saveFiles } = require("../../middlewares/upload")
const path = require('path')
const helper = require('../../helper/helper')
const fs = require("fs/promises");

// create blog 
const createBlogs = asyncHandler(async (req, res) => {
  const { title, content, category } = req.body;

  if (!title || !content || !category) return res.status(409).json(new ApiResponse(409, [], "Title, Content and Category required."));

  const connection = await pool.getConnection();

  try {

    await connection.beginTransaction();
    const [result] = await connection.query(
      `INSERT INTO landing_page_blogs (title, content, category, userId) VALUES (?, ?, ?, ?)`,
      [title, content, category, req?.user?.id]
    )

    if (result.affectedRows !== 1) {
      connection.rollback()

      return res.status(500).json(new ApiError(500, [], "Failed to save."));
    }



    const saved = await saveFiles(req, 'landingPage/blogs');
    if (saved?.coverImage) {
      await connection.query(
        'UPDATE landing_page_blogs SET coverImage = ? WHERE id = ?',
        [saved?.coverImage, result.insertId]
      )
    }

    connection.commit()
    return res.status(200).json(new ApiResponse(200, [], "blog created successfully."))

  } catch (error) {
    connection.rollback()
    console.log(error, "FROM blog")
    return res.status(500).json(
      new ApiError(
        500,
        "",
        error.message
      )
    );
  } finally {
    connection.release();
  }

})

// edit blog by its id 
const editBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, content, category } = req.body;

  if (!title || !content || !category) return res.status(409).json(new ApiResponse(409, [], "Title, Content and Category required."));

  const connection = await pool.getConnection();

  try {

    //    check if this blog exist 
    const [exists] = await connection.query(
      `SELECT id, coverImage FROM landing_page_blogs WHERE id = ?`,
      [id]
    )

    if (!exists?.length) return res.status(409).json(new ApiResponse(409, [], "Blog not found."));

    let coverImage = exists?.[0]?.coverImage

    if (req?.file) {
      // delete previous image from server 
      if (coverImage) {
        const fullImgPath = path.join(process.cwd(), "uploads", coverImage);
        try {
          await fs.unlink(fullImgPath);
          // console.log(fullImgPath)
        } catch (err) {
          connection.rollback()
          if (err.code !== "ENOENT") {
            throw err;
          }
        }
      }

      // then update the new image 
      const saved = await saveFiles(req, 'landingPage/blogs');
      if (saved?.coverImage) {
        await connection.query(
          'UPDATE landing_page_blogs SET coverImage = ? WHERE id = ?',
          [saved?.coverImage, id]
        )
      }
    }

    // now update textal 
    const [result] = await connection.query(
      `UPDATE landing_page_blogs SET title = ?, content = ?, category = ? WHERE id = ?`,
      [title, content, category, id]
    )

    if (result.affectedRows !== 1) {
      connection.rollback()

      return res.status(500).json(new ApiError(500, [], "Failed to save."));
    }

    connection.commit()
    return res.status(200).json(new ApiResponse(200, [], "blog updated successfully."))

  } catch (error) {
    connection.rollback()
    console.log(error, "FROM blog")
    return res.status(500).json(
      new ApiError(
        500,
        "",
        error.message
      )
    );
  } finally {
    connection.release();
  }

})

// get all blogs 
const getBlogs = asyncHandler(async (req, res) => {

  try {

const page = Math.max(Number(req.query.page) || 1, 1);
const limit = Math.min(Math.max(Number(req.query.limit) || 10, 1), 100);
const offset = (page - 1) * limit;
const title = req.query.title || "";

// Get blogs
let sql = `SELECT * FROM landing_page_blogs`;
const params = [];

if (title) {
  sql += ` WHERE title = ?`;
  params.push(title);
}

sql += ` ORDER BY created_at DESC LIMIT ${limit} OFFSET ${offset}`;

const [result] = await pool.query(sql, params);

// Get total count
let countSql = `SELECT COUNT(*) AS total FROM landing_page_blogs`;
const countParams = [];

if (title) {
  countSql += ` WHERE title = ?`;
  countParams.push(title);
}

const [countResult] = await pool.query(countSql, countParams);

const total = countResult[0].total;
const totalPages = Math.ceil(total / limit);

res.json({
  data: result,

  pagination: {
    page,
    limit,
    total,
    totalPages,
    isNext: page < totalPages,
    isPrevious: page > 1
  }
});


  } catch (error) {
    console.log(error, "from get blogs")
    return res.status(500).json(new ApiError(500, error, "Internal Server Error."));
  }
})

// delete blog by id 
const deleteBlog = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const connection = await pool.getConnection();

  try {

    //    check if this blog exist 
    const [exists] = await connection.query(
      `SELECT id, coverImage FROM landing_page_blogs WHERE id = ?`,
      [id]
    )

    if (!exists?.length) return res.status(409).json(new ApiResponse(409, [], "Blog not found."));

    let coverImage = exists?.[0]?.coverImage

    if (coverImage) {
      const fullImgPath = path.join(process.cwd(), "uploads", coverImage);
      try {
        await fs.unlink(fullImgPath);
      } catch (err) {
        connection.rollback()
        if (err.code !== "ENOENT") {
          throw err;
        }
      }
    }


    // delete the blog 
    const [result] = await connection.query(
      `DELETE FROM landing_page_blogs WHERE id = ?`,
      [id]
    )
    if (result.affectedRows !== 1) {
      connection.rollback()

      return res.status(500).json(new ApiError(500, [], "Failed to delete."));
    }

    connection.commit()
    return res.status(200).json(new ApiResponse(200, [], "blog deleted successfully."))

  } catch (error) {
    connection.rollback()
    console.log(error, "from delete blog")
    return res.status(500).json(new ApiError(500, [], "Internal Server Error."));
  }
})

// get blog by id 
const getBlogById = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const connection = await pool.getConnection();

  try {

    //    check if this blog exist 
    const [exists] = await connection.query(
      `SELECT id, coverImage FROM landing_page_blogs WHERE id = ?`,
      [id]
    )

    if (!exists?.length) return res.status(409).json(new ApiResponse(409, [], "Blog not found."));

    // let coverImage = exists?.[0]?.coverImage

    // if (coverImage) {
    //   const fullImgPath = path.join(process.cwd(), "uploads", coverImage);
    //   try {
    //     await fs.unlink(fullImgPath);
    //   } catch (err) {
    //     connection.rollback()
    //     if (err.code !== "ENOENT") {
    //       throw err;
    //     }
    //   }
    // }

    const [result] = await connection.query(
      `SELECT * FROM landing_page_blogs WHERE id = ?`,
      [id]
    )

    return res.status(200).json(new ApiResponse(200, result, "Success."))

  } catch (error) {
    connection.rollback()
    console.log(error, "from get blog")
    return res.status(500).json(new ApiError(500, [], "Internal Server Error."));
  }
})

module.exports = {
  createBlogs,

  editBlog,
  deleteBlog,
  getBlogs,
  getBlogById,
}
