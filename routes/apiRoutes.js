var db = require("../models");
var passport = require("../config/passport");
module.exports = function(app){
    app.post("/api/login", passport.authenticate("local"), function(req,res){
        res.json("/home");
    });
    app.post("/api/signup", function(req,res){
        db.User.create({
            username: req.body.username,
            name:req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        .then(function(){
            res.redirect(307, "/api/login");
        })
        .catch(function(err){
            console.log(err);
            res.json(err);
        });
    });
    app.get("/logout", function(req,res){
        req.logout();
        res.redirect("/");
    });
    app.get("/api/user_data", function(req,res){
        if(!req.user){
            res.json({});
        }else{
            res.json({
                username: req.user.username,
                name:req.user.name,
                email: req.user.email,
                password: req.user.password,
                id: req.user.id
            });
        }
    });
    app.get("/api/user/:name", function(req,res){
        db.User.findOne({
            where:{username:req.params.name}
        }).then(function(data){
            res.json(data);
        })
    })
    app.delete("/api/user",function(req,res){
        db.User.destroy({
            where:{
                id:req.user.id
            }
        }).then(function(dbUser){
            res.json(dbUser);
        })
    })
    app.get("/api/posts", function(req,res){
        var query = {};
        if(req.query.user_id){
            query.UserID = req.query.user_id;
            db.Catalyst.findAll({
                where: query,
                include:[db.User]
            }).then(function(dbCatalyst){
                res.json(dbCatalyst);
            });
        }
        else{
            db.Catalyst.findAll({
                include:[db.User]
            }).then(function(dbCatalyst){
                res.json(dbCatalyst);
            })
        }
        
    });
    app.get("/api/posts/:id", function(req,res){
        db.Catalyst.findOne({
            where:{
                id: req.params.id
            },
            include:[db.User]
        }).then(function(dbCatalyst){
            res.json(dbCatalyst)
        });
    });
    app.post("/api/posts", function(req,res){
        console.log(req.body)
        db.Catalyst.create(req.body).then(function(dbCatalyst){
            res.json(dbCatalyst);
        });
    });
    app.delete("/api/posts/:id", function(req,res){
        db.Catalyst.destroy({
            where:{
                id:req.params.id
            }
        }).then(function(dbCatalyst){
            res.json(dbCatalyst);
        });
    });
    app.put("/api/posts", function(req,res){
        db.Catalyst.update(
            req.body,
            {
                where:{
                    id:req.body.id
                }
            }
        ).then(function(dbCatalyst){
            res.json(dbCatalyst)
        })
    })
};