// middlewares/uploadPermissions.js

const FOLDER_PERMISSIONS = {
  'bid-form':         'view_bid',          // bid creator attachments
  'bid-applications': 'view_bid',          // applicant submitted files
  'users':            null,                // null = just needs login, no specific permission
};

module.exports = { FOLDER_PERMISSIONS };