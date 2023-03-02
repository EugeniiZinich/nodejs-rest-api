const express = require("express");
const { validateBody } = require("../../middlewars");
const { schemas } = require("../../models/user");
const { register, login } = require("../../controllers");
const router = express.Router();

router.post("/register", validateBody(schemas.registerSchema), register);
router.post("/login", validateBody(schemas.loginSchema), login);

module.exports = router;
