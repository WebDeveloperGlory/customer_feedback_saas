const { Schema, default: mongoose } = require('mongoose');

const feedbackSchema = new Schema({
    ownerId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: [ 'bug', 'feature', 'general' ]
    },
    description: {
        type: String,
        required: true
    },
    priority: {
        type: String,
        default: 'low',
        enum: [ 'low', 'medium', 'high' ]
    },
    status: {
        type: String,
        default: 'open',
        enum: [ 'open', 'in progress', 'resolved' ]
    }
})

module.exports = mongoose.model( 'Feedback', feedbackSchema );