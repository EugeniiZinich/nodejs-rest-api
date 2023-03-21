const express = require("express");
const { validateBody, authenticate, upload } = require("../../middlewars");
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
} = require("../../controllers");

const router = express.Router();

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