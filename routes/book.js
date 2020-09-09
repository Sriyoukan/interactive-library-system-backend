var express = require('express');
var router = express.Router();
var fs = require('fs')
// var bcrypt = require('bcrypt')
// var crypto = require('crypto');
var multer  = require('multer')
var storage = multer.diskStorage({destination:(req,file,cb)=>{cb(null,'./uploads')},filename:(req,file,cb)=>{cb(null,file.originalname)}})
var upload = multer({ storage:storage })
var Book = require('../model/book')
var bp = require('body-parser')
router.use(express.json())

router.post('/bookPdf',(req,res,next)=>{
    Book.findOne({title:req.body.title},(err,data)=>{
        if(err){
            return next(err)
        }else{
            var file = fs.readFileSync(`C:/Users/Sriyoucan/Documents/GitHub/interactive-library-system-backend/uploads/${data.documentName}`);
            filename = encodeURIComponent(data.documentName);
            res.setHeader('Content-disposition', 'inline; filename="' + filename + '"');
  
            res.contentType('application/pdf')
            res.send(file)
            
            
        }
    })
})



router.post('/allBook',(req,res,next)=>{
    Book.find({libraryId:req.body.id},(err,data)=>{
        if(err){
            return err
        }else{
            res.status(200).json(data)
        }
    })
})

router.post('/uploadfile', upload.single('file'), (req, res, next) => {
    const file = req.file
    if (!file) {
      const error = new Error('Please upload a file')
      error.httpStatusCode = 400
      return next(error)
    }
    res.send(file)
})

router.post('/book', function(req, res, next) {
    var book = new Book()
       
    book.title = req.body.title,
    book.author = req.body.author,
    book.libraryId = req.body.libraryId,
    book.bookId = req.body.bookId,
    book.numberOfCopiesAvailable = req.body.numberOfCopiesAvailable,
    book.totalCopies = req.body.totalCopies,
    book.documentName = req.body.documentName

    book.save((err)=>{
        if(err){
            return err
        }else{
            return res.send(book)
        }
    })   
})

router.post('/search',(req,res,next)=>{
    Book.find({title:{ "$regex": req.body.search, "$options": "i" }},(err,data)=>{
        if(err){
            return err
        }else{
            res.status(200).json(data)
        }
    })
})
router.post('/deleteBook',(req,res)=>{
    Book.deleteMany({libraryId:req.body.id},(err)=>{
        if(err){
            return err
        }else{
            res.status(200).json("success")
        }
    })
})

module.exports = router;
