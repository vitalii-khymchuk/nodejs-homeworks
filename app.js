const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const { contactsRouter, authRouter } = require("./src/routes/api");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/avatars", express.static("./public/avatars"));
app.use("/api/contacts", contactsRouter);
app.use("/api/users", authRouter);

app.use((req, res) => {
  res.status(404).json({ code: 404, message: "Not found" });
});

app.use((err, req, res, next) => {
  console.log(err);
  const { status = 500, message = "Internal server error" } = err;
  res.status(status).json({ code: status, message });
});

module.exports = app;
