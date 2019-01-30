const express = require('express');
const router = express.Router();
const StateController = require('../../controllers/states');

router.get('/', StateController.state_get_all);

module.exports = router;