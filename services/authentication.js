var jwt = require('jsonwebtoken');
const SECRET_KEY = '@Neeraj#$harma%&';

const createTokenForUser = (user) => {
    const payload = {
        _id: user._id,
        email: user.email,
        profileImageURL: user.profileImageURL,
        role: user.role
    };

    const token = jwt.sign(payload, SECRET_KEY);
    return token;
};

const validateToken = (token) => {
    const payload = jwt.verify(token, SECRET_KEY);
    return payload;
};

module.exports = {createTokenForUser, validateToken};