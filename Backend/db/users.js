const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
    {
        name : {type : String , required : true},
        roll : {type : String , required : true},
        above_18 : {type : Boolean , required : true}
    },{collection : 'Users'}
)

module.exports = mongoose.model('Users' , userSchema); 