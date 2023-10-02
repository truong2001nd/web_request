require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const permissionRouter = require("./routes/permissionsRouter.js");
// const authRouter = require("./routes/auth.js");
// // const user = require('./routes/user.js');
// const account = require("./routes/account.js");

const connecDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1/qlpdd");
    console.log("MongoDB connected");
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};
connecDB();

const app = express();
app.use(express.json());
app.use(cors());

// app.use("/api/auth", authRouter);
app.use("/api/permission", permissionRouter);
// app.use('/api/user',user)
// app.use("/api/account", account);

const PORT = 5000;

app.listen(PORT, (req, res) => console.log(`server started on port ${PORT}`));
