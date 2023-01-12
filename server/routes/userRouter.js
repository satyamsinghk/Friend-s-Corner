const express = require("express");
const {
  signup,
  addFriend,
  removeFriend,
  loginWithCookie,
  authMiddleware,
  loginWithCredentials,
  generateResetCode,
  resetPassword,
  logout,
} = require("../controllers/userController");
const router = express.Router();
// const userModel = require("../models/userModel");

router.post("/signup", signup, generateResetCode);
router.post("/login", loginWithCredentials);
router.get("/login", authMiddleware, loginWithCookie);
router.get("/logout", logout);

router.patch("/addfriend", authMiddleware, addFriend);
router.patch("/removefriend", authMiddleware, removeFriend);
router.patch("/generateQR", generateResetCode);
// router.get("/generateQR", generateResetCode);
router.patch("/resetPassword", resetPassword);

router.all("/*", (req, res) => {
  res.status(404);
  res.send("Invalid path");
});

module.exports = router;
