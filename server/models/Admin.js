const mongoose = require('mongoose')
const Schema = mongoose.Schema


const AdminChema = new Schema({
    username:{
        type: String,//kiểu chữ
        required: true,//bắt buộc phải có
        unique: true,//không được trùng lặp
    },
    password:{
        type: String,//
        required: true,//
    },
    createdat:{
        type: Date,//ngafy
        default: Date.now

    }
    
})
module.exports = mongoose.model('admin',AdminChema);