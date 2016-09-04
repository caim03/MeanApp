module.exports = function(app){
    var indexCtrl = require('../controllers/index.server.controller');
    
    app.get('/', indexCtrl.render);
}