/* Import the User schema  */
var userCtrl = require('../controllers/user.server.controller');

module.exports = function(app){
    app.get('/users', userCtrl.getAll);
    app.post('/users', userCtrl.addUser);
    
    app.get('/users/:userId', userCtrl.read);
    app.delete('/users/:userId', userCtrl.deleteUser);
    app.put('/users/:userId', userCtrl.updateUser);
    
    /* Pass the user id to getUserById function 
     * This route for param is used everytime we use a url like /users/:userId 
     * It is used in findOne, remove, update methods */
    app.param('userId', userCtrl.getUserById);
}
