const User = require('../models/UserAccount');
const jwt = require('jsonwebtoken');

exports.auth_login = (req,res) => {
    const usern = req.body.username;
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: 1500 });
    User.findOne({ username: usern })
    .then(data => res.json({ user: data, token: token }))
    .catch(err => res.status(500).send({ error: err, message: "Can not log in" }));
}

exports.auth_register = (req, res) => {
    const { username, password, name, surname, email, phone_number, birth } = req.body;
    var user = {};

    User.findOne({ username: username })
        .then(us => {
            if (!us) {
                user = new User({ username, name, surname, email, phone_number, birth });
                User.register(user, password)
                .then(us => res.status(201).json({ success: us.username + 'registering succeed' }))
                .catch(err => res.status(500).send({ error: err }));
            }
            else {
                res.status(409).json({ message: 'Username already exist in our system' });
            }
        });
}