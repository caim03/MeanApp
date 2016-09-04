var mongoose = require('mongoose');

var PostSchema = new mongoose.Schema({
    title: String,
    body: String,
    upvotes: {type: Number, default: 0},
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]
});

mongoose.model('Post', PostSchema);