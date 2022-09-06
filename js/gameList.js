const url = new URL(window.location.href);
let params=url.searchParams;
let typeId=Number(params.get("type"));
let hostId=Number(params.get("host"));

if(params.has("type")){
    let name="";
    let  typeJson="../json/type.json";
    getHostTypeTitle(typeJson,typeId);
    $.ajax({
        url:typeJson,
        method:"get",
        type:"json",
        success:function(data){
            let filterData=data.filter(function(item){
                if(typeId===item.type)
                    return item
            })
            name=filterData[0].name;
            getGame(name);
        }
    })
}

if(params.has("host")){
    let name="";
    let  hostJson="../json/host.json";
    getHostTypeTitle(hostJson,hostId);
    $.ajax({
        url:hostJson,
        method:"get",
        type:"json",
        success:function(data){
            let filterData=data.filter(function(item){
                if(hostId===item.host)
                    return item
            })
            name=filterData[0].name;
            getGame(name);
        }
    })
}

function getGame(name){
    let gameJson="../json/game.json";
    $.ajax({
        url:gameJson,
        method:"get",
        type:"json",
        success:function(data){
            let filterData="";
            console.log(name)
            if(name==="所有主機"||name==="所有類型"){
                createGameListDoms(data);
            }
            else{
                filterData=data.filter(function(item){
                    if(name===item.type||name===item.host){
                        return item;
                    }
                })
                createGameListDoms(filterData);
            }
        }
    })
}

function createGameListDoms(data){
    let domsElement=data.map(function(item){
        let dom=`
        <li class="game">
            <a href="../gamePage.html?id=${item.id}">
                <img src="${item.imgUrl}">
                <div class="desc">
                    <div class="name">
                    ${item.name}
                    </div>
                    <div class="type">
                    ${item.type}
                    </div>
                    <div class="host">
                    ${item.host}
                    </div>
                </div>
                <div class="price">
                    NT$ ${item.price}
                </div>
            </a>
        </li>
        `;
        return dom;
    }).join("");
    console.log(domsElement);
    $(".gameList").append(domsElement);
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