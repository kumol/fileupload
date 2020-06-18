var mongoose = require('mongoose');

var ImageSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    name:  {type: String , required: true},
    image_url: {type: String }
});

module.exports = mongoose.model('Image',ImageSchema);