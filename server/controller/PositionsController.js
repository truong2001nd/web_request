const Position = require("../models/Positions.js");
const Room = require("../models/Rooms.js");

const createPositions = async (req, res) => {
  if (!req.permissions.position.includes("create")) {
    return res
      .status(400)
      .json({ success: false, message: "Bạn không có quyền tạo chức vụ" });
  }
  const { name, room } = req.body;
  if (!name) {
    return res.status(404).json({
      success: false,
      message: "Vui lòng cung cấp tên chức vụ !",
    });
  }
  try {
    let roomObject;
    if (room) {
      roomObject = await Room.findById(room);
      if (!roomObject) {
        return res.status(404).json({
          success: false,
          message: "Không tìm thấy phòng ban với mã đã cho!",
        });
      }
    }
    const existingPosition = await Position.findOne({
      name,
      room: roomObject._id,
    }).lean();
    if (existingPosition) {
      return res.status(409).json({
        success: false,
        message: "Chức vụ đã tồn tại trong phòng ban này!",
        existingPosition: existingPosition,
      });
    }

    const newPosition = new Position({
      name,
      room: room || "",
    });

    await newPosition.save();
    res.json({
      success: true,
      message: "Happy learning!",
      data: newPosition,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: error.message });
  }
};
const getAllPosition = async (req, res) => {
  if (!req.permissions.position.includes("read")) {
    return res
      .status(400)
      .json({ success: false, message: "Bạn không có quyền xem chức vụ" });
  }
  try {
    const positionAll = await Position.find();
    res.status(200).json({ success: true, data: positionAll });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Dịch vụ tạm thời giám đoạn" });
  }
};
const getOnePosition = async (req, res) => {
  if (!req.permissions.position.includes("read")) {
    return res
      .status(400)
      .json({ success: false, message: "Bạn không có quyền xem chức vụ" });
  }
  try {
    const positionCondition = await Position.findOne({ _id: req.params.id });
    if (!positionCondition) {
      return res
        .status(404)
        .json({ success: false, message: "Sai mã chức vụ" });
    }
    res.status(200).json({ success: true, data: positionCondition });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Dịch vụ tạm thời giám đoạn" });
  }
};
const updatePosition = async (req, res) => {
  if (!req.permissions.position.includes("update")) {
    return res
      .status(400)
      .json({ success: false, message: "Bạn không có quyền sửa chức vụ" });
  }
  const { name, room } = req.body;
  if (!name) {
    return res
      .status(400)
      .json({ success: false, message: "Vui lòng nhập tên chức vụ" });
  }

  try {
    const roomObject = await Room.findById(room).lean();
    if (!roomObject) {
      return res
        .status(404)
        .json({ success: false, message: "Sai mã phòng ban!" });
    }
    let updatePosition = { name, room: roomObject._id };

    const positionId = await Position.findOneAndUpdate(
      { _id: req.params.id },
      updatePosition,
      { new: true }
    );

    if (!positionId) {
      return res
        .status(400)
        .json({ success: false, message: "Mã chức vụ này sai!" });
    }
    res.json({
      success: true,
      message: "Cập nhật thành công!",
      data: updatePosition,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Dịch vụ tạm thời giám đoạn" });
  }
};
const deletePosition = async (req, res) => {
  if (!req.permissions.position.includes("delete")) {
    return res
      .status(400)
      .json({ success: false, message: "Bạn không có quyền xóa chức vụ" });
  }
  try {
    const deletePosition = await Position.findOneAndDelete({
      _id: req.params.id,
    });
    if (!deletePosition) {
      return res
        .status(400)
        .json({ success: false, message: "Sai mã Id chức vụ" });
    }
    res.status(200).json({
      success: true,
      message: "Đã xóa chức vụ thành công",
      data: deletePosition,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Dịch vụ tạm thời gián đoạn" });
  }
};

module.exports = {
  createPositions,
  getAllPosition,
  getOnePosition,
  updatePosition,
  updatePosition,
  deletePosition,
};
