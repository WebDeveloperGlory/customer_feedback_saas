const db = require('../models');
const bcrypt = require('bcrypt');

exports.createUser = async ( req, res ) => {
    const { name, email, password } = req.body;

    try {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash( password, salt );

        const createdUser = await db.User.create({ name, email, password: hashedPassword, subscriptionStatus: 'inactive' });

        return res.status( 201 ).json({
            message: 'Request Successful - Owner Registered',
            ownerId: createdUser._id
        })
    } catch ( err ) {
        return res.status( 400 ).json({
            message: 'Internal Server Error',
            err
        })
    }
}

exports.loginUser = async ( req, res ) => {
    const { email, password } = req.body;

    try {
        const foundUser = await db.User.findOne({ email });
        if( !foundUser ) return res.status( 401 ).json({ message: 'Authentication Failed - User Not Found' });

        const isPasswordMatch = await foundUser.comparePassword( password );
        if( !isPasswordMatch ) return res.status( 401 ).json({ message: 'Authentication Failed - Incorrect Password' });

        return res.status( 200 ).json({
            message: 'Request Successful - Owner Logged In',
            ownerId: foundUser._id
        })
    } catch ( err ) {
        return res.status( 400 ).json({
            message: 'Internal Server Error',
            err
        })
    }
}

exports.generateAccessToken = async ( req, res ) => {
    
}

exports.getAccessToken = async ( req, res ) => {
    const { ownerId, password } = req.body;

    try {
        const foundUser = await db.User.findById( ownerId );
        if( !foundUser ) return res.status( 401 ).json({ message: 'Authentication Failed - User Not Found' });

        const isPasswordMatch = await foundUser.comparePassword( password );
        if( !isPasswordMatch ) return res.status( 401 ).json({ message: 'Authentication Failed - Incorrect Password' });

        if( foundUser.subscriptionStatus === 'inactive' ) return res.status( 403 ).json({ message: 'Request Failed - Purchase or Renew Subsciption To Access' });

        return res.status( 200 ).json({
            message: 'Request Successful - Access Key Retrived',
            ownerId: foundUser._id,
            accessKey: foundUser.accessKey

        })
    } catch ( err ) {
        return res.status( 500 ).json({
            message: 'Internal Server Error',
            err
        });
    }
}

module.exports = exports;