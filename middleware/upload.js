const multer = require('multer');
const path = require('path');
const { STATIC_PATH } = require('../constants');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(STATIC_PATH, 'images'));
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now());
  },
});

function fileFilter (req, file, cb) {
  const FILE_MIMETYPE_REGEXP = /^image\/(gif|jpeg|png)$/;

  // cb(null, FILE_MIMETYPE_REGEXP.test(file.mimetype))

  if (FILE_MIMETYPE_REGEXP.test(file.mimetype)) {
    return cb(null, true);
  }
  cb(null, false);
}

module.exports.uploadUserImage = multer({ storage, fileFilter });
