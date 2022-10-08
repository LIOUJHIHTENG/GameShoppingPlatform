let gameJson="https://lioujhihteng.github.io/GameShoppingPlatform-jquery/json/game.json";
let gameId=0;

init()
function init(){
    const url=new URL(window.location.href);
    let params=url.searchParams;
    let gameJson="https://lioujhihteng.github.io/GameShoppingPlatform-jquery/json/game.json";
    
    if(params.has("id")){
        gameId=params.get("id");
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
}

function getGameData(){
    $.ajax({
        url:gameJson,
        method:"get",
        type:"json",
        success:function(data){
            data=data.find(function(item){
                return item.id===Number(gameId);
            })
        }
    })
}
