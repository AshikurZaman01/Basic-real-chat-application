const { v2: cloudinary } = require('cloudinary');

// Cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDNINE_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports = cloudinary;
