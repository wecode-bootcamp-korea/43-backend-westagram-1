const userService = require('../services/userService');

const signUp = async (req, res) => {
    try {
        const {name, email, password, profileImage} = req.body;
        if (!name || !email || !password || !profileImage) {
            return res.status(400).json({message: "KEY_ERROR"});
        }
        await userService.signUp(name, email, password, profileImage);
        return res.status(201).json({
            message: "SIGNUP_SUCCESS"
        })
    } catch (err) {
        console.log(err);
        return res.status(err.statusCode || 500).json({message: err.message});
    }
};

const list = async (req, res) => {
    try {
        const usersList = await userService.list();
        res.status(201).json({usersList})
    } catch (err) {
        console.log(err)
        return res.status(err.statusCode || 500).json({message: err.message})
    }
}

const posts = async (req, res) => {
    try {
        const {userId} = req.params
        const usersPosts = await userService.posts(userId)
        res.status(201).json({usersPosts})
    } catch (err) {
        console.log(err)
        return res.status(err.statusCode || 500).json({message: err.message})
    }
}

const likes = async (req, res) => {
    try {
        const {userId} = req.params
        const usersLikes = await userService.likes(userId)
        res.status(201).json({usersLikes})
    } catch (err) {
        console.log(err)
        return res.status(err.statusCode || 500).json({message: err.message})
    }
}

const updateUser = async (req, res) => {
    try {
        const {userId} = req.params;
        const {name, email, password, profileImage} = req.body;
        if (!name || !email || !password || !profileImage) {
            return res.status(400).json({message: "KEY_ERROR"});
        }
        await userService.updateUser(name, email, password, profileImage, userId);
        return res.status(201).json({
            message: "UPDATE_SUCCESS"
        })
    } catch (err) {
        console.log(err);
        return res.status(err.statusCode || 500).json({message: err.message});
    }
}

const updatePost = async (req, res) => {
    try {
        const {userId, postId} = req.params;
        const {imageUrl, title, content} = req.body;
        if (!imageUrl || !title || !content) {
            return res.status(400).json({message: "KEY_ERROR"});
        }
        await userService.updatePost(imageUrl, title, content, userId, postId);
        return res.status(201).json({
            message: "UPDATE_SUCCESS"
        })
    } catch (err) {
        console.log(err);
        return res.status(err.statusCode || 500).json({message: err.message});
    }
}

const updateLike = async (req, res) => {
    try {
        const {userId} = req.params;
        const {postId} = req.body;
        if (!postId) {
            return res.status(400).json({message: "KEY_ERROR"});
        }
        await userService.updateLike(postId, userId);
        return res.status(201).json({
            message: "UPDATE_SUCCESS"
        })
    } catch (err) {
        console.log(err);
        return res.status(err.statusCode || 500).json({message: err.message});
    }
}

const deleteUser = async (req, res) => {
    try {
        const {userId} = req.params;
        await userService.deleteUser(userId);
        return res.status(201).json({
            message: "DELETE_SUCCESS"
        })
    } catch (err) {
        console.log(err);
        return res.status(err.statusCode || 500).json({message: err.message});
    }
};

const deletePost = async (req, res) => {
    try {
        const {userId, postId} = req.params;
        await userService.deletePost(userId, postId);
        return res.status(201).json({
            message: "DELETE_SUCCESS"
        })
    } catch (err) {
        console.log(err);
        return res.status(err.statusCode || 500).json({message: err.message});
    }
}

const deleteLike = async (req, res) => {
    try {
        const {userId} = req.params;
        await userService.deleteLike(userId);
        return res.status(201).json({
            message: "DELETE_SUCCESS"
        })
    } catch (err) {
        console.log(err);
        return res.status(err.statusCode || 500).json({message: err.message});
    }
};

module.exports = {signUp, list, posts, likes, updateUser, updatePost, updateLike, deleteUser, deletePost, deleteLike}