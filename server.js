var express = require('express');
var app = express();
var port = process.env.PORT || 8000;
var morgan = require('morgan');

app.use(morgan('dev'));  // log all http requests
app.use(express.static(__dirname + '/public'));

app.get('*', function (req, res) {
    res.sendFile(__dirname + '/public/app/views/index.html');
});

app.listen(port, function () {
    console.log('Server running on port 8000');
});
