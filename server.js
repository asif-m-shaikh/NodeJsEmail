var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
var port = process.env.PORT || 54312; // used to create, sign, and verify tokens
var email = require('./email')
app.use(cors())
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json({
    limit: 1024102420,
    type: 'application/json'
}));

app.use('/email', email)
app.listen(port);
console.log('Server running at http://localhost:' + port);