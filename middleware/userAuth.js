const express = require("express");
const db = require("../models");

const User = db.users;

const saveUser = async (req, res, next) => {
  try {
    const emailCheck = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (emailCheck) {
      return res.json(409).send("Email already exists");
    }
    next();
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  saveUser,
};
