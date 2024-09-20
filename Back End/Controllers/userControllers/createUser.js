const UserModel = require("../../Models/userModel");
const bcrypt = require('bcrypt');
const cloudinary = require('../../Config/cloudniryConfig');
const jwt = require('jsonwebtoken');  

const createUser = async (req, res) => {
    let cloudinaryImageId;
    try {
        const { userName, email, password } = req.body;

        // Check if the user already exists
        const userExists = await UserModel.findOne({ email });
        if (userExists) {
            return res.status(409).json({ message: 'User already exists' });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Upload the image if provided
        let imageURL;
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: 'users',
            });
            imageURL = result.secure_url;
            cloudinaryImageId = result.public_id;
        } else {
            imageURL = "https://w7.pngwing.com/pngs/312/283/png-transparent-man-s-face-avatar-computer-icons-user-profile-business-user-avatar-blue-face-heroes-thumbnail.png";
        }

        // Create and save the new user
        const newUser = new UserModel({
            userName,
            email,
            password: hashedPassword,
            image: imageURL,
            cloudinaryImageId,
        });

        await newUser.save();

        // Generate a JWT token
        const token = jwt.sign(
            {
                userId: newUser._id,
                email: newUser.email,
                userName: newUser.userName,
                image: newUser.image,
                registerTime: newUser.createdAt,
            },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }  // 7 days
        );

        // Set the cookie with the token
        res.cookie('access_token', token, {
            maxAge: 7 * 24 * 60 * 60 * 1000,    // 7 days
            httpOnly: true,
            secure: true,
            sameSite: 'none'
        });

        // Return the token in the response body
        res.status(201).json({ message: 'User created successfully', token });
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { createUser };
