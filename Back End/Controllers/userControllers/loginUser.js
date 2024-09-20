const UserModel = require("../../Models/userModel");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const loginUser = async (req, res) => {
    try {
        // Find user by email
        const user = await UserModel.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({ message: `User with email ${req.body.email} not found` });
        }

        // Check if password matches
        const isPasswordMatched = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordMatched) {
            return res.status(401).json({ message: `Password not matched` });
        }

      

        // Respond with success and the token
        return res.status(200).json({ message: `Login Successful`, token: token });

    } catch (error) {
        // Handle errors
        return res.status(500).json({ message: error.message });
    }
};

module.exports = loginUser;
