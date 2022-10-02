//搜尋
//跑出提示框，點擊提示框就會前往該商品詳細頁面
let searchTxt="";
$(".searchTxt").on("input",function(){
    searchTxt=$(this).val();
    if($.trim(searchTxt).length===0){
        $(".searchResultList").html("");
        return;
    }
    getGameList();
})

$(".searchTxt").on("click",function(){
    searchTxt=$(this).val();
    if($.trim(searchTxt).length===0){
        $(".searchResultList").html("");
        return;
    }
    getGameList();
})

$("body").on("click",function(e){
    $(".searchResultList").html("");
})

$(".mobileNavbar").on("click",function(e){
    $(".searchResultList").html("");
})

//前往搜尋結果
$(".searchTxt").on("keypress",function(e){
    if(e.key==="Enter"){
        e.preventDefault();
        searchTxt=$(this).val();
        if($.trim(searchTxt).length===0){
            return;
        }
        window.location=`../gameList.html?searchText=${searchTxt}`;
    }
})

$(".searchBtn").on("click",function(e){
    e.preventDefault();
    console.log(searchTxt)
    if($.trim(searchTxt).length===0){
        return;
    }
    window.location=`../gameList.html?searchText=${searchTxt}`;
})

function createSearchListDom(result){
    let domStr="";
    let filterResult=result.filter(function(item){
        let gameName=item.name.toLowerCase();
        return gameName.includes(searchTxt);
    });
    let doms=filterResult.map(function(item){
        domStr=`
        <li>
            <a href="../gamePage.html?id=${item.id}">
                <span> ${item.name}</span>
                <span>${item.host}</span>   
            </a>
        </li>
        `;
        return domStr;
    }).join("");
    $(".searchResultList").html(doms);
}

function getGameList(){
    $.ajax({
        url:"https://lioujhihteng.github.io/GameShoppingPlatform-jquery/json/game.json",
        method:"get",
        type:"json",
        success:function(result){
            createSearchListDom(result);
        }
    })
}