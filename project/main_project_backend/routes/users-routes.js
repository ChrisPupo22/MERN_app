const express = require("express");

const places = require("./places-routes");

const { check } = require("express-validator");

const usersController = require("../controllers/users-controller");

const router = express.Router();

router.get("/", usersController.getAllUsers);

router.post(
  "/signup",
  [
    check("name").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
    check("password").isLength({ min: 6 }),
  ],
  usersController.createUser
);

router.post("/login", usersController.userLogin);

module.exports = router;
