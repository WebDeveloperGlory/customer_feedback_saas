const { Router } = require('express');
const controller = require('../controllers/authController');

const router = Router();

router.post( '/signup', controller.createUser );
router.post( '/login', controller.loginUser );
router.post( '/access-key', controller.getAccessToken );

module.exports = router;