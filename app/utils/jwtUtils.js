const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const secretKey = process.env.SECRET_KEY;

function generateToken( user ) {
    const { _id, email } = user;
    const maxAge = 24 * 60 * 60;

    return jwt.sign({
        ownerId: _id,
        email
    }, secretKey, { 
        expiresIn: maxAge 
    });
}

function verifyToken( token ) {
    return jwt.verify( token, secretKey );
}

module.exports = { generateToken, verifyToken };