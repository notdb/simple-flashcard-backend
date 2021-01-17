const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Users = require("../users/users-model.js");
const secrets = require("../../utils/secret.js");
const generateTokenOne = require("../../utils/auth/generateToken.js");
const restricted = require("../../utils/auth/restricted-middleware.js");
const restricted2 = require("../../utils/auth/restricted2.js");

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

router.get("/exists", restricted, restricted2, (req, res) => {
  let authUser = req.query.user;
  let loggedInUser = { auth_user: authUser };
  console.log("TEST " + authUser);
  Users.findByDiscordUserName(authUser).then(user => {
    if (user.length !== 0) {
      Users.findNameInSessions(user[0].username).then(user => {
        if (user.length !== 0) {
          res.status(200).json({ message: "1" });
        } else {
          res.status(200).json({ message: "You need to login again" });
        }
      });
    } else {
      res.status(200).json({ message: "0" });
    }
  });
});

router.post("/login", (req, res) => {
  let { username, password } = req.body;
  let authedUser = req.query.user;
  //console.log({ username });
  Users.findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        console.log(user);
        req.session.username = user.username;
        console.log(req.session);
        const token = generateTokenOne(user);
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
