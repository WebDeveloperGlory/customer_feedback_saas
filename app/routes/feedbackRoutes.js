const { Router } = require('express');
const controller = require('../controllers/feedbackController');

const router = Router();

router.post( '/submit', controller.submitFeedback );

module.exports = router;