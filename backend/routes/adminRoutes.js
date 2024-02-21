const express = require("express");
const {
  getUsers,
  editUser,
  updateUser,
  DeleteUser,
  registerAdmin,
  authAdmin,
  addUser,
} = require("../controllers/adminControllers");

const router = express.Router();

router.get("/", getUsers);
router.get("/editUser/:id", editUser);
router.post("/updateUser", updateUser);
router.delete("/deleteUser/:id", DeleteUser);
router.post("/registerAdmin", registerAdmin);
router.post("/adminLogin", authAdmin);
router.post("/addUser", addUser);

module.exports = router;
