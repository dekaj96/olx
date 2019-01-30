const Category = require('../models/PostCategory');
const Post = require('../models/Post');

exports.category_get_all = (req,res) => {
    Category.find()
    .sort({date: -1})
    .then(state => res.status(200).json(state))
    .catch(err => res.status(500).json({ error: err }));
}

exports.category_create = (req,res) => {
    const { name } = req.body;

    const newCategory = new Category({name});
    newCategory.save()
    .then(job => res.status(201).json(job))
    .catch(err => res.status(500).json({ error: err }));
}

exports.category_add_post = (req,res) => {
    const { idPost } = req.body;
    const idCategory = req.params.id;
    Category.update({ _id: idCategory }, {$push: {posts: idPost}})
    .then(() => res.status(200).json(({ message: 'Post added to category' })))
    .catch(err => res.status(500).json({ error: err }));
}