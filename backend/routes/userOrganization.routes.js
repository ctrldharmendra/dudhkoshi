const {Router} = require('express');
const router = Router();
const { upload }     = require('../middlewares/upload');
const { authenticateAccessToken } = require('../middlewares/authMiddleWare');
const userOrganizationController = require("../controllers/userOrganization.controller")


// here this setuploade folder means it helps to save the userId of the logged in user while saving its document. 
// eg: ram who has userId 13 loggedIn and if he uploads a document then it will be saved in the folder 13/organizations-docs
function setFolder(folder) {
  return (req, res, next) => {
    if (!req._uploadFolder) {
      req._uploadFolder = folder;
    }
    next();
  };
}


// UPDATE USER ORGANIZATION 
router.route('/organizations').put(
    authenticateAccessToken,
    userOrganizationController.updateUserOrganization
)
// GET USER ORGANIZATION 
router.route('/organizations').get(
    authenticateAccessToken,
    userOrganizationController.getUserOrganization
)

// ORGANIZATION DOCUMENTS 
// GET ALL ORG DOCS 
router.route('/organizations/docs').get(
    authenticateAccessToken,
    userOrganizationController.getUserOrganizationDocs
)
// CREATE ORG DOC 
router.route('/organizations/docs').post(
  authenticateAccessToken,
  upload({ folder: 'organizations-docs' }).array('files', 20),
  userOrganizationController.createOrganizationDocs
)

// DELTE ORG DOC 
router.route('/organizations/docs/:id').delete(
    authenticateAccessToken,
    userOrganizationController.deleteOrganizationDocs
)



module.exports = router;