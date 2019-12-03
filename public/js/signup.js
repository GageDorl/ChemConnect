var isPlainObject = function (obj) {
	return Object.prototype.toString.call(obj) === '[object Object]';
};
$(document).ready(function(){
    function handleLoginErr(err){
        $("#alert .msg").text(err.responseJSON);
        $("#alert").fadeIn(500);
    }

function validateSignUp(){
    var filledOut=true;
    if($("#name").val()==""){
        $("#name-tip").html("What's your name?");
        filledOut=false;
        console.log("name")
    }
    else{
        $("#name-tip").html("");
    }
    if($("#username").val()==""){
        $("#username-tip").html("You need a username");
        filledOut=false;
    }
    else{
        $("#username-tip").html("");
    }
    if($("#email").val()==""){
        $("#email-tip").html("Email is required :/");
        filledOut=false;
    }
    else{
        $("#email-tip").html("");
    }
    if($("#password").val()==""){
        $("#password-tip").html("How would you sign in?");
        filledOut=false;
    }
    else{
        $("#password-tip").html("");
    }
    if(filledOut) return true;
    else return false;
}
$(document).on("click","#signUp", function(){
    console.log("clicked");
    var filled = validateSignUp();
    if(filled){
        var username = $("#username").val();
        var name = $("#name").val();
        var email = $("#email").val();
        var password = $("#password").val();
        $.post("/api/signup", {
            username: username,
            name: name,
            email: email,
            password: password
        }).then(function(data){
            if(isPlainObject(data)){
                if(data.errors){
                    if(data.errors[0].message=="username must be unique"){
                        alert("Username already taken")
                    }
                    else if(data.errors[0].message=="email must be unique"){
                        alert("Email already taken")
                    }
                }
            }
            else{
                window.location.replace(data);
            }
           
        }).catch(function(err){
            alert(err.name);
        });
    }
    else{
        console.log("bud")
    }
});
});