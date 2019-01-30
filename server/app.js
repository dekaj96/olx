const dotenv = require('dotenv');
dotenv.config({ path: '.env' });

const passport = require('./config/passport');

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

const cors = require('cors');
app.use(cors());
app.use(bodyParser.json());

const mongoURI = 'mongodb://s15218:s15218@ds247171.mlab.com:47171/tinproject';
mongoose.connect(mongoURI, { useNewUrlParser: true })
    .then(() => console.log('DATABASE CONNECTION SUCCEED'))
    .catch(err => console.log('DATABASE ERROR: ' + err));

passport();

const authRoutes = require('./routes/api/auth');
const postsRoutes = require('./routes/api/posts');
const postCategoriesRoutes = require('./routes/api/postCategory');
const usersRoutes = require('./routes/api/users');

app.use('/api/auth', authRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api/post-category', postCategoriesRoutes);
app.use('/api/user', usersRoutes);

app.use((req,res,next) =>{
    const error = new Error('Not found');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) =>{
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

app.listen(4000, () => console.log(`Server listening on port 4000`));