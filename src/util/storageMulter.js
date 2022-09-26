const multer = require('multer');
const path = require('path');

// SET STORAGE
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'src/public/upload/');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + new Date().toISOString().replace(/:/g, '-'));
    },
});

const upload = multer({ storage: storage });

module.exports = upload;
