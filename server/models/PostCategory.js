const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostCategorySchema = new Schema({
    name: String,
    posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }]
});

module.exports = mongoose.model('PostCategory', PostCategorySchema);