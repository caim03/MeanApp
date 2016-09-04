var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    username: {type: String, unique: true},
    name: String,
    surname: String,
    mail: String,
    password: String
});

mongoose.model('User', UserSchema);