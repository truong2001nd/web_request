const Room = require("../models/Rooms.js");

const createRoom = async (req, res, next) => {
  if (!req.permissions.room.includes("create")) {
    return res
      .status(400)
      .json({ success: false, message: "Bạn không có quyền tạo phòng ban" });
  }
  const { name, description } = req.body;
  if (!name) {
    return res
      .status(400)
      .json({ success: false, message: "Vui lòng nhập tên phòng ban" });
  }
  try {
    const roomReleaser = await Room.findOne({ name: name });
    if (roomReleaser) {
      return res
        .status(401)
        .json({ success: false, message: "Tên phòng ban đã tồn tại" });
    }
    const newRoom = new Room({
      name,
      description: description || "",
    });
    await newRoom.save();
    res.json({
      success: true,
      message: "Thành công ",
      data: newRoom,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Dịch vụ tạm thời giám đoạn" });
  }
};

const getOneRoom = async (req, res) => {
  if (!req.permissions.room.includes("read")) {
    return res
      .status(400)
      .json({ success: false, message: "Bạn không có quyền xem phòng ban" });
  }
  try {
    const roomCondition = await Room.findOne({ _id: req.params.id });
    if (!roomCondition) {
      return res
        .status(401)
        .json({ success: false, message: "Phòng ban đã tồn tại" });
    }
    const RoomOne = await Room.findOne(roomCondition);
    res.json({
      success: true,
      message: "Happy learning!",
      data: RoomOne,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Dịch vụ tạm thời giám đoạn" });
  }
};

const getAllRoom = async (req, res) => {
  if (!req.permissions.room.includes("read")) {
    return res
      .status(400)
      .json({ success: false, message: "Bạn không có quyền xem phòng ban" });
  }
  try {
    const roomAll = await Room.find();
    res.json({
      success: true,
      message: "Happy learning!",
      data: roomAll,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Dịch vụ tạm thời giám đoạn" });
  }
};

const updateRoom = async (req, res, next) => {
  if (!req.permissions.room.includes("update")) {
    return res
      .status(400)
      .json({ success: false, message: "Bạn không có quyền xem phòng ban" });
  }
  const { name, description } = req.body;
  if (!name) {
    return res
      .status(404)
      .json({ success: false, message: "Vui lòng nhập tên phòng ban" });
  }
  try {
    // Kiểm tra tên phòng đã tồn tại hay chưa
    const existingRoom = await Room.findOne({
      name,
      _id: { $ne: req.params.id },
    });
    if (existingRoom) {
      return res
        .status(400)
        .json({ success: false, message: "Tên phòng đã tồn tại" });
    }
    let updateRoom = {
      name,
      description: description || "",
    };
    const roomCondition = await Room.findOne({ _id: req.params.id });
    if (!roomCondition) {
      return res
        .status(400)
        .json({ success: false, message: "Mã id phòng không đúng" });
    }
    updateRoom = await Room.findOneAndUpdate(roomCondition, updateRoom, {
      new: true,
    });
    res.json({
      success: true,
      message: "Cập nhật thành công!",
      data: updateRoom,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Dịch vụ tạm thời giám đoạn" });
  }
};
const deleteRoom = async (req, res) => {
  if (!req.permissions.room.includes("delete")) {
    return res
      .status(400)
      .json({ success: false, message: "Bạn không có quyền xóa phòng ban" });
  }
  try {
    const deleteRoom = await Room.findOneAndDelete({ _id: req.params.id });
    if (!deleteRoom) {
      return res
        .status(400)
        .json({ success: false, message: "Mã id phòng không đúng" });
    }
    res.json({ success: true, message: "Đã xóa thành công", data: deleteRoom });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Dịch vụ tạm thời giám đoạn" });
  }
};
module.exports = { createRoom, getOneRoom, getAllRoom, updateRoom, deleteRoom };
