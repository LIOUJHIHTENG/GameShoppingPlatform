const href=new URL(window.location.href);
let pathname=href.pathname;
function getLoginAccountStatus(){
    let loginAccountStr=localStorage.getItem("loginAccount");
    let loginStatus=false;
    if(loginAccountStr!==null){
        loginStatus=true;
    }
    return loginStatus;
}

let loginName="/login.html";
let registerName="/login.html";
let loginPageLoginStatus=(pathname===loginName&&getLoginAccountStatus());
let registerPageLoginStatus=(pathname===registerName&&getLoginAccountStatus());
if(loginPageLoginStatus||registerPageLoginStatus){
    window.location.assign("./index.html");
}

function getLoginAccount(){
    let loginAccountStr=localStorage.getItem("loginAccount");
    let loginAccountObj=JSON.parse(loginAccountStr);
    return loginAccountObj;
}


function logoutAccount(){
    clearLoginAccount();
    window.location.assign("./login.html");
}

$(".navbar ").on("click",".loginOutBtn",function(){
    logoutAccount();
})

$(".mobileNavbar ").on("click",".loginOutBtn",function(){
    logoutAccount();
})