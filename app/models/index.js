const mongoose = require('mongoose');
const URI = process.env.DB_URI || 'mongodb://127.0.0.1:27017/customer_feedback';

mongoose.Promise = Promise;

mongoose.connect( URI )
    .then( ( res ) => console.log('Connected to customer feedback db') )
    .catch( ( err ) => console.log( err ) );

module.exports.User = require('./User');
module.exports.Feedback = require('./Feedback');