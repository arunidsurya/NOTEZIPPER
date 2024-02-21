const express = require("express");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Admin = require("../models/adminModel");
const generateToken = require("../utils/generateToke");

const registerAdmin = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const adminExists = await Admin.findOne({ email });
  if (adminExists) {
    res.status(400);
    throw new Error("Admin Already Exists");
  }

  const admin = await Admin.create({
    name,
    email,
    password,
    isAdmin: true,
  });

  if (admin) {
    res.status(201).json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      isAdmin: admin.isAdmin,
      token: generateToken(admin._id),
    });
  } else {
    res.status(400);
    throw new Error("Internal Error!");
  }
});

const authAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });

  if (admin && (await admin.matchPassword(password))) {
    res.json({
      _id: admin._id,
      name: admin.name,
      email: admin.email,
      isAdmin: admin.isAdmin,
      pic: admin.pic,
      token: generateToken(admin._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find();

  res.json(users);
});

const editUser = asyncHandler(async (req, res) => {
  const user = await User.findById({ _id: req.params.id });

  res.json(user);
});

const updateUser = asyncHandler(async (req, res) => {
  const { id, name, email } = req.body;
  console.log("User ID:", id);
  console.log("Updated Name:", name);
  console.log("Updated Email:", email);

  const user = await User.findById(id);
  // console.log(user);

  if (user) {
    user.name = name || user.name;
    user.email = email || user.name;

    if (req.body.password) {
      user.pic = req.body.pic || user.pic;
    }
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();
  } else {
    console.log("Error");
    res.status(404);
    throw new Error("User Not Found");
  }

  res.json("updated successfully");
});

const DeleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  console.log(user);

  if (!user) {
    res.status(404);
    throw new Error("Note not Found");
  }

  await User.deleteOne({ _id: req.params.id });
  res.json({ message: "User Removed" });
});

const addUser = asyncHandler(async (req, res) => {
  const { name, email, password, pic } = req.body;

  console.log(name, pic);

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User Already Exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    pic,
  });

  if (user) {
    res.status(201).json({
      success: sucess,
    });
  } else {
    res.status(400);
    throw new Error("Internal Error!");
  }
});

module.exports = {
  getUsers,
  editUser,
  updateUser,
  DeleteUser,
  registerAdmin,
  authAdmin,
  addUser,
};
