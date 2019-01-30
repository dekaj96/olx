const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0, max: 100000 },
    photo: { type: String,  default:'https://www.tibs.org.tw/images/default.jpg'}
});

module.exports = mongoose.model('Post', PostSchema);