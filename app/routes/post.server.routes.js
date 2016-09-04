module.exports = function(app){
    var postCtrl = require('../controllers/post.server.controller');
    
    app.get('/posts', postCtrl.list);
    app.post('/posts', postCtrl.create);
    
    app.get('/posts/:postId', postCtrl.read);
    app.put('/posts/:postId', postCtrl.update);
    app.post('/posts/:postId', postCtrl.addComment);
    app.delete('/posts/:postId', postCtrl.delete);
    
    app.param('postId', postCtrl.postById);
}
