const User = require('../../model/userModel');

const getProfileController = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password'); 
        
        if (!user) {
            return res.send({ error: "User not found" });
        }

        res.send({
            username: user.username,
            email: user.email,
            avatarUrl: user.avatarUrl
        })
    } catch (error) {
        res.send({ error: "Server error" });
    }
};

module.exports = getProfileController;