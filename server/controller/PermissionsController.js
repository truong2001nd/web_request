const Permissions = require("../models/Permissions");

// them moi quyen
const createPermission = async (req, res, next) => {
  // check quyen

  if (!req.permissions.permission.includes("create")) {
    return res
      .status(401)
      .json({ success: false, message: "Tài khoản không có quyền truy cập" });
  }

  // check quyen

  const { name, permission, position, room, single, singleType, user, status } =
    req.body;
  if (!name) {
    return res
      .status(400)
      .json({ success: false, message: "Vui lòng nhập tên quyền" });
  }

  if (
    !(
      Array.isArray(permission) &&
      Array.isArray(position) &&
      Array.isArray(room) &&
      Array.isArray(single) &&
      Array.isArray(singleType) &&
      Array.isArray(user)
    )
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
      position,
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
const getOnePermission = async (req, res) => {
  // check quyen

  if (!req.permissions.permission.includes("read")) {
    return res
      .status(401)
      .json({ success: false, message: "Tài khoản không có quyền truy cập" });
  }

  // check quyen

  try {
    const permissionOne = await Permissions.findOne({ _id: req.params.id });
    if (!permissionOne) {
      return res
        .status(400)
        .json({ success: false, message: "Quyền này không tồn tại" });
    }
    res.json({ success: true, permission: permissionOne });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Dịch vụ bị gián đoạn" });
  }
};

// danh sách quyền
const getAllPermission = async (req, res) => {
  // check quyen

  if (!req.permissions.permission.includes("read")) {
    return res
      .status(401)
      .json({ success: false, message: "Tài khoản không có quyền truy cập" });
  }

  // check quyen

  try {
    const permissionsAll = await Permissions.find();
    if (!permissionsAll) {
      return res
        .status(401)
        .json({ success: false, message: "Chưa có quyền nào được tạo!" });
    }
    res.json({ success: true, permission: permissionsAll });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Dịch vụ bị gián đoạn" });
  }
};
const getAllPermissionName = async (req, res) => {
  // check quyen

  if (!req.permissions.permission.includes("read")) {
    return res
      .status(401)
      .json({ success: false, message: "Tài khoản không có quyền truy cập" });
  }

  // check quyen

  try {
    const permissionsAll = await Permissions.find();
    const names = permissionsAll.map((permission) => ({
      _id: permission._id,
      name: permission.name,
    }));

    if (!permissionsAll) {
      return res
        .status(401)
        .json({ success: false, message: "Chưa có quyền nào được tạo!" });
    }

    console.log(permissionsAll);
    res.json({ success: true, permission: names });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Dịch vụ bị gián đoạn" });
  }
};
// sửa quyền
const updatePermission = async (req, res) => {
  // check quyen

  if (!req.permissions.permission.includes("update")) {
    return res
      .status(401)
      .json({ success: false, message: "Tài khoản không có quyền truy cập" });
  }

  // check quyen

  const { name, permission, position, room, single, singleType, user, status } =
    req.body;
  if (!name) {
    return res
      .status(400)
      .json({ success: false, message: "Vui lòng nhập tên quyền" });
  }

  if (
    !(
      Array.isArray(permission) &&
      Array.isArray(position) &&
      Array.isArray(room) &&
      Array.isArray(single) &&
      Array.isArray(singleType) &&
      Array.isArray(user)
    )
  ) {
    return res
      .status(400)
      .json({ success: false, message: "Sai dữ liệu đầu vào" });
  }
  try {
    const permissionID = await Permissions.findOne({ _id: req.params.id });
    if (!permissionID) {
      return res
        .status(400)
        .json({ success: false, message: "Mã quyền này sai" });
    }
    const existingPermission = await Permissions.findOne({
      name,
      _id: { $ne: req.params.id },
    });
    if (existingPermission) {
      return res
        .status(400)
        .json({ success: false, message: "Tên quyền đã tồn tại" });
    }
    let updatePermission = {
      name,
      permission: permission,
      position: position,
      room: room,
      single: single,
      singleType: singleType,
      user: user,
      status: status ? status : 1,
    };

    const newPermission = await Permissions.findOneAndUpdate(
      { _id: req.params.id },
      updatePermission,
      { new: true }
    );
    res.json({
      success: true,
      message: "Cập nhật thành công!",
      permission: newPermission,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Dịch vụ bị gián đoạn" });
  }
};

// xóa quyền
const destroyPermission = async (req, res) => {
  // check quyen

  if (!req.permissions.permission.includes("delete")) {
    return res
      .status(401)
      .json({ success: false, message: "Tài khoản không có quyền truy cập" });
  }

  // check quyen

  try {
    const deletePermission = await Permissions.findOneAndDelete({
      _id: req.params.id,
    });
    if (!deletePermission) {
      return res
        .status(400)
        .json({ success: false, message: "Quyền này không tồn tại" });
    }
    res.json({
      success: true,
      message: "Đã xóa thành công",
      permission: deletePermission,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Dịch vụ bị gián đoạn" });
  }
};

module.exports = {
  createPermission,
  getOnePermission,
  getAllPermission,
  updatePermission,
  destroyPermission,
  getAllPermissionName,
};
