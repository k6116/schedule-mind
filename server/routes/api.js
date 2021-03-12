const express = require('express');
const router = express.Router();

var controllers = require('../controllers/index.js');

// User Controller
router.get('/indexUserList', controllers.user.indexUserList);
router.get('/runPython', controllers.user.runPython);
router.post('/runPythonScheduler', controllers.user.runPythonScheduler);

module.exports = router;

