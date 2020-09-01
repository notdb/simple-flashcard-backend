const jwt = require("jsonwebtoken");
const Users = require("../../routes/users/users-model.js");
const secrets = require("../secret.js");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, secrets.jwtSecret, (err, decodeToken) => {
      req.jwtToken = decodeToken;
      if (decodeToken.role[0] !== "chatbot") {
        res.status(401).json({ message: "Invalid Credentials" });
      } else {
        next();
      }
    });
  }
};
