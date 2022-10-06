$(document).ready(function(){
    renderRegisterAccount();
})

$("#registerBtn").on("click",function(){;
    if(formValidation()){
        registerToDatabase();
        clearRememberRegisterAccount();
        window.location.assign("./login.html");
    }
    return;
})