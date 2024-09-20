const userLoggedOut = (req, res) => {
    try {
        // Retrieve the userName from req.user (assuming it's available)
        const userName = req.user ? req.user.userName : 'User';

        // Clear the access_token cookie
        res.clearCookie('access_token', {
            httpOnly: true,
            secure: true,
            sameSite: 'none'
        });

        // Send a successful response with the userName
        res.status(200).send({ userName, message: "User logged out successfully" });
    } catch (error) {
        // Send an error response
        res.status(500).send({ message: "Internal server error" });
    }
}

module.exports = userLoggedOut;
