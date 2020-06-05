const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");

let DUMMY_USERS = [
  {
    id: "u1",
    name: "Christopher Pupo",
    location: "Miami, Fl",
    email: "Chrispupo22@test.com",
    password: "chris22",
  },
  {
    id: "u2",
    name: "Jimi Hendrix",
    location: "Seattle, Washington",
    email: "JimmiH@test.com",
    password: "guitarHero",
  },
];

const getAllUsers = (req, res, next) => {
  res.json({ users: DUMMY_USERS });
};

const createUser = (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    throw new HttpError(
      "Invalid inputs passed, please check your input data",
      422
    );
  }

  const { name, location, email, password } = req.body;
  const randomUserId = "" + Math.floor(Math.random() * 10000);

  const hasUser = DUMMY_USERS.find((u) => u.email === email);
  if (hasUser) {
    throw new HttpError("Could not create user, email already exists.", 422);
  }

  const createdUser = {
    id: randomUserId,
    name,
    location,
    email,
    password,
  };

  console.log(createdUser);
  DUMMY_USERS.push(createdUser);

  res.status(201).json({ user: createdUser });
};

const userLogin = (req, res, next) => {
  const { email, password } = req.body;

  const identifiedUser = DUMMY_USERS.find((u) => u.email === email);
  if (!identifiedUser || identifiedUser.password !== password) {
    throw new HttpError("could not identify user, incorrect credentials", 401);
  }
  res.json({ message: "logged in" });
};

exports.getAllUsers = getAllUsers;
exports.createUser = createUser;
exports.userLogin = userLogin;
