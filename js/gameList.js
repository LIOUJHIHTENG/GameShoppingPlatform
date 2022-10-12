let gameJson="https://lioujhihteng.github.io/GameShoppingPlatform-jquery/json/game.json";

const url = new URL(window.location.href);
let params=url.searchParams;
let typeId=Number(params.get("type"));
let hostId=Number(params.get("host"));
let searchText=params.get("searchText");
let hosatOrTypeLabel="";

let currentPage=1;
let pageSize=6;
let totalPages=0;
let leftRight=2;
let filterAttr="";

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

if(params.has("type")){
    getHostTypeTitle("../json/type.json",typeId);
    $.ajax({
        url:"https://lioujhihteng.github.io/GameShoppingPlatform-jquery/json/type.json",
        method:"get",
        type:"json",
        success:function(data){
            let filterData=data.filter(function(item){
                if(typeId===item.type)
                    return item
            })
            hosatOrTypeLabel=filterData[0].name;
            getGame();
        }
    })
}

if(params.has("host")){
    getHostTypeTitle("https://lioujhihteng.github.io/GameShoppingPlatform-jquery/json/host.json",hostId);
    $.ajax({
        url:"https://lioujhihteng.github.io/GameShoppingPlatform-jquery/json/host.json",
        method:"get",
        type:"json",
        success:function(data){
            let filterData=data.filter(function(item){
                if(hostId===item.host)
                    return item
            })
            hosatOrTypeLabel=filterData[0].name;
            getGame();
        }
    })
}

if(params.has("searchText")){
    document.title=`${searchText} 的搜尋結果`;
    getGame();
}

function getGame(){
    $.ajax({
        url:gameJson,
        method:"get",
        type:"json",
        success:function(data){
            if(params.has("host")||params.has("type")){
                if(hosatOrTypeLabel!=="所有主機"&&hosatOrTypeLabel!=="所有類型"){
                    data=data.filter(function(item){
                        if(hosatOrTypeLabel===item.type||hosatOrTypeLabel===item.host){
                            return item;
                        }
                    })
                }
            }

            if(params.has("searchText")){
                    data=data.filter(function(item){
                    let gameName=item.name.toLowerCase();
                    return gameName.includes(searchText);
                })
            }
            
            if(filterAttr!==""){
                data=filterData(data);
            }
            createGameListDoms(data);
            createPaginationDoms();
        }
    })
}

function createGameListDoms(data){
    totalPages=Math.ceil(data.length/pageSize);
    let firstDataIndex=pageSize*(currentPage-1);
    let lastDataIndex=(pageSize*currentPage)-1;
    $(".gameList").html("");
    let domsElement=data.map(function(item,index,arr){
        if(arr[firstDataIndex]===undefined){
            return;
        }
        if(firstDataIndex<=lastDataIndex){
            let dom=`
            <li class="game">
                <a href="./gamePage.html?id=${arr[firstDataIndex].id}">
                    <img src="${arr[firstDataIndex].imgUrl}" alt="圖片已遺失">
                    <div class="desc">
                        <div class="name">
                        ${arr[firstDataIndex].name}
                        </div>
                        <div class="type">
                        ${arr[firstDataIndex].type}
                        </div>
                        <div class="host">
                        ${arr[firstDataIndex].host}
                        </div>
                        <div class="price">
                        NT$ ${arr[firstDataIndex].price}
                    </div>
                    </div>
                    <div class="price">
                        NT$ ${arr[firstDataIndex].price}
                    </div>
                </a>
            </li>
            `;
            firstDataIndex++;
            return dom;
        }
    }).join("");
    $(".gameList").append(domsElement);
}

function createPaginationDoms(){
    let dom="";
    $(".previousPageBtn").css("display","none");
    $(".nextPageBtn").css("display","none");
    if(currentPage<totalPages&&totalPages>1){
        $(".nextPageBtn").css("display","block");
    }

    if(currentPage!=1&&totalPages>1){
        $(".previousPageBtn").css("display","block");
    }
    $(".numberPageBtn").html("");

    if(totalPages!==1){
        dom=`
        <button data-page="1">
            1
        </button>
    `;
    }

    for(let page=currentPage-leftRight;page<currentPage;page++){
        if(page<=1){
            continue;
        }
        if(page===currentPage-2){
            dom+=`
                <button>
                    ...
                </button>
            `;
        }

        dom+=`
        <button data-page="${page}">
            ${page}
        </button>
        `;
    }

    for(let page=currentPage;page<=currentPage+leftRight;page++){
        if(page===totalPages){
            break;
        }

        if(page===1){
            continue;
        }
        else{
            dom+=`
            <button data-page="${page}">
                ${page}
            </button>
            `;
    
            if(page===currentPage+2){
                dom+=`
                    <button>
                        ...
                    </button>
                `;
            }
        }
    }

    if(totalPages!==1){
        dom+=`
        <button data-page="${totalPages}">
            ${totalPages}
        </button>
    `;
    }
    $(".numberPageBtn").append(dom);
    $(`.numberPageBtn>button[data-page=${currentPage}]`).addClass("currentShow");
}

$(document).on("click",".numberPageBtn>button",function(){
   currentPage=$(this).data("page");
   if(currentPage===undefined){
    return;
   }
   getGame();
})

$(".previousPageBtn").on("click",function(){
    if(currentPage<=1){
        $(".previousPageBtn").css("display","none")
        return;
    }
    $(".previousPageBtn").css("display","block")
    currentPage--;
    getGame();
})

$(".nextPageBtn").on("click",function(){
    if(currentPage>=totalPages){
        return;
    }
    currentPage++;
    getGame();
})

$(".filter input[name='filter']").on("change",function(e){
    filterAttr=$(this).val()
    getGame();
})

function filterData(data){
    switch(filterAttr){
        case "priceDown":
            return priceDown(data);
        case "priceUp":
            return priceUp(data);
        case "sellDown":
            return sellDown(data);
        case "sellUp":
            return sellUp(data);
        case "launchDateDown":
            return launchDateDown(data);
        case "launchDateUp":
            return launchDateUp(data);
        default:
            return data;
    }
}

function priceDown(data){
    data.sort(function(a,b){
        return b.price-a.price;
    })
    return data;
}

function priceUp(data){
    data.sort(function(a,b){
        return a.price-b.price;
    })
    return data;
}

function sellDown(data){
    data.sort(function(a,b){
        return b.sales-a.sales;
    })
    return data;
}

function sellUp(data){
    data.sort(function(a,b){
        return a.sales-b.sales;
    })
    return data;
}

function launchDateDown(data){
    data.sort(function(a,b){
        return new Date(b.launchDate)-new Date(a.launchDate);
    })
    return data;
}

function launchDateUp(data){
    data.sort(function(a,b){
        return new Date(a.launchDate)-new Date(b.launchDate);
    })
    return data;
}