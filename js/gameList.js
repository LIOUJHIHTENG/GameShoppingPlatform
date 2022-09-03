const url = new URL(window.location.href);
let params=url.searchParams;
if(params.has("type")){
    let  typeJson="../json/type.json";
    let typeId=params.get("type");
    getHostTypeTitle(typeJson,typeId);
}

if(params.has("host")){
    let  hostJson="../json/host.json";
    let hostId=params.get("host");
    getHostTypeTitle(hostJson,hostId);
}

function getHostTypeTitle(url,id){
    $.ajax({
        url:url,
        method:"get",
        type:"json",
        success:function(data){
            changeTitle(data,id);
        }
    })
}

function changeTitle(json,id){
    document.title= json[id].name;
}