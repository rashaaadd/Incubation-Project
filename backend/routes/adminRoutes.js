const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
    getAllUsers,
    getAllPendingApplications,
    changeApplicationStatus,
    getAllApprovedApplications,
    getAllRejectedApplications,
    getSlotData,
    slotConfirm
} = require("../controllers/adminControllers");


router.get('/get-all-users',protect,getAllUsers)

router.get('/get-pending-applications',protect,getAllPendingApplications)
router.post('/change-application-status',protect,changeApplicationStatus)

router.get('/get-approved-applications',protect,getAllApprovedApplications)
router.get('/get-rejected-applications',protect,getAllRejectedApplications)

router.get('/get-slot-data',protect,getSlotData)
router.post('/confirm-slot-details',protect,slotConfirm)

module.exports = router;