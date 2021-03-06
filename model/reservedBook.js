var mongoose = require('mongoose')
var Schema = mongoose.Schema

var reservedBookSchema = new Schema({
    title :{type:String},
    libraryId:String,
    borrower: String,
    onHand:Boolean,
    returnDate:Date,
    penalty:Number,
    overDue:Boolean
})

module.exports = mongoose.model('reservedBook',reservedBookSchema)