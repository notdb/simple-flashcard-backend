const jwt = require("jsonwebtoken");
const secrets = require("../secret.js");

module.exports = function(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    role: ["test1"]
  };
  const options = {
    expiresIn: "1d"
  };
  if (user.username == "admin") {
    payload.role[0] = "chatbot";
  }
  return jwt.sign(payload, secrets.jwtSecret, options);
};
