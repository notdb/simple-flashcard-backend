const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Users = require("../users/users-model.js");
const secrets = require("../config/secret.js");

router.post("/register", (req, res) => {
  let user = req.body;
  console.log(req.body);
  const hash = bcrypt.hashSync(user.password, 8);
  user.password = hash;
  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
      console.log(error);
    });
});

router.get("/exists", (req, res) => {
  let authUser = req.query.user;
  let loggedInUser = { auth_user: authUser };
  Users.isLoggedIn(loggedInUser)
    .first()
    .then(user => {
      if (user) {
        res.status(200).json({ message: "1" });
      } else {
        res.status(401).json({ message: "0" });
      }
    });
});

router.post("/login", (req, res) => {
  let { username, password } = req.body;
  let authedUser = req.query.user;
  let loggedInUser = { auth_user: authedUser };
  console.log(req);
  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        Users.isLoggedIn(loggedInUser)
          .first()
          .then(user => {
            if (user) {
            } else {
              Users.addLoggedIn({
                username: username,
                auth_user: authedUser
              });
            }
          });
        const token = generateToken(user);
        res.status(200).json({
          message: `Welcome ${user.username}!`,
          token
        });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
      console.log(error);
    });
});

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    role: ["test"]
  };
  const options = {
    expiresIn: "1d"
  };
  return jwt.sign(payload, secrets.jwtSecret, options);
}

module.exports = router;
