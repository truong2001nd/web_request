const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Positions = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    room: {
      type: Schema.Types.ObjectId,
      ref: "Rooms",
      required: true,
    },
  },
  { timestamps: true }
);
Positions.index({ name: 1 }, { unique: true });
module.exports = mongoose.model("Positions", Positions);
