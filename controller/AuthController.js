const User = require("../models/userModel");
const mongoose = require("mongoose");
const { signUpschema, options } = require("../utils/validation");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const sendEmail = require("../email/emailSender");
const bcrypt = require("bcrypt");

const createToken = (_id, email) => {
  const verificationToken = crypto.randomBytes(16).toString("hex");
  return jwt.sign({ _id, email, verificationToken }, process.env.SECRET, {
    expiresIn: "3d",
  });
};

//Sign up
const signUpUser = async (req, res) => {
  const { firstname, lastname, phonenumber, email, password } = req.body;

  const validateResult = signUpschema.validate(req.body, options);

  if (validateResult.error) {
    res.status(400).json({ error: validateResult.error.details[0].message });
  }

  try {
    const user = await User.signup(
      firstname,
      lastname,
      phonenumber,
      email,
      password
    );

    const token = createToken(user._id, user.email);

    const verificationUrl = `${process.env.BASE_URL}/confirm-email/${user._id}`;
    await sendEmail(user.email, "Verify your email", { verificationUrl });

    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//Login User

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    const token = createToken(user._id, user.email);

    res.status(200).json({ email, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const emailConfirmation = async (req, res) => {
  const {_id} = req.params;

  try {
    const confirmedUser = await User.confirmEmail(_id);
    res
      .status(200)
      .json({ message: "Email confirmed successfully", user: confirmedUser });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { signUpUser, loginUser, emailConfirmation };
