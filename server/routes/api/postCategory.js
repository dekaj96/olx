const express = require('express');
const router = express.Router();
const PostCategories = require('../../controllers/postCategories');

router.get('/', PostCategories.category_get_all);
router.post('/', PostCategories.category_create);

module.exports = router;