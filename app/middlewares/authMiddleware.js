const { verifyToken } = require('../utils')

function authenticateUser( req, res, next ) {
    try {
        const token = req.header('Authorization');
        if( !token ) return res.status( 401 ).json({ message: 'Unauthorized - Missing Token' });

        const decoded = verifyToken( token );
        req.user = decoded;
        next();
    } catch ( err ) {
        console.error('Error Validating User: ', err );
        return res.status(401).json({ message: 'Unauthorized - Invalid Token' });
    }
}

module.exports = { authenticateUser };