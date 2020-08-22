const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const cardsRouter = require("../cards/cards-router.js");
const authRouter = require("../auth/auth-router.js");

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use("/api/cards", cardsRouter);
server.use("/api/auth", authRouter);

server.get("/", (req, res) => {
  res.send("Server Up!");
});

module.exports = server;
