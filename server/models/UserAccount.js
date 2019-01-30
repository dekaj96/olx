const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongose = require('passport-local-mongoose');

const UserAccountSchema = new Schema({
    username: {type: String, unique: true, required: true},
    name: {type: String, required: true},
    surname: {type: String, required: true},
    email: {type: String, unique: true, lowercase: true, trim: true, required: true},
    phone_number: {type: Number, validate: {
            validator: function(v) {
                const ar = v.toString().split("");
                return ar.length === 9 ? true : false;
            },
            message: props => `${props.value} is not a valid phone number!`
        },
    },
    birth: {type: Date, required: true, validate: {
            validator: function(date) {
                const givenDate = new Date(date);
                const currDate = new Date();
                return givenDate.getFullYear() < currDate.getFullYear() - 18 ? true : false;
            },
            message: () => `Sorry, you are too young`
        },
    },
    website_link: {type: String, lowercase: true, trim: true}
});

UserAccountSchema.plugin(passportLocalMongose, { usernameField: 'username' });

module.exports = mongoose.model('UserAccount', UserAccountSchema);