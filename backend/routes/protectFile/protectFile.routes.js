
const {Router} = require('express');
const router = Router();
const { authenticateAccessToken } = require('../../middlewares/authMiddleWare');
const protectFileController = require('../../controllers/protectFile/protectFile.controller');




router.get("/uploads/*path", authenticateAccessToken, protectFileController.getFile);


module.exports = router;
