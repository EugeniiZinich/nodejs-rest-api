const express = require("express");
const { validateBody, authenticate } = require("../../middlewars");
const { schemas } = require("../../models/user");

const {
  register,
  login,
  getCurrent,
  logout,
  updateSubscription,
} = require("../../controllers");

const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema), register);

router.post("/login", validateBody(schemas.loginSchema), login);

router.get("/current", authenticate, getCurrent);

router.post("/logout", authenticate, logout);

router.patch(
  "/users",
  authenticate,
  validateBody(schemas.subscriptionSchema),
  updateSubscription
);

module.exports = router;
