const express = require('express');
const path = require('path');
const userRoute = require('./routes/user');
const blogRoute = require('./routes/blog');
const { logReqRes } = require('./middlewares');
const { connectToMongo } = require('./mongoconnect');
const cookieParser = require('cookie-parser');
const { checkAuthCookie } = require('./middlewares/authentication');
const Blog = require('./models/blog');

const app = express();

// Mongo DB connection
const MONGO_DB_URL = 'mongodb://127.0.0.1:27017/storyline-blog';
connectToMongo(MONGO_DB_URL)
    .then(() => console.log('Connected to Mongo DB'))
    .catch((error) => console.log('Some error occurred while making connection to Mongo DB.', error));

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(checkAuthCookie('token'));
app.use(express.static('public'));

// EJS Engine
app.set('view engine', 'ejs');

//Set views folder
app.set('views', path.resolve('./views'));

//Logging
app.use(logReqRes('log.txt'));

//Routes
app.get('/', async (req, res) => {
    const allBlogs = await Blog.find().sort('createdAt');
    res.render('home', {
        user: req.user,
        blogs: allBlogs
    });
});

app.use('/user', userRoute);
app.use('/blog', blogRoute);

// Starting Server
const SERVER_PORT = 8000;
app.listen(SERVER_PORT, () => console.log('SERVER started on PORT : ', SERVER_PORT));