const db = require('../models');

exports.getOwnerFeedbacks = async ( req, res ) => {
    const { ownerId } = req.user;

    try {
        const foundFeedbacks = await db.Feedback.find({ ownerId });
        if( !foundFeedbacks ) return res.status( 401 ).json({ message: 'Request Failed - None Found' });

        return res.status( 200 ).json({
            message: 'Request Successful - All Feedbacks Aquired',
            foundFeedbacks
        })
    } catch ( err ) {
        console.error( 'Error Getting Feedbacks: ', err );
        return res.status( 500 ).json({ message: 'Internal Server Error' });
    }
}

exports.updateFeedbackStatus = async ( req, res ) => {
    const { status } = req.body;
    const { feedbackId } = req.params;

    try {
        const updatedStatus = await db.Feedback.findOneAndUpdate({ _id: feedbackId }, { status }, { new: true });

        return res.status( 200 ).json({ message: 'Request Successful - Feedback Status Updated'})
    } catch ( err ) {
        console.error( 'Error Updating Feedback Status: ', err );
        return res.status( 500 ).json({ message: 'Internal Server Error' });
    }
}

exports.updateFeedbackPriority = async ( req, res ) => {
    const { priority } = req.body;
    const { feedbackId } = req.params;

    try {
        const updatedPriority = await db.Feedback.findOneAndUpdate({ _id: feedbackId }, { priority }, { new: true });

        return res.status( 200 ).json({ message: 'Request Successful - Feedback Priority Updated'})
    } catch ( err ) {
        console.error( 'Error Updating Feedback Status: ', err );
        return res.status( 500 ).json({ message: 'Internal Server Error' });
    }
}

module.exports = exports;