const multer = require('multer');
const uuid = require('uuid').v4;
const { extname } = require('path');

module.exports = {
  storage: multer.diskStorage({
    destination: 'product-data/images',
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${uuid()}${extname(file.originalname)}`);
    },
  }),
};
