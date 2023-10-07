const express = require("express");
const verifyToken = require("../middleware/verifyToken");

const {
  createSingle,
  getAllSingle,
} = require("../controller/SinglesController.js");

const router = express.Router();

router.post("/create", verifyToken, createSingle);
router.get("/getAll", verifyToken, getAllSingle);
// router.put("/update/:id", verifyToken, updateRoom);
// router.delete("/deleteRoom/:id", verifyToken, deleteRoom);

module.exports = router;
