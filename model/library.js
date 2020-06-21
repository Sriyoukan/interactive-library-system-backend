var mongoose = require('mongoose')
var Schema = mongoose.Schema

var librarySchema = new Schema({
    name :String,
    place: String,
    id:String
    
    
})


module.exports = mongoose.model('library',librarySchema)