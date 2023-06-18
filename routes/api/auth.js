const express = require("express");
const {
  validateBody,
  authenticate,
  // cloudUpload,
  passport,
} = require("../../middlewars");
const { schemas } = require("../../models/user");
const uploadAvatar = require("../../middlewars/avatarUpload");
const {
  register,
  verifyEmail,
  resendVerifyEmail,
  login,
  getCurrent,
  logout,
  updateSubscription,
  updateAvatar,
  googleAuth,
  // googleRedirect,
} = require("../../controllers");

const router = express.Router();

// const cloudAvatarOptions = {
//   fieldName: "avatar",
//   destFolder: "contactsAvatar",
//   transformation: {
//     width: 100,
//     height: 100,
//     crop: "fill",
//     gravity: "auto",
//     zoom: 0.75,
//   },
// };

router.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

router.get(
  "/google-redirect",
  passport.authenticate("google", { session: false }),
  googleAuth
);

router.post("/register", validateBody(schemas.registerSchema), register);

router.get("/verify/:verificationCode", verifyEmail);

router.post("/verify", validateBody(schemas.emailSchema), resendVerifyEmail);

router.post("/login", validateBody(schemas.loginSchema), login);

router.get("/current", authenticate, getCurrent);

router.post("/logout", authenticate, logout);

router.patch(
  "/subscription",
  authenticate,
  validateBody(schemas.subscriptionSchema),
  updateSubscription
);

router.patch(
  "/avatars",
  authenticate,
  uploadAvatar.single("avatar"),
  // cloudUpload(cloudAvatarOptions),
  updateAvatar
);

module.exports = router;
