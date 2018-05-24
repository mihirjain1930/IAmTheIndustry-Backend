let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let genreSchema = new mongoose.Schema({
    name: { type: String },
    created_date: { type: Date, default: Date.now },
    modified_date: { type: Date },
    is_deleted: { type: Boolean, default: false },
    is_active: { type: Boolean, default: true }

});
let genreObj = mongoose.model('generes', genreSchema);
module.exports = genreObj;