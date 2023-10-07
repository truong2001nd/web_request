const express = require("express");
const verifyToken = require("../middleware/verifyToken");

const { createSingle } = require("../controller/SinglesController.js");

const router = express.Router();

router.post("/create", createSingle);
// router.get("/getOne/:id", verifyToken, getOneRoom);
// router.get("/getAll", verifyToken, getAllRoom);
// router.put("/update/:id", verifyToken, updateRoom);
// router.delete("/deleteRoom/:id", verifyToken, deleteRoom);

module.exports = router;
