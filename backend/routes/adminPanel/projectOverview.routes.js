






const {Router} = require('express');
const router = Router();
const projectOverview = require('../../controllers/adminPanel/projectOverview.controller')
const { authenticateAccessToken } = require('../../middlewares/authMiddleWare');
const { upload } = require('../../middlewares/upload');






// create project overview
router.route('/').post(
    authenticateAccessToken,
    projectOverview.createProjectOverView
);
// update particluar project overview by id
router.route('/:id').put(
    authenticateAccessToken,
    projectOverview.updateProjectOverView
);
// get all project overview 
router.route('/').get(
    projectOverview.getProjectOverView
);
// get particular project overview by id
router.route('/:id').get(   
    projectOverview.getProjectOverViewById
);

// WIRES SYSTEM 
// create 
router.route('/wiresys/water').post(
    authenticateAccessToken,
    projectOverview.createWireSystem
)
// get all 
router.route('/wiresys/water').get(
    projectOverview.getWireSystem
)
// get particular wire system by id
router.route('/wiresys/water/:id').get(
    projectOverview.getWireSystemById
)
// update wire system
router.route('/wiresys/water/:id').put(
    authenticateAccessToken,
    projectOverview.updateWireSystem
)

// ROJECT EVACUATION 
// update 
// get all 
router.route('/power/evacuation').get(
    projectOverview.getEvacuation
)
// get particular evacuation by id
router.route('/power/evacuation/:id').get(
    projectOverview.getEvacuationById
)
// update evacuation
router.route('/power/evacuation/:id').put(
    authenticateAccessToken,
    projectOverview.updateEvacuation
)
module.exports = router;