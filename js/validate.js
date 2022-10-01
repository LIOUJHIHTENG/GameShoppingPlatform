let emptyMessage="必填欄位";
let successMessage="驗證成功";

//偵測欄位是否有填
function detectEmptyValidation(target){
    let errorType=target.data("empty");
    let inputVal=target.val();
    let errorStatus=true;
    let message=successMessage;
    if(inputVal.trim().length<=0){
        message=findErrorStatusObj(errorType).message;
        errorStatus=false;
    }
    changeErrorStatusObj(errorType,errorStatus);
    return errorStatus;
}

//顯示alert文字
function showAlertDom(target){
    let filterErrorStatusObj=errorStatusObj.find(item=>{
        return item.name===target[0].id&&item.status===false
    })
    let message=filterErrorStatusObj===undefined?successMessage:filterErrorStatusObj.message;
    let alertDoms=target.parent().siblings(".alert");
    message===successMessage?alertDoms.addClass("success"):alertDoms.removeClass("success");
    alertDoms.text(message);
}

//修改驗證狀態
function changeErrorStatusObj(errorType,errorStatus){
    errorStatusObj.find((item)=>{
        return item.type===errorType;
    }).status=errorStatus;
}

//找到該文字框的相關驗證
function findErrorStatusObj(errorType){
    let filterErrorStatusObj=errorStatusObj.find((item)=>{
        return item.type===errorType;
    });
    return filterErrorStatusObj;
}

//確認整個表單是否驗證完成
function formValidation(){
    let validataionStatus=errorStatusObj.every(item=>{
        return item.status===true;
    })
    return validataionStatus;
}