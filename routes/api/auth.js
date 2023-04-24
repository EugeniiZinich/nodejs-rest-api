const express = require("express");
const {
  validateBody,
  authenticate,
  upload,
  passport,
} = require("../../middlewars");
const { schemas } = require("../../models/user");

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
  "/users",
  authenticate,
  validateBody(schemas.subscriptionSchema),
  updateSubscription
);

router.patch("/avatars", authenticate, upload.single("avatar"), updateAvatar);

module.exports = router;
