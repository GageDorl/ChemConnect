require("dotenv").config();
var express = require("express");
var expresshbs = require("express-handlebars");
var bodyParser = require("body-parser");
var db = require("./models");
var session = require("express-session");
var passport = require("./config/passport");
var isObject = require("isobject");
var app = express();
var PORT = process.env.PORT || 3000;

var syncOptions = { force: false };
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static('public'))

require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

db.sequelize.sync(syncOptions).then(function() {
    app.listen(PORT, function() {
      console.log(
        "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
        PORT,
        PORT
      );
    });
  });
  
  module.exports = app;