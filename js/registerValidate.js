let errorStatusObj=[
    {
        name:"accountTxt",
        type:"accountEmptyCheck",
        status:false,
        message:emptyMessage
    },
    {
        name:"accountTxt",
        type:"accountSpecialRegex",
        status:false,
        message:"帳號有非法字元"
    },
    {
        name:"accountTxt",
        type:"accountLength",
        status:false,
        message:"帳號不足8個字"
    },
    {
        name:"accountTxt",
        type:"accountNormalRegex",
        status:false,
        message:"帳號至少一個大寫、小寫字母與數字"
    },
    {
        name:"accountTxt",
        type:"registeredAccount",
        status:false,
        message:"此帳號已被註冊"
    },
    {
        name:"passwordTxt",
        type:"passwordEmptyCheck",
        status:false,
        message:emptyMessage
    },
    {
        name:"passwordTxt",
        type:"passwordSpecialRegex",
        status:false,
        message:"密碼有非法字元"
    },
    {
        name:"passwordTxt",
        type:"passwordLength",
        status:false,
        message:"密碼不足8個字"
    },
    {
        name:"passwordTxt",
        type:"passwordNormalRegex",
        status:false,
        message:"密碼至少一個大寫、小寫字母與數字"
    },
    {
        name:"passwordTxt",
        type:"accountNotPassword",
        status:false,
        message:"帳號與密碼不能相同"
    },
    {
        name:"PasswordConfrimTxt",
        type:"passwordConfirmEmpty",
        status:false,
        message:emptyMessage
    },
    {
        name:"PasswordConfrimTxt",
        type:"passwordConfirm",
        status:false,
        message:"與密碼不相同"
    },
    {
        name:"emailTxt",
        type:"emailEmpty",
        status:false,
        message:emptyMessage
    },
    {
        name:"emailTxt",
        type:"emailRegex",
        status:false,
        message:"email格式不正確"
    },
    {
        name:"emailTxt",
        type:"registeredEmail",
        status:false,
        message:"此email已被使用"
    }
]

$("#accountTxt").on("blur",function(){
    let target=$(this);
    accountValidation(target);
});

$("#passwordTxt").on("blur",function(){
    let target=$(this);
    passwordValidation(target);
});

$("#PasswordConfrimTxt").on("blur",function(){
    let target=$(this);
    passwordConfrimValidation(target);
});

$("#emailTxt").on("blur",function(){
    let target=$(this);
    emailValidation(target);
});

//各個框的驗證
function accountValidation(target){
    detectEmptyValidation(target);
    detectLengthValidation(target);
    detectSpecialCharactersValidation(target);
    dataRegexValidation(target);
    detectRegisteredData(target);
    showAlertDom(target);
}

function passwordValidation(target){
    detectEmptyValidation(target);
    detectLengthValidation(target);
    detectSpecialCharactersValidation(target);
    dataRegexValidation(target);
    detectAccountNotEqualPassword(target);
    showAlertDom(target);
}

function passwordConfrimValidation(target){
    detectEmptyValidation(target);
    detectPasswordConfirm(target);
    showAlertDom(target);
}

function emailValidation(target){
    detectEmptyValidation(target);
    detectEmailRegex(target);
    detectRegisteredData(target);
    showAlertDom(target);
}

//驗證詳細程式碼
//偵測特殊文字
function detectSpecialCharactersValidation(target){
    let errorType=target.data("speciaregex");
    let inputVal=target.val();
    let errorStatus=false;
    let specialCharactersRegex=/[^0-9a-zA-Z]/;
    let message=findErrorStatusObj(errorType).message;
    if(!specialCharactersRegex.test(inputVal)){
        message=successMessage;
        errorStatus=true;
    }
    changeErrorStatusObj(errorType,errorStatus);
}

//偵測文字長度
function detectLengthValidation(target){
    let errorType=target.data("length");
    let inputVal=target.val();
    let errorStatus=false;
    let lengthRegex=/.{8,}/;
    let message=findErrorStatusObj(errorType).message;
    if(lengthRegex.test(inputVal)){
        message=successMessage;
        errorStatus=true;
    }
    changeErrorStatusObj(errorType,errorStatus);
}

//偵測資料有無符合規則
function dataRegexValidation(target){
    let errorType=target.data("regex");
    let inputVal=target.val();
    let errorStatus=false;
    let normalRuleRegex=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
    let message=findErrorStatusObj(errorType).message;
     if(normalRuleRegex.test(inputVal)){
        errorStatus=true;
        message=successMessage;
    }
    changeErrorStatusObj(errorType,errorStatus);
}

//偵測密碼是否與帳號相同
function detectAccountNotEqualPassword(target){
    let accountVal=$("#accountTxt").val();
    let errorType=target.data("equal");
    let inputVal=target.val();
    let errorStatus=true;
    let message=successMessage;
    if(inputVal===accountVal){
        message=findErrorStatusObj(errorType).message;
        errorStatus=false;
    }
    changeErrorStatusObj(errorType,errorStatus);
}

//偵測再次輸入密碼是否跟密碼一樣
function detectPasswordConfirm(target){
    let errorType=target.data("confirm");
    let inputVal=target.val();
    let errorStatus=false;
    let message=findErrorStatusObj(errorType).message;
    if(inputVal===$("#passwordTxt").val()){
        message=successMessage;
        errorStatus=true;
    }
    changeErrorStatusObj(errorType,errorStatus);
}

//偵測信箱有無符合規則
function detectEmailRegex(target){
    let errorType=target.data("regex");
    let inputVal=target.val();
    let errorStatus=false;
    let message=findErrorStatusObj(errorType).message;
    //網路上找的email regex
    let emailReget=/(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

    if(emailReget.test(inputVal)){
        errorStatus=true;
        message=successMessage;
    }
    changeErrorStatusObj(errorType,errorStatus);
}

//偵測帳號與信箱已被註冊過
function detectRegisteredData(target){
    let errorType=target.data("registered");
    let errorStatus=true;
    let message=successMessage;
    let sameAccountStatus=false;
    let accountObj=getAccountDbObj();

    if(accountObj!==null){
        let inputVal=target.val();
        let targetType=target[0].id;
        sameAccountStatus=accountObj.some(function(item,index){
            return accountObj[index][targetType]===inputVal;
        })
    }

    if(sameAccountStatus){
        message=findErrorStatusObj(errorType).message;
        errorStatus=false;
    }

    changeErrorStatusObj(errorType,errorStatus);
}

$(".registerAccount input").on("blur",function(){
    rememberRegisterAccount();
});