const crypto = require('crypto');

function generateAccessKey() {
    const accessKey = crypto.randomBytes( 32 ).toString('hex');

    return accessKey;
}

module.exports = { generateAccessKey }