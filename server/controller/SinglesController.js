const { request } = require("express");
const Singles = require("../models/Singles.js");
const SingleType = require("../models/SingleTypes.js");
const User = require("../models/Users.js");

const createSingle = async (req, res, next) => {
  if (!req.permissions.single.includes("create")) {
    return res
      .status(401)
      .json({ success: false, message: "Tài khoản không có quyền truy cập" });
  }
  const { name, content, singlesStyes, approver } = req.body;
  if (!name || !content || !singlesStyes || !approver) {
    return res
      .status(400)
      .json({ success: false, message: "Mời nhập đủ dữ liệu đầu vào" });
  }
  try {
    const singleRelease = await Singles.findOne({ name });

    if (singleRelease) {
      return res
        .status(401)
        .json({ success: false, message: " đơn đã tồn tại" });
    }
    const singlesStyesRelease = await SingleType.findOne({ _id: singlesStyes });

    if (!singlesStyesRelease) {
      return res
        .status(401)
        .json({ success: false, message: "Không tồn tại Loại đơn" });
    }
    const approverRelease = await User.findOne({ _id: approver });

    if (!approverRelease) {
      return res
        .status(401)
        .json({ success: false, message: "Mã người phê duyệt không tồn tại" });
    }

    const newSingles = new Singles({
      name,
      content: JSON.stringify(content),
      singlesStyes,
      sender: req.userId,
      approver,
      status: 0,
    });
    await newSingles.save();

    res.json({
      success: true,
      message: "Thành công",
      data: newSingles,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Dịch vụ tạm thời giám đoạn" });
  }
};

const getAllSingle = async (req, res) => {
  // check quyen

  if (!req.permissions.single.includes("read")) {
    return res
      .status(401)
      .json({ success: false, message: "Tài khoản không có quyền truy cập" });
  }

  // check quyen

  try {
    const singleAll = await Singles.find();

    if (!singleAll) {
      return res
        .status(401)
        .json({ success: false, message: "Chưa có đơn nào được tạo!" });
    }

    res.json({ success: true, data: singleAll });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Dịch vụ bị gián đoạn" });
  }
};
const destroySingle = async (req, res) => {
  // check quyen

  if (!req.permissions.single.includes("delete")) {
    return res
      .status(401)
      .json({ success: false, message: "Tài khoản không có quyền truy cập" });
  }

  // check quyen

  try {
    const deleteSing = await Singles.findOneAndDelete({
      _id: req.params.id,
    });
    if (!deleteSing) {
      return res
        .status(400)
        .json({ success: false, message: "Loại đơn này không tồn tại" });
    }
    res.json({
      success: true,
      message: "Đã xóa thành công",
      permission: deleteSing,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Dịch vụ bị gián đoạn" });
  }
};
const updateSingle = async (req, res) => {
  // check quyen

  if (!req.permissions.single.includes("update")) {
    return res
      .status(401)
      .json({ success: false, message: "Tài khoản không có quyền truy cập" });
  }

  // check quyen

  const { name, content } = req.body;
  if (!name) {
    return res
      .status(400)
      .json({ success: false, message: "Vui lòng nhập tên loại đơn" });
  }
  try {
    const singleId = await Singles.findOne({ _id: req.params.id });
    if (!singleId) {
      return res
        .status(400)
        .json({ success: false, message: "Mã loại đơn này sai" });
    }
    if (!(singleId.status === 0)) {
      return res.status(400).json({
        success: false,
        message: "Đơn đã được phê duyệt không được sửa",
      });
    }
    const existingSingleType = await SingleType.findOne({
      name,
      _id: { $ne: req.params.id },
    });
    if (existingSingleType) {
      return res
        .status(400)
        .json({ success: false, message: "Tên loại đơn đã tồn tại" });
    }
    let updateSingle = {
      name,
      content: JSON.stringify(content),
    };

    const newSingleId = await Singles.findOneAndUpdate(
      { _id: req.params.id },
      updateSingle,
      { new: true }
    );
    res.json({
      success: true,
      message: "Cập nhật thành công!",
      permission: newSingleId,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Dịch vụ bị gián đoạn" });
  }
};

module.exports = { createSingle, getAllSingle, destroySingle, updateSingle };
