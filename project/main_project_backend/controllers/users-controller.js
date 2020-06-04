const HttpError = require("../models/http-error");

let DUMMY_USERS = [
  {
    id: "u1",
    name: "Christopher Pupo",
    location: "Miami, Fl",
    username: "Chrispupo22",
    password: "chris22",
  },
  {
    id: "u2",
    name: "Jimi Hendrix",
    location: "Seattle, Washington",
    username: "JimmiH",
    password: "guitarHero",
  },
];

const getAllUsers = (req, res, next) => {
    res.json({users: DUMMY_USERS})
};

const createUser = (req, res, next) => {
  const { name, location, username, password } = req.body;
  const randomUserId = "" + Math.floor(Math.random() * 10000);

  const hasUser = DUMMY_USERS.find(u => u.username === username);
  if (hasUser) {
    throw new HttpError('Could not create user, email already exists.', 422);
  }

  const createdUser = {
    id: randomUserId,
    name,
    location,
    username,
    password,
  }

  console.log(createdUser)
  DUMMY_USERS.push(createdUser);

  res.status(201).json({ user: createdUser });
};

const userLogin = (req, res, next) => {
  const { username, password } = req.body; 
  
  const identifiedUser = DUMMY_USERS.find(u => u.username === username); 
  if (!identifiedUser || identifiedUser.password !== password) {
      throw new HttpError('could not identify user, incorrect credentials', 401); 
  }
  res.json({message: "logged in"}); 
};

exports.getAllUsers = getAllUsers;
exports.createUser = createUser;
exports.userLogin = userLogin;
