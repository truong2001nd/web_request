const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Positions = new Schema(
  {
    name: {
      type: String, //kiểu chữ
      required: true, //bắt buộc phải có
      unique: true, //không được trùng lặp
    },
    room: {
      type: Schema.Types.ObjectId,
      ref: "Rooms",
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Positions", Positions);
