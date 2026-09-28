






const {Router} = require('express');
const router = Router();
const team = require('../../controllers/adminPanel/team.controller')
const { authenticateAccessToken } = require('../../middlewares/authMiddleWare');
const { upload } = require('../../middlewares/upload');






// create team
router.route('/').post(
    authenticateAccessToken,
    upload({folder: 'landingPage/team'}).single('image'),
    team.createTeam
);
// update particlar team 
router.route('/:id').put(
    authenticateAccessToken,
    upload({folder: 'landingPage/team'}).single('image'),
    team.updateTeam
);
// get all team
router.route('/').get(
    team.getTeam
);
// get particular team
router.route('/:id').get(
    team.getTeamById
);     

// delete 
router.route('/:id').delete(
    authenticateAccessToken,
    team.deleteTeam
);
module.exports = router;