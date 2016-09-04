var mongoose = require('mongoose');
var User = mongoose.model('User');

/* Create a new user */
exports.create = function(req, res, next){
    var user = new User(req.body);
    
    user.save(function(err){
        if(err){
            return next(err);
        }
        else{
            res.json(user);
        }
    });
}

/* Find all user */
exports.list = function(req, res, next){
    User.find({}, function(err, users){
        if(err){
            return next(err);
        }
        else{
            res.json(users);
        }
    });
}

/* Find an user by id */
exports.userById = function(req, res, next, id){
    User.findOne({
        _id: id
    },function(err, user){
        if(err){
            return next(err);
        }
        else{
            req.user = user;
            next(); // Call read() middleware
        }
    });
}

/* Send the user found to the client */
exports.read = function(req, res){
    res.json(req.user);
}

exports.delete = function(req, res, next){
    req.user.remove(function(err){
        if(err){
            return next(err);
        }
        else{
            res.json(req.user);
        }
    });
}

exports.update = function(req, res, next){
    req.user.update(function(err){
        if(err){
            return next(err);
        }
        else{
            res.json(req.user);
        }
    });
}