var mongoose = require('mongoose');
var Post = mongoose.model('Post');
var Comment = mongoose.model('Comment');
var User = mongoose.model('User');

/* Create a new user */
exports.create = function(req, res, next){
    
    /* PROVA SESSIONE */
    req.session.user = new User({
		username : 'Caim03',
		name : 'Christian',
		surname : 'La Riccia',
		mail : 'christian.lariccia@gmail.com',
		password : 'asroma93'
	});
	
    var post = new Post(req.body);
    if(req.session.user){
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
	else{
		res.json("Session not found");
	}
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
    Post.findByIdAndUpdate(req.post.id, req.body, function(err, post){
        if(err){
            return next(err);
        }
        else{
            res.json(post);
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
        req.post.save(function(err, post){
            if(err){
                return next(err);
            }
            
            res.json(comment);
        });
    });
}
