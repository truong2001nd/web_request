const Permissions = require("../models/Permissions");

// them moi quyen
const createPermission = async (req, res, next) => {
  const {
    name,
    permission,
    positission,
    room,
    single,
    singleType,
    user,
    status,
  } = req.body;
  if (!name) {
    return res
      .status(400)
      .json({ success: false, message: "Vui lòng nhập tên quyền" });
  }

  if (
    !Array.isArray(permission) &&
    !Array.isArray(positission) &&
    !Array.isArray(room) &&
    !Array.isArray(single) &&
    !Array.isArray(singleType) &&
    !Array.isArray(user)
  ) {
    return res
      .status(400)
      .json({ success: false, message: "Sai dữ liệu đầu vào" });
  }

  try {
    const permissionRelease = await Permissions.findOne({ name });

    if (permissionRelease) {
      return res
        .status(401)
        .json({ success: false, message: "Tên quyền đã tồn tại" });
    }

    const newPermission = new Permissions({
      name,
      permission,
      positission,
      room,
      single,
      singleType,
      user,
      status: status ? status : 1,
    });

    await newPermission.save();

    res.json({
      success: true,
      message: "Happy learning!",
      data: newPermission,
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ success: false, message: "Dịch vụ tạm thời giám đoạn" });
  }
};

// xem thông tin 1 quyền
const getOnePermission = async (req, res) => {};

// danh sách quyền
const getAllPermission = async (req, res) => {};

// sửa quyền
const updatePermission = async (req, res) => {};

// xóa quyền
const destroyPermission = async (req, res) => {};

module.exports = {
  createPermission,
  getOnePermission,
  getAllPermission,
  updatePermission,
  destroyPermission,
};
