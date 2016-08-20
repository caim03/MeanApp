/* Require all modules */
var express = require('express');
var mongoose = require('mongoose');
var parser = require('body-parser');
var override = require('method-override');

/* Create application object  */
var app = express();

/* Retrieve db path from config file  */
var db = require('./config/db')

/* Set a listen port */
var port = process.env.PORT || 3000;

/* Connetct mongoose to db */
mongoose.connect(db.url);

/* Use json parser */
app.use(parser.json());
/* Use method-override with X-HTTP-Method-Override to simulate DELETE/PUT request  */
app.use(override('X-HTTP-Method-Override'));
/* Use express.static to serve static file */
app.use(express.static(__dirname + '/public'));


/* Set html as view engine to rendering pages */
app.set('views', __dirname + '/app/views');
app.set('view engine', 'ejs');


/* Routes */
require('./app/routes/index.server.routes')(app);
require('./app/routes/user.server.routes')(app);

/* Start server at port */
app.listen(port);

/* Log message */
console.log('Server running at http://localhost:' + port);

/* Expose app */
module.exports = app;
