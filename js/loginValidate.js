let nonExistAccount="帳號或密碼錯誤";
let errorStatusObj=[
    {
        name:"accountTxt",
        type:"accountEmptyCheck",
        status:false,
        message:emptyMessage
    },
    {
        name:"passwordTxt",
        type:"passwordEmptyCheck",
        status:false,
        message:emptyMessage
    },
    {
        name:"passwordTxt",
        type:"getPassword",
        status:false,
        message:nonExistAccount
    }
]

//密碼是否存在
function passwordExistValidation(target){
    let errorType=target.data("user");
    let errorStatus=true;
    let message=successMessage;
    if(!isMatchPassword(target)){
        message=findErrorStatusObj(errorType).message;
        errorStatus=false;
    }
    changeErrorStatusObj(errorType,errorStatus);
}

//找到Db裡有該帳號
function isMatchAccount(accountTxt){
    let accountTxtType=accountTxt[0].id;
    let accountVal=accountTxt.val();
    let accountObj=getAccountDbObj();
    let findAccountObj=accountObj.find(function(item,index){
        return accountObj[index][accountTxtType]===accountVal;
    })
    return findAccountObj;
}

//找到帳號是否符合Db裡的密碼
function isMatchPassword(target){
    let accountTxt=$("#accountTxt");
    let passwordVal=target.val();
    let findPasswordStatus=false;
    let findAccountObj=isMatchAccount(accountTxt);
    if(findAccountObj!==undefined &&findAccountObj.passwordTxt===passwordVal){
        findPasswordStatus=true;
    }
    return findPasswordStatus;
}