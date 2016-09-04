var express = require('express');
var mongoose = require('mongoose');
var morgan = require('morgan');
var compression = require('compression');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var session = require('express-session');

var config = require('./config/config')

var app = express();

var port = process.env.PORT || 3000;

mongoose.connect(config.dbUrl);

app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(express.static(__dirname + '/public'));
app.use(session({
    saveUninitialized: true,
    resave: true,
    secret: config.sessionSecret
}));

app.set('views', __dirname + '/app/views');
app.set('view engine', 'ejs');

/* ROUTES */
require('./app/routes/index.server.routes.js')(app);
require('./app/routes/post.server.routes.js')(app);

app.listen(port);

console.log('Server is running at Localhost:' + port);

module.exports = app;