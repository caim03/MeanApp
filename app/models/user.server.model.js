var mongoose = require('mongoose');
var crypto = require('crypto');

var UserSchema = new mongoose.Schema({
    username: {type: String, unique: true},
    name: String,
    surname: String,
    mail: String,
    password: String,
    /* salt property is used to hash password */
    salt: {
		type: String
	},
	provider: {
		type: String,
		required: 'Provider is required'
	},
	providerId: String,
	providerData: {}
});

/* Execute this function before save method; it encrypts the password */
UserSchema.pre('save', function(next){
	if(this.password){
		this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
		this.password = this.hashPassword(this.password);
	}
	next();
});

/* Add an instance method 'hashPassword' to UserSchema, that encrypt password */
UserSchema.methods.hashPassword = function(password){
	return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
}

UserSchema.methods.authenticate = function(password){
	return this.password === this.hashPassword(password);
}

/* This method is used to find an aviable username for new users */
UserSchema.statics.findUniqueUsername = function(username, suffix, callback){
	var _this = this;
	var possibleUsername = username + (suffix || '');
	
	_this.findOne({
		username: possibleUsername
	}, function(err, user){
		if(!err){
			if(!user){
				callback(possibleUsername);
			} else {
				return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
			}
		} else{
			callback(null);
		}	
	});
}

mongoose.model('User', UserSchema);
