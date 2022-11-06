const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Application = require("../models/applicationModel");

//@desc  Register new user
//@route POST /users
//access Public
const registerUsers = asyncHandler(async (req, res) => {
  console.log(req.body, "heeeeee");
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  //Check if user exists

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  //Hash the password

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //Create User
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
      message: "User added succesfully",
    });
  } else {
    res.status(401);
    throw new Error("Invalid user data");
  }
});

//@desc  Authenticate a user
//@route POST /users/login
//access Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
      message: "User Login Successfull",
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

//@desc  Get user data
//@route GET /users/me
//access Private
const getMe = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(200).json({ message: "User does not exist" });
    } else {
      res.status(200).json({
        id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        seenNotifications: user.seenNotifications,
        unseenNotifications: user.unseenNotifications,
        message: "Authorisation successfull",
      });
    }
  } catch (error) {
    res.status(501);
    throw new Error("Error getting user data");
  }
});

//@desc  Apply company application
//@route POST /users/application
//access Private
const submitApplication = asyncHandler(async (req, res) => {
  try {
    req.body.user = req.user._id; ////if user exist add
    const application = await Application.findOne({ user: req.body.user });
    console.log(application,'121212112');
    if (application) {
      res.status(200).json({
        error:'User already applied'
      })
    } else {
      console.log(req.body, "form details......");
      const newApplication = new Application(req.body)
      await newApplication.save()
      const adminUser = await User.findOne({ isAdmin: true });
      console.log(adminUser, "adminadmin");
      const unseenNotifications = adminUser.unseenNotifications;
      unseenNotifications.push({
        type: "new-application-request",
        message: `${newApplication.name} has applied for the event`,
        data: {
          applicationId: newApplication._id,
          name: newApplication.name,
        },
        onClickPath: "/admin/applications",
      });
      console.log(
        unseenNotifications,
        "unseeereq.user._idreq.user._idreq.user._id"
      );
      await User.findByIdAndUpdate(adminUser._id, { unseenNotifications });
      res.status(200).json({
        message: "Application successfull",
      });
    }
  } catch (error) {
    res.status(501);
    throw new Error("Company Application Error");
  }
});

//@desc  Mark All Notifications As Seen
//@route POST /users/mark-all-notifications-as-seen
//access Private
const markAllNotifAsSeen = asyncHandler(async(req,res)=>{
  try {
    const user = req.user
    const unseenNotifications = user.unseenNotifications
    const seenNotifications = user.seenNotifications;
    seenNotifications.push(...unseenNotifications)
    user.unseenNotifications = []
    user.seenNotifications = seenNotifications
    const updatedUser = await user.save()
    res.status(200).json({
      message: "All notifications marked as seen",
      data: updatedUser
    })
  } catch (error) {
    res.status(500);
    throw new Error("Error marking all notifications as seen");
  }
})

//@desc  Delete All Notifications
//@route POST /users/delete-all-notifications
//access Private
const deleteAllNotifications = asyncHandler(async(req,res)=>{
  try {
    const user = req.user
    user.unseenNotifications = []
    user.seenNotifications = []
    const updatedUser = await user.save()
    res.status(200).json({
      message: "All notifications deleted",
      data: updatedUser
    })
  } catch (error) {
    res.status(500);
    throw new Error("Error deleting all notifications");
  }
})

//@desc  Get all users
//@route GET /admin/get-all-users
//access Private
const getAllUsers = asyncHandler(async(req,res)=>{
  try {
      const users = await User.find({isAdmin: false})
      res.status(200).json({
          message:"Users fetched successfully",
          data:users
      })
  } catch (error) {
      res.status(500)
      throw new Error("Error fetching users data")
  }
})

const showApplicationDetils = asyncHandler(async(req,res)=>{
  try {
      const applicationDetails = await Application.find({user: req.user._id})
      console.log(applicationDetails,'appli details........111')
      // res.status(200).json({
      //     message:"Users fetched successfully",
      //     data:users
      // })
  } catch (error) {
      res.status(500)
      throw new Error("Error fetching users data")
  }
})


//Geneate JWT

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  registerUsers,
  loginUser,
  getMe,
  submitApplication,
  markAllNotifAsSeen,
  deleteAllNotifications,
  getAllUsers,
  showApplicationDetils
};
