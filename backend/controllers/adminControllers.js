const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Application = require("../models/applicationModel");
const Slot = require("../models/slotModel");

//@desc  Get all users
//@route GET /admin/get-all-users
//access Private
const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find({ isAdmin: false });
    res.status(200).json({
      message: "Users fetched successfully",
      data: users,
    });
  } catch (error) {
    res.status(500);
    throw new Error("Error fetching users data");
  }
});

//@desc  Get all pending applications
//@route GET /admin/get-pending-applications
//access Private
const getAllPendingApplications = asyncHandler(async (req, res) => {
  try {
    const pendingApplications = await Application.find({ status: "Pending" });
    res.status(200).json({
      message: "Pending Applications fetched successfully",
      data: pendingApplications,
    });
  } catch (error) {
    res.status(500);
    throw new Error("Error fetching pending applications");
  }
});

const changeApplicationStatus = asyncHandler(async (req, res) => {
  try {
    const { appId, status } = req.body;
    const application = await Application.findOneAndUpdate(
      { _id: appId },
      { status: status }
    );
    console.log(application,'Application');
    const user = await User.findOne({ _id: application.user });
    const unseenNotifications = user.unseenNotifications;
    unseenNotifications.push({
      type: "change-application-status",
      message: `Your application has been ${status}`,
      onClickPath: "/notifications",
    });
    await User.findByIdAndUpdate(application.user, { unseenNotifications });

    res.status(200).json({
      message: "Application status updated successfully",
      data: application,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error updating Application status",
    });
  }
});

//@desc  Get all approved applications
//@route GET /admin/get-approved-applications
//access Private
const getAllApprovedApplications = asyncHandler(async (req, res) => {
  try {
    const approvedApplications = await Application.find({ status: "Approved" });
    res.status(200).json({
      message: "Approved Applications fetched successfully",
      data: approvedApplications,
    });
  } catch (error) {
    res.status(500);
    throw new Error("Error fetching approved applications");
  }
});

//@desc  Get all rejected applications
//@route GET /admin/get-rejected-applications
//access Private
const getAllRejectedApplications = asyncHandler(async (req, res) => {
  try {
    const rejectedApplications = await Application.find({ status: "Rejected" });
    res.status(200).json({
      message: "Rejected Applications fetched successfully",
      data: rejectedApplications,
    });
  } catch (error) {
    res.status(500);
    throw new Error("Error fetching rejected applications");
  }
});

//@desc  Get All Slot details
//@route GET /admin/get-slot data
//access Private
const getSlotData = asyncHandler(async (req, res) => {
  try {
    const getAllSlots = await Slot.find({});
    res.json({
      message: "Slots fetched successfully",
      data: getAllSlots,
    });
  } catch (error) {}
});

//@desc  Get All Slot details
//@route GET /admin/confirm-slot-details
//access Private
const slotConfirm = asyncHandler(async (req, res) => {
  try {
    const { appId, userId, slotId } = req.body;
    console.log(req.body);
    console.log(
      appId,
      userId,
      slotId,
      "askdjuhnsaudnhiuasdianhsuasndisaunhdisad"
    );
    await Slot.findOneAndUpdate(
      { _id: slotId },
      { ApplicationId: appId, userId: userId, status: true }
    );
    await Application.findOneAndUpdate({ _id: appId }, { status: "Booked" });
    res.json({ message: 'Slot confirmation successfull'})
  } catch (error) {
    console.log(error, "errorerror");
  }
});

module.exports = {
  getAllUsers,
  getAllPendingApplications,
  changeApplicationStatus,
  getAllApprovedApplications,
  getAllRejectedApplications,
  getSlotData,
  slotConfirm,
};
