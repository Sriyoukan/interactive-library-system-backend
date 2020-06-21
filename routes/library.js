var express = require('express');
var router = express.Router();
var Library = require('../model/library');
router.use(express.json());

router.get('/allLibrary',(req,res,next)=>{
    Library.find((err,data)=>{
        if(err){
            return err
        }else{
            res.status(200).json(data)
        }
    })
})

router.post('/myLibrary',(req,res,next)=>{
    Library.findOne({id:req.body.id},(err,data)=>{
        if(err){
            return err
        }else{
            res.json(data)
        }
    })
})

router.post('/library',(req,res,next)=>{
    var library = new Library();
    library.name = req.body.name;
    library.place = req.body.place;
    library.id = req.body.id;

    library.save((err)=>{
        if(err){
            return err
        }else{
            res.send(library)
        }
    })
})

module.exports = router;
