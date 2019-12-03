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
     
            $.get("/api/user_data/",function(data){
                userId = "/?user_id="+data.id;
                console.log(userId)
            }).then(function(){
                $.get("/api/posts"+userId, function(data){
                    console.log(userId)
                    catalysts = data.sort(function(a,b){
                        return b.id-a.id;
                    });
                    if(!catalysts||!catalysts.length){
                        catalystHolder.empty();
                    }
                    else{
                        initializeRows();
                    }
                })
            })
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
        var buttonSpan = $("<span>");
        buttonSpan.css("float","right");
        var deleteButton = $("<input>")
        deleteButton.addClass("btn btn-danger delete");
        deleteButton.attr("id",catalyst.id);
        deleteButton.attr("type","button")
        deleteButton.val("X");
        // var editButton = $("<input>");
        // editButton.addClass("btn btn-primary edit");
        // editButton.attr("id",catalyst.id);
        // editButton.attr("type","button")
        // editButton.val("Edit");
        // buttonSpan.append(editButton);
        buttonSpan.append(deleteButton);
        newCardHead.append(buttonSpan);
        newCard.append(newCardHead);
        newCard.append(newCardBody);
        return newCard;
    }
    $(document).on("click",".delete",function(){
        deleteCatalyst($(this).attr("id"));
    })
})