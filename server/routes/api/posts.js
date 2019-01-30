const express = require('express');
const router = express.Router();
const postsController = require('../../controllers/posts');

router.get('/', postsController.posts_get_all);

router.get('/:id', postsController.posts_get_byId);

router.post('/', postsController.posts_create);

router.patch('/:id', postsController.posts_update);

router.delete('/:id', postsController.posts_remove);

module.exports = router;