const express = require("express");
const router = express.Router();
const {
  registerUsers,
  loginUser,
  getMe,
  submitApplication,
  markAllNotifAsSeen,
  deleteAllNotifications,
  showApplicationDetils
} = require("../controllers/userController");
const { protect } = require("../middleware/authMiddleware");


router.post("/register", registerUsers);
router.post("/login", loginUser);
router.get("/", protect, getMe);
router.post("/application",protect,submitApplication)
router.post("/status",protect,showApplicationDetils)
router.post("/mark-all-notifications-as-seen",protect,markAllNotifAsSeen)
router.post("/delete-all-notifications",protect,deleteAllNotifications)
router.get("/delete-all-notifications",protect,deleteAllNotifications)


module.exports = router;
