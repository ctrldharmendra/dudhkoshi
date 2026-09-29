
const {Router} = require('express');
const router = Router();
const gallery = require('../../controllers/adminPanel/gallery.controller')
const { authenticateAccessToken } = require('../../middlewares/authMiddleWare');
const { upload } = require('../../middlewares/upload');






// create gallery
router.route('/').post(
    authenticateAccessToken,
    upload({folder: 'landingPage/gallery'}).single('image'),
    gallery.createGallery
);

// delete gallery
router.route('/:id').delete(
    authenticateAccessToken,
    gallery.deleteGallery
);

// update gallery
router.route('/:id').put(
    authenticateAccessToken,
    upload({folder: 'landingPage/gallery'}).single('image'),
    gallery.updateGalleryById
);

// get all gallery
router.route('/').get(
    gallery.getGallery
);

// get particular gallery
router.route('/:id').get(
    gallery.getGalleryById
);


module.exports = router;