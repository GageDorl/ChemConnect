$(document).ready(function(){
    $("#cancel").hide();
    $("#makeIt").hide();
    var catalystHolder = $(".catalyst-holder");
    var catalysts;
    var url = window.location.search;
    var userId;
    if(url.indexOf("?user=")!==-1){
        userId = url.split("=")[1];
        getCatalysts(userId);
        console.log("hi")
    }
    else{
        getCatalysts();
    }
    function getCatalysts(user){
        userId=user||"";
        
        if(userId){
            $.get("/api/user/"+userId,function(data){
                userId = "/?user_id="+data.id;
                console.log(userId)
            }).then(function(){
                $.get("/api/posts"+userId, function(data){
                    console.log(userId)
                    catalysts = data;
                    if(!catalysts||!catalysts.length){
                        console.log("No posts")
                    }
                    else{
                        initializeRows();
                    }
                })
            })
            

        }
        else{
            $.get("/api/posts", function(data){
                catalysts=data.sort(function(a,b){
                    return a.id-b.id;
                });
                if(!catalysts||!catalysts.length){
                    console.log("No posts")
                }
                else{
                    initializeRows();
                }
            })
        }
    }
    function deleteCatalyst(id){
        $.ajax({
            method: "DELETE",
            url:"/api/posts/"+id
        })
        .then(function(){
            getCatalysts()
        })
    }
    function initializeRows(){
        catalystHolder.empty();
        var catsToAdd = [];
        console.log(catalysts)
        for(var i=0; i<catalysts.length;i++){
            catsToAdd.push(createNewRow(catalysts[i]));
        }
        catalystHolder.append(catsToAdd);
    }
    function createNewRow(catalyst){
        var date = new Date(catalyst.createdAt);
        date = moment(date).format("MMMM Do YYYY, h:mm a");
        var newCard = $("<div>");
        newCard.addClass("card");
        newCard.addClass("uniqueCat")
        var newCardHead = $("<div>");
        newCardHead.addClass("card-header");
        newCardHead.html("<a href=/catalysts?user="+catalyst.User.username+">"+catalyst.User.username +"</a> | Written on "+date);
        var newCardBody=$("<div>");
        newCardBody.addClass("card-body");
        newCardBody.text(catalyst.body);
        newCard.append(newCardHead);
        newCard.append(newCardBody);
        return newCard;
    }
    $("#catalyst").on("click", function(){
        $(".catCreate").removeClass("col-lg-2");
        $(".catCreate").addClass("col-lg-9");
        $(".allCats").removeClass("col-lg-10");
        $(".allCats").addClass("col-lg-3");
        $("#cancel").fadeIn("1000");
        $("#makeIt").fadeIn("1000");
    });
    $("#cancel").on("click",function(){
        $(".allCats").removeClass("col-lg-3");
        $(".allCats").addClass("col-lg-10");
        $(".catCreate").removeClass("col-lg-9");
        $(".catCreate").addClass("col-lg-2");
        $("#catalyst").val("");
        $("#cancel").fadeOut("1000");
        $("#makeIt").fadeOut("1000");
    });
    $("#makeIt").on("click",function(){
        $.get("/api/user_data").then(function(data){
            var body = $("#catalyst").val();
            var userId=data.id;
            $.post("/api/posts",{
                body:body,
                UserId:userId
            }, function(data){
                getCatalysts();
                $(".allCats").removeClass("col-lg-3");
                $(".allCats").addClass("col-lg-10");
                $(".catCreate").removeClass("col-lg-9");
                $(".catCreate").addClass("col-lg-2");
                $("#catalyst").val("");
                $("#cancel").fadeOut("1000");
                $("#makeIt").fadeOut("1000");
            })
        })
        
    })
})