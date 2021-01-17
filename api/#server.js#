const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const session = require("express-session");
const KnexSessionStore = require("connect-session-knex")(session);

const config = require("../utils/secret.js");

const cardsRouter = require("../routes/cards/cards-router.js");
const authRouter = require("../routes/auth/auth-router.js");
const usersRouter = require("../routes/users/users-router.js");

const server = express();
const kdevelop = require("../knexfile.js");
const knex2 = require("knex")(kdevelop.development);

let store = new KnexSessionStore({
  knex: knex2,
  sidfieldname: "sid",
  createtable: true
});

server.use(
  session({
    saveUninitialized: true,
    secret: config.jwtSecret,
    resave: false,
    store: store
  })
);

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use("/api/cards", cardsRouter);
server.use("/api/auth", authRouter);
server.use("/api/users", usersRouter);

server.get("/", (req, res) => {
  res.send("Server Up!");
});

module.exports = server;
