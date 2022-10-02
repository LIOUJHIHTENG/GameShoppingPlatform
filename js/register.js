$(document).ready(function(){
    renderRegisterAccount();
})

$("#registerBtn").on("click",function(){;
    if(formValidation()){
        registerToDatabase();
        clearRememberRegisterAccount();
        window.location("https://lioujhihteng.github.io/GameShoppingPlatform-jquery/login.html");
    }
    return;
})