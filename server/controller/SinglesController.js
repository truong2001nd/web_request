const Singles = require("../models/Singles.js");
const SingleType = require("../models/SingleTypes.js");
const User = require("../models/Users.js");

const createSingle = async (req, res, next) => {
  const { name, content, singlesStyes, sender, approver } = req.body;
  if (!name || !content || !singlesStyes || !sender || !approver) {
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
    const senderRelease = await User.findOne({ _id: sender });

    if (!senderRelease) {
      return res
        .status(401)
        .json({ success: false, message: "Mã người gửi không tồn tại" });
    }
    const approverRelease = await User.findOne({ _id: approver });

    if (!approverRelease) {
      return res
        .status(401)
        .json({ success: false, message: "Mã người phê duyệt không tồn tại" });
    }
    if (senderRelease === approverRelease) {
      return res.status(401).json({
        success: false,
        message: "Bạn không thể gửi đơn đến bạn được",
      });
    }
    const newSingles = new Singles({
      name,
      content: JSON.stringify(content),
      singlesStyes,
      sender,
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

module.exports = { createSingle };
