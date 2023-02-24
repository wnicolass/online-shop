const multer = require('multer');
const multerConfig = require('../config/multer-config');

const upload = multer(multerConfig);

const configuredMulterMiddleware = upload.single('image');

module.exports = configuredMulterMiddleware;
