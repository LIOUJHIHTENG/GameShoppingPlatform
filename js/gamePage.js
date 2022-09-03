const url=new URL(window.location.href);
let params=url.searchParams;
let gameJson="../json/game.json";

if(params.has("id")){
    let gameId=params.get("id");
    getGameDetail(gameJson,gameId-1)
}

function getGameDetail(json,gameId){
    $.ajax({
        url:json,
        method:"get",
        type:"json",
        success:function(data){
            changeTitle(data,gameId)
        }
    })
}

function changeTitle(data,gameId){
    document.title=data[gameId].name;
}