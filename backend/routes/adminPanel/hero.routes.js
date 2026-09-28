






const {Router} = require('express');
const router = Router();
const hero = require('../../controllers/adminPanel/hero.controller') 
const { authenticateAccessToken } = require('../../middlewares/authMiddleWare');
const { upload } = require('../../middlewares/upload');






// 1. 
// create hero 
router.route('/').put(
    authenticateAccessToken,
    upload({folder: 'landingPage/hero'}).single('image'),
    hero.createHero
);
// get hero 
router.route('/').get(
    upload({folder: 'landingPage/hero'}).single('image'),
    hero.getHero
);

// 2. 
// create hero CARD
router.route('/card/:id').put(
    authenticateAccessToken,
    upload({folder: 'landingPage/herocard'}).single('image'),
    hero.updateHeroCard
)
// get hero card || GET ALL
router.route('/card').get(
    hero.getHeroCard
)
// get hero card by id || GET PARTICULAR
router.route('/card/:id').get(
    hero.getHeroCardById
)



module.exports = router;