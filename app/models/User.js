const { Schema, default: mongoose } = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    subscriptionStatus: {
        type: String,
        required: true,
        enum: [ 'active', 'inactive' ]
    },
    accessKey: {
        type: String,
        required: true
    }
})

userSchema.methods.comparePassword = async function( candidatePassword ) {
    return bcrypt.compare( candidatePassword, this.password );
};

module.exports = mongoose.model( 'User', userSchema );