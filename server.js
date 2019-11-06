// A2Z F16
// Daniel Shiffman
// http://shiffman.net/a2z
// https://github.com/shiffman/A2Z-F16

// http://www2.imm.dtu.dk/pubdb/views/publication_details.php?id=6010
// https://www.npmjs.com/package/sentiment

// Using express: http://expressjs.com/
var express = require('express');
// Create the app
var app = express();

// File System for loading the list of words
var fs = require('fs');

// Cors for allowing "cross origin resources"
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS
var cors = require('cors');
app.use(cors());

// This is for hosting files
app.use(express.static('public'));

// Our "database" (in addition to what is in the AFINN-111 list)
// is "additional.json", check first to see if it exists
var users;
var users1;
var exists = fs.existsSync('users.json');
if (exists) {
  // Read the file
  console.log('loading users');
  var txt = fs.readFileSync('users.json', 'utf8');
  // Parse it  back to object
  users = JSON.parse(txt);
  users1=JSON.parse(txt);
} else {
  // Otherwise start with blank list
  console.log('No users present in the DB');
  users = {};
  users1={};
}

// Set up the server
// process.env.PORT is related to deploying on heroku
var server = app.listen(process.env.PORT || 3000, listen);

// This call back just tells us that the server has started
function listen() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://' + host + ':' + port);
}

// A route for adding a new patient
app.get('/add/:uname/:age/:dname/:time', addUser);

// Handle that route
function addUser(req, res) {
  var uname = req.params.uname;
  // Make sure it's not a string by accident
  var age = Number(req.params.age);
  var dname= req.params.dname;
  var time=req.params.time;
  // Put it in the object

  users1.push({
    Name:uname,
     Age:age,
     Doctor:dname,
     Time:time

   })
  // Let the request know it's all set
  var reply = {
    status: 'success',
    uname: uname,
    age: age,
    doctor:dname,
    time:time

  }
  console.log('adding: ' + JSON.stringify(reply));

  // Write a file each time we get a new word
  // This is kind of silly but it works
  //console.log(users1);
  var json = JSON.stringify(users1);
  fs.writeFile('users.json', json, 'utf8', finished);
  function finished(err) {
    console.log('Finished writing users.json');
    // Don't send anything back until everything is done
    res.send(reply);
  }
}

// Route for sending all the concordance data
app.get('/all', showAll);

// Callback
function showAll(req, res) {
  // Send the entire dataset
  // express automatically renders objects as JSON
  res.send(users1);
}
