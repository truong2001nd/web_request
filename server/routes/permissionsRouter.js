const express = require("express");
const { createPermission } = require("../controller/PermissionsController.js");

const router = express.Router();

// tao quyen
router.post("/create", createPermission);

module.exports = router;
