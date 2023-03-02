const likeService = require('../services/likeService');
const userService = require("../services/userService");

const create = async (req, res) => {
    try {
        const {userId, postId} = req.body;
        if (!userId || !postId) {
            return res.status(400).json({message: "KEY_ERROR"});
        }
        await likeService.create(userId, postId);
        return res.status(201).json({
            message: "LIKE_CREATED"
        })
    } catch (err) {
        console.log(err);
        return res.status(err.statusCode || 500).json({message: err.message});
    }
};

const list = async (req, res) => {
    try {
        const likesList = await likeService.list();
        res.status(201).json({likesList})
    } catch (err) {
        console.log(err)
        return res.status(err.statusCode || 500).json({message: err.message})
    }
}

module.exports = {create, list}