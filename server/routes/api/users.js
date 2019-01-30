const express = require('express');
const router = express.Router();
const userAccountController = require('../../controllers/userAccounts');

router.get('/', userAccountController.userAccounts_get_all);

router.get('/:id', userAccountController.userAccounts_get_byId);

router.delete('/:id', userAccountController.userAccounts_remove);

router.patch('/:id', userAccountController.userAccounts_update);

module.exports = router;