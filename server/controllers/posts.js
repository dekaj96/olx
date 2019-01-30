const Post = require('../models/Post');

exports.posts_get_all = (req, res) => {
    Post.find()
    .sort({date: -1})
    .then(resPost => {
        const response = {
            count: resPost.length,
            resPost
        }
        res.status(200).json(response);
    })
    .catch(err => res.status(500).json({ error: err }));
}

exports.posts_get_byId = (req,res,next) => {
    const id = req.params.id;
    Post.findById(id)
    .then(job => res.status(200).json(job))
    .catch(err => res.status(500).json({ error: err}));
}

exports.posts_update = (req, res, next) => {
    const updateObject = req.body;
    const id = req.params.id;
    Post.update({ _id: id }, {$set: updateObject})
    .then(result => res.status(200).json(({ message: 'post had been edited' })))
    .catch(err => res.status(500).json({ error: err }));
}

exports.posts_create = (req,res) => {
    const { title, description, price, photo } = req.body;

    var toPost = {};
    if (photo === undefined || photo === null)
        toPost = new User({ title, description, price });
    else
        toPost = new User({ title, description, price, photo });

    const newPost = new Post(toPost);
    newPost.save()
    .then(job => res.status(201).json(job))
    .catch(err => res.status(500).json({ error: err }));
}

exports.posts_remove = (req,res) => {
    const id = req.params.id;
    Post.remove({ _id: id })
    .then(result => res.status(200).json({ message: 'Success '}))
    .catch(err => res.status(200).json({ error: err }));
}