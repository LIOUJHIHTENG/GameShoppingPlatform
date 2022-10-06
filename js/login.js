$(document).ready(function(){
    renderLoginAccount();
})

$("#loginBtn").on("click",function(){
    let accountTxt=$("#accountTxt");
    let passwordTxt=$("#passwordTxt");
    accountValidation(accountTxt);
    if(detectEmptyValidation(accountTxt)){
        passwordValidation(passwordTxt)
    }
    $(".alert").each(function(index){
        if($(this).hasClass("success")){
            $(this).text("");
        }
    })

    if(formValidation()){
        loginAccount(accountTxt.val(),passwordTxt.val());
        window.location.assign("./index.html");
    }
})

$("#accountTxt").on("blur",function(){
    rememberAccount();
})

$("#rememberPassword").on("change",function(){
    let checkStatus=false;
   if($(this).prop("checked")){
    checkStatus=true;
   }
   rememberPassword(checkStatus);
})


function accountValidation(target){
    detectEmptyValidation(target);
    showAlertDom(target);
}

function passwordValidation(target){
    detectEmptyValidation(target);
    passwordExistValidation(target);
    showAlertDom(target);
}