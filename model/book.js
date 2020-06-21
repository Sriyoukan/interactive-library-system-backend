var mongoose = require('mongoose')
var Schema = mongoose.Schema

var bookSchema = new Schema({
    title :{type:String,unique:true},
    author: String,
    libraryId:String,
    bookId:String,
    numberOfCopiesAvailable:Number,
    totalCopies:Number
})

bookSchema.methods.reduceCopies = function(){
    this.numberOfCopiesAvailable = numberOfCopiesAvailable - 1
}

module.exports = mongoose.model('book',bookSchema)