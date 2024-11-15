const db = require('../models');

exports.submitFeedback = async ( req, res ) => {
    const { type, description } = req.body;
    const accessKey = req.headers['x-access-key'];

    try {
        if( !accessKey ) return res.status( 403 ).json({ message: 'Request Failed - Access Key Required' });

        const foundOwner = await db.User.findOne( accessKey );
        if( !foundOwner ) return res.status( 403 ).json({ message: 'Request Failed - Invalid Access Key'});

        const submittedFeedback = await db.Feedback.create({ ownerId: foundOwner._id, type, description });
        
        res.status( 201 ).json({
            message: 'Request Successful - Feedback Submitted',
            feedbackId: submittedFeedback._id
        })
    } catch ( err ) {
        console.error( 'Error submitting feedback: ', err )
        return res.status( 500 ).json({
            message: 'Internal Server Error',
        });
    }
}

module.exports = exports;