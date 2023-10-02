const mongoose = require('mongoose')
const Schema = mongoose.Schema


const accountChema = new Schema({
    username:{
        type: String,//kiểu chữ
        required: true,//bắt buộc phải có
        unique: true,//không được trùng lặp
    },
    password:{
        type: String,//
        required: true,//
    },
    permission:{
        type: Schema.Types.ObjectId,
        ref : "Permission",
    },
    manage:{
        type: Schema.Types.ObjectId,
        ref : "admin",
        
    },
    createdat:{
        type: Date,//ngafy
        default: Date.now

    }
    
})
module.exports = mongoose.model('account',accountChema);