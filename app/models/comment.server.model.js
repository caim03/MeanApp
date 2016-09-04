var mongoose = require('mongoose');

var CommentSchema = new mongoose.Schema({
    body: String,
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

mongoose.model('Comment', CommentSchema);
