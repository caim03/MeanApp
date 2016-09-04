var mongoose = require('mongoose');
var Post = mongoose.model('Post');
var Comment = mongoose.model('Comment');

/* Create a new user */
exports.create = function(req, res, next){
    var post = new Post(req.body);
    post.author = req.session.user;
    
    post.save(function(err){
        if(err){
            return next(err);
        }
        else{
            res.json(post);
        }
    });
}

/* Find all user */
exports.list = function(req, res, next){
    Post.find({}, function(err, posts){
        if(err){
            return next(err);
        }
        else{
            res.json(posts);    
        }
    });
}

/* Find an user by id */
exports.postById = function(req, res, next, id){
    Post.findOne({
        _id: id
    },function(err, post){
        if(err){
            return next(err);
        }
        else{
            req.post = post;
            next(); // Call read() middleware
        }
    });
}

/* Send the user found to the client */
exports.read = function(req, res){
    req.post.populate('comments', function(err, post){
        if(err){
            return next(err);
        }
        res.json(post);
    })
}

exports.delete = function(req, res, next){
    req.post.remove(function(err){
        if(err){
            return next(err);
        }
        else{
            res.json(req.post);
        }
    });
}

exports.update = function(req, res, next){
    req.post.update(function(err){
        if(err){
            return next(err);
        }
        else{
            res.json(req.post);
        }
    });
}

exports.upvote = function(req, res, next){
    req.post.upvotes += 1;
    req.post.update(function(err){
        if(err){
            return next(err);
        }
        else{
            res.json(req.post);
        }
    });
}

exports.addComment = function(req, res, next){
    var comment = new Comment(req.body);
    comment.post = req.post;
    comment.author = req.session.user;
    
    comment.save(function(err,comment){
        if(err){
            return next(err);
        }
        
        req.post.comments.push(comment);
        req.post.save((function(err, post){
            if(err){
                return next(err);
            }
            
            res.json(comment);
        });
    });
}