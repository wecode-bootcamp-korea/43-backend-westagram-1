require("dotenv").config();

const express = require('express')
const cors = require('cors')
const morgan = require('morgan');
const {DataSource} = require('typeorm');

const routes = require("./routes");

const appDataSource = new DataSource({
    type: process.env.TYPEORM_CONNECTION,
    host: process.env.TYPEORM_HOST,
    port: process.env.TYPEORM_PORT,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE
})

appDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })

const app = express()

app.use(express.json())
app.use(cors())
app.use(morgan('combined'));
app.use(routes);

app.get("/ping", (req, res) => {
    res.json({message: "pong"});
});

app.get('/users', async (req, res) => {
    const users = await appDataSource.query(`
        SELECT id,
               name,
               email,
               profile_image,
               password
        FROM users
    `)
    return res.status(200).json({users})
});
app.get('/users/:userId/posts', async (req, res) => {

    const {userId} = req.params
    const result = await appDataSource.query(`
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

    return res.status(200).json({"data": result})
})
app.get('/users/:userId/likes', async (req, res) => {
    const {userId} = req.params
    const likes = await appDataSource.query(`
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
    return res.status(200).json({"likes": likes})
})
app.get('/posts', async (req, res) => {
    const data = await appDataSource.query(`
        SELECT users.id            as userId,
               users.profile_image as userProfileImage,
               posts.id            as postingId,
               posts.image_url     as postingImageUrl,
               posts.content       as postingContent
        FROM posts
                 INNER JOIN users ON users.id = posts.user_id`)
    return res.status(200).json({"data": data})
})
app.get('/likes', async (req, res) => {
    const likes = await appDataSource.query(`
        SELECT id,
               user_id,
               post_id
        FROM likes`)
    return res.status(200).json({likes})
})

app.post('/users', async (req, res) => {
    const {name, email, profileImage, password} = req.body
    await appDataSource.query(
        `INSERT INTO users(name,
                           email,
                           profile_image,
                           password)
         VALUES (?, ?, ?, ?);
        `, [name, email, profileImage, password]);
    res.status(201).json({message: "user created"}
    );
})
app.post('/posts', async (req, res) => {
    const {imageUrl, title, content, userId} = req.body;
    await appDataSource.query(
        `INSERT INTO posts(image_url,
                           title,
                           content,
                           user_id)
         VALUES (?, ?, ?, ?);`, [imageUrl, title, content, userId]
    );
    return res.status(201).json({message: "post created"})
});
app.post('/likes', async (req, res) => {
    const {userId, postId} = req.body
    await appDataSource.query(
        `INSERT INTO likes(user_id, post_id)
         VALUES (?, ?);
        `, [userId, postId]);
    res.status(201).json({message: "like created"}
    );
})

app.put('/users/:userId', async (req, res) => {
    const {userId} = req.params
    const {name, email, profileImage, password} = req.body;
    await appDataSource.query(
        `UPDATE users
         SET name=?,
             email=?,
             profile_image=?,
             password=?
         WHERE id = ?`, [name, email, profileImage, password, userId]
    );
    res.status(201).json({message: "user updated"})
});
app.put('/users/:userId/post/:postId', async (req, res) => {
    const {userId, postId} = req.params;
    const {imageUrl, title, content} = req.body;
    await appDataSource.query(
        `UPDATE posts
         SET image_url=?,
             title=?,
             content=?
         WHERE user_id = ?
           AND id = ?`, [imageUrl, title, content, userId, postId]
    );
    return res.status(201).json({message: "post updated"})
});
app.put('/users/:userId/likes', async (req, res) => {
    const {userId} = req.params
    const {postId} = req.body;
    await appDataSource.query(
        `UPDATE likes
         SET post_id=?
         WHERE user_id = ?`, [postId, userId]
    );
    res.status(201).json({message: "like updated"})
});

app.delete('/users/:userId', async (req, res) => {
    const userId = Number(req.params.userId);
    await appDataSource.query(
        `DELETE
         FROM users
         WHERE id = ?`, [userId]
    );
    res.status(204).json({message: "user deleted"})
});
app.delete('/users/:userId/post/:postId', async (req, res) => {
    const postId = Number(req.params.postId);
    await appDataSource.query(
        `DELETE
         FROM posts
         WHERE id = ?`, [postId]
    );
    return res.status(204).json({message: "post deleted"})
});
app.delete('/users/:userId/likes', async (req, res) => {
    const {userId} = req.params;
    await appDataSource.query(
        `DELETE
         FROM likes
         WHERE user_id = ?`, [userId]
    );
    res.status(204).json({message: "like deleted"})
});


const PORT = process.env.PORT
const startServer = () => {
    try {
        app.listen(PORT, () => {
            console.log(`Server listening on PORT ${PORT}`)
        })
    } catch (err) {
        console.error(err);
    }
};

startServer();


