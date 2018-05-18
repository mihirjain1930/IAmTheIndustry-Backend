/*
 * Database connectivity
 */
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/iamtheindustry');
// mongoose.connect('mongodb://rentalApp:rentalApp2780@localhost:27017/rentalApp');


//check if we are connected successfully or not
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));

module.exports = db;
