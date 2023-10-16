const express = require('express');
const User = require('../models/user');
const router = express.Router();

router.get('/signin', (req, res) => {
    console.log('Inside get /signin');
    return res.render('signin');
});

router.get('/signup', (req, res) => {
    console.log('Inside get /signup');
    return res.render('signup');
});

router.post('/signup', async (req, res) => {
    try {
        console.log('Inside post /signup');
        const { fullName, email, password } = req.body;
        await User.create({ fullName, email, password });
        return res.redirect('/');
    } catch (error) {
        console.log('Internal Server Error: ', error);
        return res.redirect('/');
    }

});

router.post('/signin', async (req, res) => {
    try {
        console.log('Inside post /signin');
        const { email, password } = req.body;
        const token = await User.matchPasswordAndGenerateToken(email, password);
        console.log('token: ', token);
        return res.cookie('token', token).redirect('/');
    } catch (error) {
        console.log("Invalid credentials : ", error);
        return res.render('signin', {
            error: 'Incorrect Email or Password!'
        });
    }

});


router.get('/logout', (req, res) => {
    res.clearCookie('token').redirect('/');
})



module.exports = router;