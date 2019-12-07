$(document).ready(function(){
    $("#login").on("click",function(){
        var email = $("#email").val();
        var password = $("#password").val();
        $.post("/api/login",{
            email:email,
            password:password
        }).then(function(data){
            window.location.replace(data);
        }).catch(function(err) {
            alert("Wrong username/email or password")
          });
    })
})