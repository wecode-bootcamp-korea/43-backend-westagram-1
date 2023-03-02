require("dotenv").config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const {DataSource} = require('typeorm');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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
        console.error("Error during Data Source initialization:", err)
    })

const authenticationAndAuthorization = express();

authenticationAndAuthorization.use(express.json());
authenticationAndAuthorization.use(cors());
authenticationAndAuthorization.use(morgan('combined'));
authenticationAndAuthorization.use(routes);


authenticationAndAuthorization.get("/ping", (req, res) => {
    res.json({message: "pong"});
});

authenticationAndAuthorization.get('/users/:userId/likes', async (req, res) => {
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

authenticationAndAuthorization.post('/users/app', async (req, res) => {
    const {name, email, profileImage} = req.body
    const password = req.body.password
    const saltRounds = 12;
    const makeHash = async (password, saltRounds) => {
        return await bcrypt.hash(password, saltRounds);
    };
    const makeHashedPW = async () => {
        const hashedPW = await makeHash(password, saltRounds);
        console.log(hashedPW)
        await appDataSource.query(
            `INSERT INTO users(name,
                               email,
                               profile_image,
                               password)
             VALUES (?, ?, ?, ?);
            `, [name, email, profileImage, hashedPW]);
    }
    makeHashedPW();
    res.status(201).json({message: "user created"}
    );
})
authenticationAndAuthorization.post('/users/:userId/login', async (req, res) => {
    const {userId} = req.params
    const password = String(req.body.password)
    const [databasePassword] = await appDataSource.query(`
        SELECT password
        FROM users
        WHERE id = ?`, [userId])
    const savedPassword = databasePassword.password
    const checkHash = async (password, hashedPassword) => {
        return await bcrypt.compare(password, hashedPassword)
    }
    const makeHash = async (password, saltRounds) => {
        return await bcrypt.hash(password, saltRounds)
    }
    const isPassword = async () => {
        const hashedPassword = await makeHash(password, 12);
        const result = await checkHash(savedPassword, hashedPassword);
        if (result === true) {
            return res.status(200).json({message: "LoggedIn"})
        } else {
            return res.status(500).json({message: "Cannot Log In"})
        }
    }
    isPassword();
});
const payLoad = {foo: 'bar'};
const secretKey = 'mySecretKey';
const jwtToken = jwt.sign(payLoad, secretKey);
console.log(jwtToken)
authenticationAndAuthorization.post('/posts/loggedIn', async (req, res) => {
    const {payLoad, secretKey, imageUrl, title, content, userId} = req.body;
    const jwtToken = jwt.sign(payLoad, secretKey)
    const decoded = jwt.verify(jwtToken, secretKey);
    if (decoded.hasOwnProperty('foo')) {
        await appDataSource.query(
            `INSERT INTO posts(image_url,
                               title,
                               content,
                               user_id)
             VALUES (?, ?, ?, ?);`, [imageUrl, title, content, userId]
        );
        return res.status(201).json({message: "post created"})
    } else {
        return res.status(500).json({message: "Invalid Access Token"})
    }
})


const PORT = process.env.PORT
const startServer = () => {
    try {
        authenticationAndAuthorization.listen(PORT, () => {
            console.log(`Server listening on PORT ${PORT}`)
        })
    } catch (err) {
        console.error(err);
    }
};

startServer();


