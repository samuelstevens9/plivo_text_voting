const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
exports.receive_sms = functions.https.onRequest((req, res) => {

  var from_number = req.body.From || req.query.From;
  // Receiver's phone number - Plivo number
  var to_number = req.body.To || req.query.To;
  // The text which was received
  var text = req.body.Text || req.query.Text;
  // Push it into the Realtime Database then send a response
  var sms = {from:from_number,to:to_number,text:text}
  console.log(sms);
  admin.database().ref('/messages').push(sms).then(snapshot => {
    // Redirect with 303 SEE OTHER to the URL of the pushed object in the Firebase console.
    //res.redirect(303, snapshot.ref);
    res.send("Message received");
  });
});