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

const createLike = async (userId, postId) => {
    try {
        return await appDataSource.query(
            `INSERT INTO likes(user_id, post_id)
             VALUES (?, ?);
            `, [userId, postId]);
    } catch (err) {
        const error = new Error('INVALID_DATA_INPUT');
        error.statusCode = 500;
        throw error;
    }
};

const seeLikes = async () => {
    try {
        return await appDataSource.query(`
            SELECT id,
                   user_id,
                   post_id
            FROM likes`);
    } catch (err) {
        const error = new Error('CANNOT_SEE_LIKES_LIST');
        err.statusCode = 500;
        throw error;
    }
}

module.exports = {
    createLike, seeLikes
}