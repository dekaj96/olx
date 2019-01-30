const State = require('../models/State');

exports.state_get_all = (req,res) => {
    State.find()
    .sort({date: -1})
    .then(state => res.status(200).json(state))
    .catch(err => res.status(500).json({ error: err }));
}