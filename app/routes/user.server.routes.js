/* Import the User schema  */
var userCtrl = require('../controllers/user.server.controller');

module.exports = function(app){
    app.get('/api/users', userCtrl.getAll);
}
