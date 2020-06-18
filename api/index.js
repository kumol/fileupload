var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Image = require('./../model/image');
var multer  = require('multer')
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now()+file.originalname);
    }
  })
   
var upload = multer({ storage: storage })
//var upload = multer({ dest: 'uploads/' })

router.post('/upload', upload.single('file'), function (req, res, next) {
    console.log(req.file);
    console.log("got request");
    const image = new Image({
        _id : mongoose.Types.ObjectId(),
        name:req.file.originalname,
        image_url : req.file.path
    });
    console.log(image);
    //console.log(req.body);
    image.save().then((result)=>{
        res.status(200).json({
            result:result
        })
    }).catch((err)=>{
        res.status(500).json({
            error:err
        })
    });
})

router.get('/',(req,res,next)=>{

    res.send("hello world");
    // Order.find().select('product _id quantity').populate("product","name").exec().then((docs)=>{
    //     var response = {
    //         coutn: docs.length,
    //         order:docs.map((doc)=>{
    //             return{
    //                 product:doc.product,
    //                 quantity:doc.quantity,
    //                 _id:doc._id,
    //                 request:{
    //                     type:'GET',
    //                     url:"localhost:3000/order/"+ doc._id 
    //                 }
    //             }

    //         })
    //     }
    //     res.json(response);
    // }).catch((err)=>{
    //     res.status(500).json({
    //         error:err
    //     })
    // })
});

// router.get('/:orderId',(req,res,next)=>{
//     Order.findById(req.params.orderId).populate("product","name price").exec().then((order)=>{
//         if(!order){
//             res.status(404).json({
//                 message:"Order not found"
//             });
//         }
//         res.status(200).json({
//             order:order,
//             request:{
//                 type:"GET",
//                 url:"http://localhost:3000/order"
//             }
//         })
//     }
//     ).catch((err)=>{
//         res.status(500).json({
//             error:err
//         })
//     });
// });
// router.delete('/:orderId',(req,res,next)=>{
//     Order.remove({_id: req.params.orderId}).exec().then((doc)=>{
//         res.status(200).json({
//             message:"deleted successfully",
//             request:{
//                 type:"POST",
//                 url:"http://localhost:3000/order",
//                 body:{productId:"ID",quantity:'Number'}
//             }
//         })
//     }).catch((err)=>{
//         res.status(500).json({
//             error:err,
//         })
//     })
// });
module.exports = router;