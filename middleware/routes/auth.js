const express = require('express');
const router = express.Router();

// import controlers
const { signup, signin} = require('../controllers/auth');

router.post('/signup', signup);
router.post('/signin', signin);

module.exports = router;