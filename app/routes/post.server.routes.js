module.exports = function(app){
    var postCtrl = require('../controllers/post.server.controller');
    
    app.get('/posts', postCtrl.list);
    app.post('/posts', postCtrl.create);
    
    app.get('/posts/:postId', postCtrl.read);
    app.post('/posts/:postId/comments', postCtrl.addComment);
    
    app.param('postId', postCtrl.postById);
}