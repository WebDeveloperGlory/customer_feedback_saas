const { Router } = require('express');
const controller = require('../controllers/dashboardController');

const router = Router();

router.get( '/feedback', controller.getOwnerFeedbacks );
router.put( '/feedback/:feedbackId/status', controller.updateFeedbackStatus );
router.put( '/feedback/:feedbackId/priority', controller.updateFeedbackPriority );

module.exports = router;