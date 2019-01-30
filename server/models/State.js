const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostStateSchema = new Schema({
    name: String
});

module.exports = mongoose.model('PostState', PostStateSchema);