var path = require("path");
var isAuthenticated = require("../config/middleware/isAuthenticated");
module.exports = function(app){
    app.get("/", function(req, res){
        if(req.user) {
            res.redirect("/home");
        }
        res.sendFile(path.join(__dirname, "../views/login.html"));
    });
    app.get("/signup", function(req, res){
        if(req.user){
            res.redirect("/home");
        }
        res.sendFile(path.join(__dirname, "../views/signup.html"));
    });
    app.get("/home", isAuthenticated, function(req,res){
        res.sendFile(path.join(__dirname, "../views/home.html"));
    });
    app.get("/catalysts", isAuthenticated, function(req,res){
        res.sendFile(path.join(__dirname, "../views/catalysts.html"))
    })
    app.get("/mine", isAuthenticated, function(req,res){
        res.sendFile(path.join(__dirname,"../views/mine.html"))
    })
}
