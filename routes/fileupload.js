const express = require('express');
const multer = require('multer');
const path = require('path');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, './uploads'),
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  if (['image/jpeg', 'image/jpg', 'image/png'].includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb({ status: 400, message: 'Invalid file type. Only JPEG, JPG, and PNG are allowed.' });
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: fileFilter
});

router.post('/', (req, res) => {
  upload.single('image')(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred (e.g., file size exceeded)
      return res.status(400).send('Multer error: ' + err.message);
    } else if (err) {
      // Handle the custom fileFilter error
      return res.status(err.status || 500).send(err.message || 'Internal Server Error');
    }
    // If no errors, the file is uploaded successfully
    const imagePath = '/uploads/' + req.file.filename;
    res.send({message: "Image uploaded successfully", relative_path: imagePath});
  });
});

module.exports = router;