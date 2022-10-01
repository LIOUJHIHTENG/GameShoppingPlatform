$(document).ready(function(){
    renderRegisterAccount();
})

function formValidationCheck(){
    if(formValidation()){
        registerToDatabase();
        clearRememberRegisterAccount();
    }
}

$("#registerBtn").on("click",function(){;
    window.location.assign("../login.html");
    formValidationCheck();
})