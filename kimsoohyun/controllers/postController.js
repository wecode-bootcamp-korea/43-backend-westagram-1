const postService = require('../services/postService');

const create = async (req, res) => {
    try {
        const {imageUrl, title, content, userId} = req.body;
        if (!imageUrl || !title || !content || !userId) {
            return res.status(400).json({message: "KEY_ERROR"});
        }
        await postService.create(imageUrl, title, content, userId);
        return res.status(201).json({
            message: "POST_CREATED"
        })
    } catch (err) {
        console.log(err);
        return res.status(err.statusCode || 500).json({message: err.message});
    }
};

const list = async (req, res) => {
    try {
        const postsList = await postService.list();
        res.status(201).json({postsList})
    } catch (err) {
        console.log(err)
        return res.status(err.statusCode || 500).json({message: err.message})
    }
}


module.exports = {create, list}