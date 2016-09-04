var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');

module.exports = function(){
	passport.use(new LocalStrategy(function(username, password, done){
		
		/* Find the user with username */
		User.findOne({
			username: username
		}, function(err, user){
				if(err){
					return done(err);
				}
				
				/* If this user not exists */
				if(!user){
					return done(null, false, {
						message: 'Unknow user'
					});
				}
				
				/* If password was incorrect */
				if(!user.authenticate(password)){
					return done(null, false, {
						message: 'Invalid password'
					});
				}
				
				/* Return the user  */
				return done(null, user);
			});
	}));
}
