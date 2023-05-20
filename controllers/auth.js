const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const { v4: uuidv4 } = require("uuid");

require("dotenv").config();

const { User } = require("../models/user");

const { ctrlWrapper, HttpError, sendEmail } = require("../helpers");

const { SECRET_KEY, BASE_URL } = process.env;

const googleAuth = async (req, res) => {
  const { _id: id } = req.user;

  const payload = {
    id,
  };

  const token = jwt.sign(payload, SECRET_KEY, {
    expiresIn: "23h",
  });

  await User.findByIdAndUpdate(id, { token });

  res.redirect(
    `http://localhost:3000/goit-react-hw-08-phonebook?token=${token}`
  );
};

const register = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email or password already in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email);

  const verificationCode = uuidv4();

  await User.create({
    ...req.body,
    password: hashPassword,
    avatarURL,
    verificationCode,
  });

  const { _id } = await User.findOne({ email });

  const payload = {
    id: _id,
  };

  const token = jwt.sign(payload, SECRET_KEY, {
    expiresIn: "23h",
  });

  const newUser = await User.findByIdAndUpdate(
    _id,
    { token },
    {
      new: true,
    }
  );

  const verifyEmail = {
    to: email,
    subject: "Verify email ContactBook",
    html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationCode}">Click for verify email</a>`,
  };

  await sendEmail(verifyEmail);

  await res.status(201).json({
    name: newUser.name,
    email: newUser.email,
    avatarURL: newUser.avatarURL,
    token: newUser.token,
  });
};

const verifyEmail = async (req, res) => {
  const { verificationCode } = req.params;
  const user = await User.findOne({ verificationCode });

  if (!user) {
    throw HttpError(404, "User not found");
  }

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationCode: "",
  });

  res.json({
    message: "Email verify success!",
  });
};

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(404, "User not found");
  }

  if (user.verify) {
    throw HttpError(400, "Verification has already been passed");
  }

  const verifyEmail = {
    to: email,
    subject: "Verify email ContactBook",
    html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${user.verificationCode}">Click for verify email</a>`,
  };

  await sendEmail(verifyEmail);

  res.status(200).json({
    message: "Verify email send success",
  });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(401, "Email or password invalid");
  }

  const passwordCompare = await bcrypt.compare(password, user.password);

  if (!passwordCompare) {
    throw HttpError(401, "Email or password invalid");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "24h" });

  await User.findByIdAndUpdate(user._id, { token });

  const { subscription } = user;

  res.json({
    token,
    user: {
      email,
      subscription,
    },
  });
};

const getCurrent = async (req, res) => {
  const { email, subscription } = req.user;

  res.status(200).json([{ email, subscription }]);
};

const logout = async (req, res) => {
  const { _id } = req.user;

  await User.findByIdAndUpdate(_id, { token: "" });

  res.status(200).json({
    message: "Logout success",
  });
};

const updateSubscription = async (req, res) => {
  const { subscription } = req.body;
  const { _id: id } = req.user;

  await User.findByIdAndUpdate(id, { subscription });

  res.status(200).json({
    message: "Subscription is update",
    subscription,
  });
};

const updateAvatar = async (req, res) => {
  const { _id: id } = req.user;

  if (!req.file) {
    throw HttpError(400, "Controller: Image require");
  }
  const { path } = req.file;

  await User.findByIdAndUpdate(id, { avatarURL: path });

  res.status(200).json([{ avatarURL: path }]);
};

module.exports = {
  googleAuth: ctrlWrapper(googleAuth),
  // googleRedirect: ctrlWrapper(googleRedirect),
  register: ctrlWrapper(register),
  login: ctrlWrapper(login),
  getCurrent: ctrlWrapper(getCurrent),
  logout: ctrlWrapper(logout),
  updateSubscription: ctrlWrapper(updateSubscription),
  updateAvatar: ctrlWrapper(updateAvatar),
  verifyEmail: ctrlWrapper(verifyEmail),
  resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
};
