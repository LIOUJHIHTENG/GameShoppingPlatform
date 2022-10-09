let gameJson="https://lioujhihteng.github.io/GameShoppingPlatform-jquery/json/game.json";
let gameId=0;
var player;

init()
function init(){
    const url=new URL(window.location.href);
    let params=url.searchParams;
    let gameJson="https://lioujhihteng.github.io/GameShoppingPlatform-jquery/json/game.json";
    
    if(params.has("id")){
        gameId=params.get("id");
        getGameDetail(gameJson,gameId)
    }
    
    function getGameDetail(json,gameId){
        $.ajax({
            url:json,
            method:"get",
            type:"json",
            success:function(data){
                data=data.find(function(item){
                    return item.id===Number(gameId);
                })
                renderGamePage(data);
            }
        })
    }

}

function changeTitle(data){
    document.title=data.name;
}

function renderGamePage(data){
    changeTitle(data);
    $(".gameTitle").text(data.name);
    $(".gameImg>img").attr("src",data.imgUrl);
    $(".releaseDate>.date").text(data.launchDate);
    $(".host").text(data.host);
    $(".type").text(data.type);
    $(".introContent").text(data.intro);
    createVideo(data.video);
}

function createVideo(video){
    let videoDom=`
    <div class="embed-responsive embed-responsive-16by9">
        <div id="player"></div>
    </div>
    `;
    $(".video").html(videoDom);
     onYouTubeIframeAPIReady=function() {
        let videoId=video;
        player = new YT.Player('player', {
            playerVars: {
                videoId: videoId,
                enablejsapi: 1,
                autoplay: 0,        // 在讀取時自動播放影片
                disablekb: 1,
                controls: 1,        // 在播放器顯示暫停／播放按鈕
                showinfo: 0,        // 隱藏影片標題
                modestbranding: 1,  // 隱藏YouTube Logo
                loop: 1,            // 影片循環播放
                fs: 0,              // 顯示全螢幕按鈕
                cc_load_policty: 0, // 隱藏字幕
                iv_load_policy: 3,  // 隱藏影片註解
                autohide: 0,// 播放影片時隱藏影片控制列
                hd: 1,
                playlist:videoId,
                rel: 0//不會顯示相關影片
            },
            events: {
                "onReady":onPlayerReady 
            }
        });
    }

    function onPlayerReady(e) {
        // 為確保瀏覽器上可以自動播放，要把影片調成靜音
        e.target.mute();
    }
}
