const multer = require('multer');
const path = require('path');

// Set storage engine
const storage = multer.diskStorage({
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});

// Check file type
const checkFileType = (file, cb) => {
    const fileTypes = [".png", ".jpg", ".jpeg", ".gif"];
    const extname = fileTypes.includes(path.extname(file.originalname).toLowerCase());
    const mimetype = file.mimetype.startsWith("image/");

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb("Error: Images Only!");
    }
};

const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 2 }, // 2MB limit
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    }
});

module.exports = upload;
