var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const cors = require("cors");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var familiesRouter = require("./routes/families");
var childrenRouter = require("./routes/children");
var invitationsRouter = require("./routes/invitations");
var healthRouter = require("./routes/health");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());

app.use("/api/", indexRouter);
app.use("/api/users", usersRouter);
app.use("/api/families", familiesRouter);
app.use("/api/children", childrenRouter);
app.use("/api/invitations", invitationsRouter);
app.use("/api/health", healthRouter);

module.exports = app;
