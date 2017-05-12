var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.set('port', (process.env.PORT || 5000));

app.use('/',express.static(__dirname + '/static'))

app.all('/receive_sms/', function(request, response) {
    // Sender's phone number
    var from_number = request.body.From || request.query.From;
    // Receiver's phone number - Plivo number
    var to_number = request.body.To || request.query.To;
    // The text which was received
    var text = request.body.Text || request.query.Text;
    console.log('Message received - From: ', from_number, ', To: ', to_number, ', Text: ', text);
    response.send("Message received");
});

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});