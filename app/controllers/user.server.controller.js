/* */

/* Import user schema  */
var User = require('../models/user.server.model');

exports.getAll = function(req, res){
    /* Retrieve all users from database  */
    User.find(function(err, users){
        if(err){
	    res.send(err);
		}
		else{
			res.json(users);
		}
    });
}

exports.addUser = function(req, res){
	/* Add a user to database, create a new user and pass it a json, retrieve from client */
	var user = new User(req.body);
	user.save(function(err){
		if(err){
			res.send(err);
		}
		else{
			res.json(user);
		}
	});
}

/* Use read function to send single user, but read is performed by getUserById */
exports.read = function(req, res){
	res.json(req.user);
}

/* Use getUserById in app.param to pass id as a parameter */
exports.getUserById = function(req, res, next, id){
	/* Retrieve a single user using him id */
	User.findOne({_id: id}, function(err, user){
		if(err){
			res.send(err);
		}
		else{
			req.user = user; // Create user property in request object
			next(); // Call read function as a next middleware
		}
	});
}

exports.deleteUser = function(req, res){
	/* Use app.param('userId', getUserById) to retrive and delete an user
	 * It calls getUserById and obtains the right user; after it completes the delete request
	 * and sends the user in request object (req.user is our user) */
	req.user.remove(function(err){
		if(err){
			res.send(err);
		}
		else {
			res.json(req.user);
		}
	});
}

exports.updateUser = function(req, res){
	/* req.user.id is the id of user that we update 
	 * req.body contain the json with new information */
	User.findByIdAndUpdate(req.user.id, req.body, function(err, user){
		if(err){
			res.send(err);
		}
		else{
			res.json(user);
		}
	});
}

