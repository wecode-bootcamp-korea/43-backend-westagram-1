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

const createPost = async (imageUrl, title, content, userId) => {
    try {
        return await appDataSource.query(`
            INSERT INTO posts(image_url, title, content, user_id)
            VALUES (?, ?, ?, ?);
        `, [imageUrl, title, content, userId]);
    } catch (err) {
        const error = new Error('INVALID_DATA_INPUT');
        error.statusCode = 500;
        throw error;
    }
};

const seePosts = async () => {
    try {
        return await appDataSource.query(`
            SELECT users.id            as userId,
                   users.profile_image as userProfileImage,
                   posts.id            as postingId,
                   posts.image_url     as postingImageUrl,
                   posts.content       as postingContent
            FROM posts
                     INNER JOIN users ON users.id = posts.user_id`);
    } catch (err) {
        const error = new Error('CANNOT_SEE_POSTS_LIST');
        err.statusCode = 500;
        throw error;
    }
};


module.exports = {
    createPost, seePosts
}