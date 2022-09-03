let gameJson="../json/game.json";
getTypeHost(typeJson,".typeLeaderboard .label");
getTypeHost(hostJson,".hostLeaderboard .label");
getGame(gameJson,"allType","PS4");

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
        <span>
            <input type="radio" name="${Object.keys(data[0])[0]}" id="${item.label}" value="${item.label}">
            <label for="${item.label}">${item.name}</label>
        </span>`;
        return dom;
    }).join("");
    $(ele).append(domElement);
    $(`${ele} span:first-of-type input[type=radio]`).prop("checked",true);
}

let hostStr="PS4";
let typeStr="allType";
$(document).on("change",".leaderboardTable input[name=type]",function(e){
    typeStr=this.value;
    getGame(gameJson,this.value,hostStr);
})

$(document).on("change",".leaderboardTable input[name=host]",function(e){
    hostStr=this.value;
    getGame(gameJson,typeStr,this.value);
})

function getGame(json,type="allType",host="PS4"){
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
    let num=0;
    data.sort(function(a,b){
        return b.sales-a.sales;
    })

    let filterData="";
    if(type==="allType"){
        filterData=data.map(function(item){
            return item;
        })
    }else{
        filterData=data.filter(function(item){
            if(item.type===type){
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
                    <a href="../gamePage.html?id=${item.id}"  target="_blank">${item.name}</a>
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