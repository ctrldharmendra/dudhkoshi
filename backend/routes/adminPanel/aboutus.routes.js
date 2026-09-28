






const {Router} = require('express');
const router = Router();
const aboutus = require('../../controllers/adminPanel/aboutus.controller')
const { authenticateAccessToken } = require('../../middlewares/authMiddleWare');
const { upload } = require('../../middlewares/upload');





// TECHNICAL SPECIFICATION 
// 1. 
// update technical specification
router.route('/technicalspc/:id').put(
    authenticateAccessToken,
    upload({folder: 'landingPage/aboutus'}).single('image'),
    aboutus.updateTechnicalSpecification
);
// 2. get all technical specification
router.route('/technicalspc').get(
    aboutus.getTechnicalSpecification
);
// 3. get technical specification by id
router.route('/technicalspc/:id').get(
    aboutus.getTechnicalSpecificationById
);

// SPATIAL CONSTRAINTS 
// update
router.route('/spatialconstraints/:id').put(
    authenticateAccessToken,
    aboutus.updateSpatialConstraints
);
// get all 
router.route('/spatialconstraints').get(
    aboutus.getSpatialConstraints
);
// get by id
router.route('/spatialconstraints/:id').get(
    aboutus.getSpatialConstraintsById
);
module.exports = router;