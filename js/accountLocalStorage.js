//註冊頁面重新整理，輸入框資料還存在
function rememberRegisterAccount(){
    let accountObj={
        "accountTxt":$("#accountTxt").val(),
        "emailTxt":$("#emailTxt").val()
    }
    let accountStr=JSON.stringify(accountObj);
    localStorage.setItem("rememberRegisterAccount",accountStr);
}

function clearRememberRegisterAccount(){
    localStorage.removeItem("rememberRegisterAccount");
}

//重新整理，輸入框資料渲染
function renderRegisterAccount(){
    let accountStr=localStorage.getItem("rememberRegisterAccount");
    if(accountStr!==null){
        let accountObj=JSON.parse(accountStr);
        $("#accountTxt").val(accountObj.accountTxt);
        $("#emailTxt").val(accountObj.emailTxt);
        accountValidation($("#accountTxt"));
        emailValidation( $("#emailTxt"));
    }
}

//註冊到local stroage
function registerToDatabase(){
    let accountDbStr=localStorage.getItem("accountDatabase");
    let accountArray=[]
    if(accountDbStr!==null){
        let accountDbObj=JSON.parse(accountDbStr);
        accountArray=accountDbObj;
    }
    let accountObject={
        accountTxt:$("#accountTxt").val(),
        passwordTxt:$("#passwordTxt").val(),
        emailTxt:$("#emailTxt").val(),
        loginStatus:false
    };
    accountArray.push(accountObject);
    let accountStr=JSON.stringify(accountArray);
    localStorage.setItem("accountDatabase",accountStr);
}

//取得Db所有帳戶
function getAccountDbObj(){
    let accountDatabase=localStorage.getItem("accountDatabase");
    let accountObj=JSON.parse(accountDatabase);
    return accountObj;
}

//登入記住帳號
function rememberAccount(){
    let accountObj={
        "accountTxt":$("#accountTxt").val(),
        "passwordTxt":""
    }
    let accountStr=JSON.stringify(accountObj);
    localStorage.setItem("rememberLoginAccount",accountStr);
}

//記住密碼打勾
function rememberPassword(checkStatus){
    let accountObj={
        "accountTxt":$("#accountTxt").val(),
        "passwordTxt":""
    }
    if(checkStatus){
        accountObj={
            "accountTxt":$("#accountTxt").val(),
            "passwordTxt":$("#passwordTxt").val()
        }
    }
    let accountStr=JSON.stringify(accountObj);
    localStorage.setItem("rememberLoginAccount",accountStr);
}

//重新整理，輸入框資料渲染
function renderLoginAccount(){
    let accountStr=localStorage.getItem("rememberLoginAccount");
    if(accountStr!==null){
        let accountObj=JSON.parse(accountStr);
        $("#accountTxt").val(accountObj.accountTxt);
        if(accountObj.passwordTxt!==""){
            $("#rememberPassword").prop("checked",true);
            $("#passwordTxt").val(accountObj.passwordTxt);
        }
    }
}

//登入後，資料記錄到loginAccount
function loginAccount(accountTxtVal,passwordTxtVal){
    let loginAccount=getAccountDbObj().find(function(item){
        return item.accountTxt===accountTxtVal&&item.passwordTxt===passwordTxtVal;
    })
    localStorage.setItem("loginAccount",JSON.stringify(loginAccount));
}

//登出時清理loginAccount
function clearLoginAccount(){
    localStorage.removeItem("loginAccount");
}