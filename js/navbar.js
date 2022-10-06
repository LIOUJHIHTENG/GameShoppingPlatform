//判斷navbar的下拉式選單
$(".navbar").on("click",".navbarList>a",function(e){
    navbarListToggle(e,$(this));
})

$(".mobileNavbar").on("click",".navbarList>a",function(e){
    navbarListToggle(e,$(this));
})

function navbarListToggle(e,target){
    e.stopPropagation();
    target.parent().siblings(".navbarList").find("ul").removeClass("show");
    target.parent().siblings(".navbarList").find("i").removeClass("fa-caret-up").addClass("fa-sort-down");
    if(target.find("i").hasClass("fa-sort-down")){
        target.siblings("ul").addClass("show");
        target.find("i").removeClass("fa-sort-down").addClass("fa-caret-up");
        return
    }

    if(target.find("i").hasClass("fa-caret-up")){
        target.siblings("ul").removeClass("show");
        target.find("i").removeClass("fa-caret-up").addClass("fa-sort-down");
        return
    }
}

//點擊除了navbar的下拉式選單之外的位置都會收起下拉式選單
$("body").on("click",function(){
    let mobileNavbar=$(this).find(".mobileNavbar");

    $(".navbarList").find("ul").removeClass("show");
    $(".navbarList").find("i").removeClass("fa-caret-up").addClass("fa-sort-down");

    $(".modal").removeClass("show");
    mobileNavbar.removeClass("show");
    if($(".navbarToggle").find("i").hasClass("fa-bars")&&$(".modal").hasClass("show")){
        $(".navbarToggle").find("i").removeClass("fa-bars").addClass("fa-xmark");
        return
    }

    if($(".navbarToggle").find("i").hasClass("fa-xmark")){
        $(".navbarToggle").find("i").removeClass("fa-xmark").addClass("fa-bars");
    }
})

$("body").on("click",".navbarList>a",function(e){
    e.preventDefault();
})

function getJson(json){
    $.ajax({
        url:json,
        method:"get",
        type:"json",
        success:function(res){
            createTypeDoms(res);
        }
    })
}

function createTypeDoms(json){
    let typeNavbarList=$(".typeNavbarList>ul");
    let hostNavbarList=$(".hostNavbarList>ul");
    let domElements="";
    if(json[0].host===undefined){
        domElements=json.map(function(item){
            let doms=`
            <li><a href="./gameList.html?type=${item.type}">${item.name}</a></li>
            `;
            return doms
        }).join("");
        typeNavbarList.append(domElements);
    }else{
        domElements=json.map(function(item){
            let doms=`
            <li><a href="./gameList.html?host=${item.host}">${item.name}</a></li>
            `;
            return doms
        }).join("");
        hostNavbarList.append(domElements);
    }
}
//抓取遊戲種類到下拉式選單內
let  typeJson="https://lioujhihteng.github.io/GameShoppingPlatform-jquery/json/type.json";
getJson(typeJson);

//抓取主機種類到下拉式選單內
let  hostJson="https://lioujhihteng.github.io/GameShoppingPlatform-jquery/json/host.json";
getJson(hostJson);

//mobile版本的右拉式選單
$(".navbarToggle>a").on("click",function(e){
    e.preventDefault();
    e.stopPropagation();
    $(".mobileNavbar").toggleClass("show");
    $(".modal").toggleClass("show");
    if($(this).find("i").hasClass("fa-xmark")){
        $(this).find("i").removeClass("fa-xmark");
        $(this).find("i").addClass("fa-bars");
        return
    }

    if($(this).find("i").hasClass("fa-bars")){
        $(this).find("i").removeClass("fa-bars");
        $(this).find("i").addClass("fa-xmark");
    }
})

$(".mobileNavbar").on("click",function(e){
    e.stopPropagation();
})

function init(){
    let navbar=document.querySelector(".navbar");
    let mobileNavbar=document.querySelector(".mobileNavbar");
    let navbarLi="";
    let mobileNavbarLi="";

    mobileNavbarLi+=`
        <li>
            <form class="search">
                <input type="text" placeholder="遊戲搜尋" class="searchTxt">
                <button class="searchBtn">
                    <i class="fa-solid fa-magnifying-glass"></i>
                </button>
                <ul class="searchResultList">
                </ul>
            </form>
        </li>
    `;
    if(getLoginAccountStatus()){
        let loginAccountObj=getLoginAccount();
        navbarLi+=`
        <li>
            <a href="#" class="navbarAccount">Hi!${loginAccountObj.accountTxt}</a>
        </li>
        `;
        mobileNavbarLi+=`
        <li>
            <a href="#" class="navbarAccount">Hi!${loginAccountObj.accountTxt}</a>
        </li>
        `;
    }
    else{
        navbarLi+=`
        <li>
            <a href="./login.html" class="navbarLogin">登入</a>
        </li>
        <li>
            <a href="./register.html" class=" navbarRegister">註冊</a>
        </li>
        `;

        mobileNavbarLi+=`
        <li>
            <a href="./login.html" class="navbarLogin">登入</a>
        </li>
        <li>
            <a href="./register.html" class=" navbarRegister">註冊</a>
        </li>
        `
    }
     navbarLi+=`
        <li class="navbarList typeNavbarList">
            <a href="#">
                <span>
                    遊戲種類
                </span>
                <i class="fa-solid fa-sort-down"></i>
            </a>
        <ul>
        </ul>
        </li>
        <li class="navbarList hostNavbarList">
            <a href="#">
                <span>
                    主機種類
                </span>
                <i class="fa-solid fa-sort-down"></i>
            </a>
        <ul>
        </ul>
        </li>
        <li>
            <a href="./about.html">關於網站</a>
        </li>
    `;

    mobileNavbarLi+=`
    <li class="navbarList typeNavbarList">
        <a href="#">
            <span>
                遊戲種類
            </span>
            <i class="fa-solid fa-sort-down"></i>
        </a>
        <ul>
        </ul>
    </li>
    <li class="navbarList hostNavbarList">
        <a href="#">
            <span>
                主機種類
            </span>
            <i class="fa-solid fa-sort-down"></i>
        </a>
        <ul>
        </ul>
    </li>
    <li>
        <a href="./about.html">關於網站</a>
    </li>
    `;
    if(getLoginAccountStatus()){
        navbarLi+=`
        <li>
            <a href="#" class="loginOutBtn">登出</a>
        </li>
        `;
        mobileNavbarLi+=`
        <li>
            <a href="#" class="loginOutBtn">登出</a>
        </li>
        `;
    }
    navbar.innerHTML=navbarLi;
    mobileNavbar.innerHTML=mobileNavbarLi;
}

init();