const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    min_price: { type: Number, required: true, min: 0 },
    max_price: { type: Number, required: true, max: 100000 },
    city: { type: String, trim: true },
    photo: { type: String,  default:'https://www.tibs.org.tw/images/default.jpg'},
    user: { type: Schema.Types.ObjectId, ref: 'UserAccount' },
    categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }]
});

module.exports = mongoose.model('Post', PostSchema);

