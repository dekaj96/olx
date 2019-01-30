const Post = require('../models/Post');
const Category = require('../models/PostCategory');

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
    .then(job => {
        if(job){
            res.status(200).json(job);
        }
        else{
            Post.find({ user: id })
            .then(job => res.status(200).json(job))
            .catch(err => res.status(500).json({ error: err }));
        }
    })
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
    const { title, description, min_price, max_price, city, photo, categories, user } = req.body;

    var toPost = {};
    if (photo === undefined || photo === null)
        toPost = new Post({ title, description, min_price, max_price, city, categories, user });
    else
        toPost = new Post({ title, description, min_price, max_price, city, photo, categories, user });
    toPost.save()
    .then(job => res.status(201).json(job))
    .catch(err => res.status(500).json({ error: err }));
}



exports.posts_remove = (req,res) => {
    const id = req.params.id;

    Post.findOne({ _id: id })
    .then(p => {
            for (var i = 0; i < p.categories.length; i++) {
                Category.update({ _id: p.categories[i] }, { $pull: {posts: p._id}} )
                .then(() => res.status(200).json(({ message: 'Post deleted from the category' })))
                .catch(err => res.status(500).json({ error: err }));
            }
        res.status(200).json(user);
    })
    .catch(err => res.status(500).json({ error: err}));

    Post.remove({ _id: id })
    .then(result => res.status(200).json({ message: 'Success '}))
    .catch(err => res.status(200).json({ error: err }));
}