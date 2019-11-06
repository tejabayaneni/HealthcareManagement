const DataStore = require('nedb');
const db = new DataStore({filename: __dirname + '/UsersDB', autoload: true});

const users = require('./users.json');
// We let NeDB create _id property for us.


db.insert(users, function(err, newDocs) {
	if(err) {
		console.log("Something went wrong when writing");
		console.log(err);
	} else {
		console.log("Added " + users.length + " Users");
	}
});
