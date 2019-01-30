const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongose = require('passport-local-mongoose');

phoneValidate = (number) => /d{9}/.test(number);

dateValidate = (date) => {
    let d = new Date(date);
    return d.getFullYear > Date.now.getFullYear - 18 ? true : false;
}

const UserAccountSchema = new Schema({
    username: {type: String, unique: true, required: true},
    name: {type: String, required: true},
    surname: {type: String, required: true},
    email: {type: String, unique: true, lowercase: true, trim: true, required: true},
    phone_number: {type: Number, validate: [phoneValidate, '{VALUE} have to be 9 digit number!'] },
    birth: {type: Date, required: true, validate: [dateValidate, 'Sorry, you are too young'] },
});

UserAccountSchema.plugin(passportLocalMongose, { usernameField: 'username' });

module.exports = mongoose.model('UserAccount', UserAccountSchema);