/* Import mongoose module */
var mongoose = require('mongoose');

/* Create and exports the User schema  */
module.exports = mongoose.model('User', {
    name: {type: String, default: ''}
});
