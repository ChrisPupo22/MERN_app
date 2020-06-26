const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");

const User = require("../models/user");

// let DUMMY_USERS = [
//   {
//     id: "u1",
//     name: "Christopher Pupo",
//     location: "Miami, Fl",
//     email: "Chrispupo22@test.com",
//     password: "chris22",
//   },
//   {
//     id: "u2",
//     name: "Jimi Hendrix",
//     location: "Seattle, Washington",
//     email: "JimmiH@test.com",
//     password: "guitarHero",
//   },
// ];

const getAllUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find({}, "-password");
  } catch (err) {
    const error = new HttpError("was not able to fetch users", 500);
    return next(error);
  }
  res.json({ users: users.map((user) => user.toObject({ getters: true })) });
};

const createUser = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your input data", 422)
    );
  }

  const { name, email, password } = req.body;
  const randomUserId = "" + Math.floor(Math.random() * 10000);

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError("sign up failed, please try again later", 500);
    return next(error);
  }

  if (existingUser) {
    const error = new HttpError(
      "User email already in system, please login",
      422
    );
    return next(error);
  }

  const createdUser = new User({
    name,
    email,
    password,
    places: [],
  });

  try {
    await createdUser.save();
  } catch (err) {
    const error = new HttpError("Signing up failed, please try again.", 500);
    return next(error);
  }

  res.status(201).json({ user: createdUser.toObject({ getters: true }) });
};

const userLogin = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    const error = new HttpError("sign up failed, please try again later", 500);
    return next(error);
  }

  if (!existingUser || existingUser.password !== password) {
    const error = new HttpError("invalid credentials, cannot login", 401);
    return next(error);
  }

  res.json({
    message: "logged in",
    user: existingUser.toObject({ getters: true }),
  });

}

exports.getAllUsers = getAllUsers;
exports.createUser = createUser;
exports.userLogin = userLogin;
