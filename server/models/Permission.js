const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const permissionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    default:'chua nhap '
  },
  manage:{
    type: Schema.Types.ObjectId,
    ref : "admin",
    
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Permission = mongoose.model('Permission', permissionSchema);

module.exports = Permission;