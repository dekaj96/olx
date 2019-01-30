const User = require('../models/UserAccount');

exports.userAccounts_get_all = (req,res) => {
    User.find()
    .sort({date: -1})
    .then(user => res.status(200).json(user))
    .catch(err => res.status(500).json({ error: err }));
}

exports.userAccounts_get_byId = (req,res,next) => {
    const id = req.params.id;
    User.findById(id)
    .then(user => res.status(200).json(user))
    .catch(err => res.status(500).json({ error: err}));
}

exports.userAccounts_update = (req, res, next) => {
    const updateObject = req.body;
    const id = req.params.id;
    User.update({ _id: id }, {$set: updateObject})
    .then(() => res.status(200).json(({ message: 'User details has been updated' })))
    .catch(err => res.status(500).json({ error: err }));
}

exports.userAccounts_remove = (req,res) => {
    const id = req.params.id;
    User.remove({ _id: id })
    .then( () => res.status(200).json({ message: 'Success '}))
    .catch(err => res.status(200).json({ error: err }));
}