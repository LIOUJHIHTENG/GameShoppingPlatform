let gameJson="https://lioujhihteng.github.io/GameShoppingPlatform-jquery/json/game.json";
getTypeHost(typeJson,".typeLeaderboard .label");
getTypeHost(hostJson,".hostLeaderboard .label");
getGame(gameJson,"所有類型","PS4");

function getTypeHost(json,ele){
    $.ajax({
        url:json,
        method:"get",
        type:"json",
        success:function(data){
            createFilterLabelDoms(data,ele);
        }
    })
}

function createFilterLabelDoms(data,ele){
     let domElement= data.map(function(item){
        if(item.host===0){
            return
        }
        let dom=`
        <div>
            <input type="radio" name="${Object.keys(data[0])[0]}" id="${item.name}" value="${item.name}">
            <label for="${item.name}">${item.name}</label>
        </div>`;
        return dom;
    }).join("");
    $(ele).append(domElement);
    $(`${ele} div:first-of-type input[type=radio]`).prop("checked",true);
}

let hostStr="PS4";
let typeStr="所有類型";
$(document).on("change",".leaderboardTable input[name=type]",function(e){
    typeStr=this.value;
    getGame(gameJson,this.value,hostStr);
})

$(document).on("change",".leaderboardTable input[name=host]",function(e){
    hostStr=this.value;
    getGame(gameJson,typeStr,this.value);
})

function getGame(json,type="所有類型",host="PS4"){
    $.ajax({
        url:json,
        method:"get",
        type:"json",
        success:function(data){
            $(".leaderboardContent .data").html("");
            createTypeLeaderDoms(data,type);
            createHostLeaderDoms(data,host);
        }
    })
}


function createTypeLeaderDoms(data,type){
    data.sort(function(a,b){
        return b.sales-a.sales;
    })

    let filterData="";
    if(type==="所有類型"){
        filterData=data.map(function(item){
            return item;
        })
    }else{
        filterData=data.filter(function(item){
            if(item.type===type){
                console.log(123)
                return item;
            }
        })
    }

    let doms=filterData.map(function(item,index){
        if(index<10){
            return `
            <li>
                <div>${index+1}</div>
                <div>
                    <img src="${item.imgUrl}">
                </div>
                <div>
                    <a href="./gamePage.html?id=${item.id}"  target="_blank">${item.name}</a>
                </div>
                <div>${item.sales}</div>
            </li>
            `;
        }
    }).join("")
    $(".typeLeaderboard .data").append(doms);
}

function createHostLeaderDoms(data,host){
    data.sort(function(a,b){
        return b.sales-a.sales;
    })
    let filterData=data.filter(function(item){
        if(item.host===host){
            return item;
        }
    })
    let doms=filterData.map(function(item,index){
        if(index<10){
            return`
                <li>
                    <div>${index+1}</div>
                    <div>
                        <img src="${item.imgUrl}">
                    </div>
                    <div>
                        <a href="../gamePage.html?id=${item.id}"  target="_blank">${item.name}</a>
                    </div>
                    <div>${item.sales}</div>
                </li>
            `
        }
    }).join("");
    $(".hostLeaderboard .data").append(doms);
}