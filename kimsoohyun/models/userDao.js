const {DataSource} = require('typeorm');

const appDataSource = new DataSource({
    type: process.env.TYPEORM_CONNECTION,
    host: process.env.TYPEORM_HOST,
    port: process.env.TYPEORM_PORT,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE
});

appDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err);
        appDataSource.destroy();
    });

const createUser = async (name, email, password, profileImage) => {
    try {
        return await appDataSource.query(`
            INSERT INTO users(name, email, password, profile_image)
            VALUES (?, ?, ?, ?);
        `, [name, email, password, profileImage]);
    } catch (err) {
        const error = new Error('INVALID_DATA_INPUT');
        error.statusCode = 500;
        throw error;
    }
};

const seeUsers = async () => {
    try {
        return await appDataSource.query(`
            SELECT id,
                   name,
                   email,
                   profile_image,
                   password
            FROM users`
        );
    } catch (err) {
        const error = new Error('CANNOT_SEE_USERS_LIST');
        err.statusCode = 500;
        throw error;
    }
}

const seeUsersPosts = async (userId) => {
    try {
        return await appDataSource.query(`
            SELECT users.id            as userId,
                   users.profile_image as userProfileImage,
                   JSON_ARRAYAGG(
                           JSON_OBJECT(
                                   'postingId', posts.id,
                                   'postingImageUrl', posts.image_url,
                                   'postingContent', posts.content
                               ))
                                       as postings
            FROM users
                     INNER JOIN posts ON users.id = posts.user_id
            WHERE users.id = ?
            GROUP BY users.id
        `, [userId])
    } catch (err) {
        const error = new Error('NO_POSTS');
        err.statusCode = 500;
        throw error;
    }
}

const seeUsersLikes = async (userId) => {
    try {
        return await appDataSource.query(`
            SELECT posts.id      as posting_id,
                   posts.title   as posting_title,
                   posts.content as posting_content,
                   users.name    as author,
                   liker.name    as like_user
            FROM posts
                     INNER JOIN users ON users.id = posts.user_id
                     INNER JOIN likes ON users.id = likes.user_id
                     INNER JOIN users as liker ON liker.id = likes.user_id
            WHERE users.id = ?
        `, [userId])
    } catch (err) {
        const error = new Error('NO_LIKES');
        err.statusCode = 500;
        throw error;
    }
}

const updateUser = async (name, email, password, profileImage, userId) => {
    try {
        return await appDataSource.query(
            `UPDATE users
             SET name=?,
                 email=?,
                 profile_image=?,
                 password=?
             WHERE id = ?`, [name, email, profileImage, password, userId]
        );
    } catch (err) {
        const error = new Error('INVALID_DATA_INPUT');
        error.statusCode = 500;
        throw error;
    }
};

const updatePost = async (imageUrl, title, content, userId, postId) => {
    try {
        return await appDataSource.query(
            `UPDATE posts
             SET image_url=?,
                 title=?,
                 content=?
             WHERE user_id = ?
               AND id = ?`, [imageUrl, title, content, userId, postId]
        );
    } catch (err) {
        const error = new Error('INVALID_DATA_INPUT');
        error.statusCode = 500;
        throw error;
    }
}

const updateLike = async (postId, userId) => {
    try {
        return await appDataSource.query(
            `UPDATE likes
             SET post_id=?
             WHERE user_id = ?`, [postId, userId]
        );
    } catch (err) {
        const error = new Error('INVALID_DATA_INPUT');
        error.statusCode = 500;
        throw error;
    }
};

const deleteUser = async (userId) => {
    try {
        return await appDataSource.query(
            `DELETE
             FROM users
             WHERE id = ?`, [userId]);
    } catch (err) {
        const error = new Error('INVALID_DATA_INPUT');
        err.statusCode = 500;
        throw error;
    }
}

const deletePost = async (userId, postId) => {
    try {
        return await appDataSource.query(
            `DELETE
             FROM posts
             WHERE user_id = ?
               AND id = ?`, [userId, postId]);
    } catch (err) {
        const error = new Error('INVALID_DATA_INPUT');
        err.statusCode = 500;
        throw error;
    }
}

const deleteLike = async (userId) => {
    try {
        return await appDataSource.query(
            `DELETE
             FROM likes
             WHERE user_id = ?`, [userId]
        );
    } catch (err) {
        const error = new Error('INVALID_DATA_INPUT');
        error.statusCode = 500;
        throw error;
    }
}

module.exports = {
    createUser,
    seeUsers,
    seeUsersPosts,
    seeUsersLikes,
    updateUser,
    updatePost,
    updateLike,
    deleteUser,
    deletePost,
    deleteLike
}