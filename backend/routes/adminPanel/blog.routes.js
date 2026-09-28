






const {Router} = require('express');
const router = Router();
const blog = require('../../controllers/adminPanel/blog.controller')
const { authenticateAccessToken } = require('../../middlewares/authMiddleWare');
const { upload } = require('../../middlewares/upload');






// create blog
router.route('/').post(
    authenticateAccessToken,
    upload({folder: 'landingPage/blogs'}).single('coverImage'),
        blog.createBlogs
);

// update blog 
router.route('/:id').put(
    authenticateAccessToken,
    upload({folder: 'landingPage/blogs'}).single('coverImage'),
    blog.editBlog
);

// get all blogs 
router.route('/').get(
    blog.getBlogs
);

// delete blog 
router.route('/:id').delete(
    authenticateAccessToken,
    blog.deleteBlog
);


// get blog by id 
router.route('/:id').get(
    blog.getBlogById
);
module.exports = router;