
const {Router} = require('express');
const router = Router();
const { authenticateAccessToken } = require('../../middlewares/authMiddleWare');
const protectFileController = require('../../controllers/protectFile/protectFile.controller');




// router.get("/uploads/*path", authenticateAccessToken, protectFileController.getFile);
router.get(
  "/uploads/*path",
  (req, res, next) => {
    const path = req.params.path;

    const isPublicLandingPage =
      Array.isArray(path)
        ? path[0] === "landingPage"
        : typeof path === "string" && path.split("/")[0] === "landingPage";

    if (isPublicLandingPage) {
      return next();
    }
// for other file check accesstoken 
    return authenticateAccessToken(req, res, next);
  },
  protectFileController.getFile
);




module.exports = router;
