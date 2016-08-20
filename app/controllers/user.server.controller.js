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
