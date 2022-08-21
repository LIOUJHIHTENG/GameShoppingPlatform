$("a").on("click",function(e){
    e.preventDefault();
})

//判斷navbar的下拉式選單
$(".navbarList>a").on("click",function(e){
    e.stopPropagation();
    $(this).parent().siblings(".navbarList").find("ul").removeClass("show");
    $(this).parent().siblings(".navbarList").find("i").removeClass("fa-caret-up").addClass("fa-sort-down");
    if($(this).find("i").hasClass("fa-sort-down")){
        $(this).siblings("ul").addClass("show");
        $(this).find("i").removeClass("fa-sort-down").addClass("fa-caret-up");
        return
    }

    if($(this).find("i").hasClass("fa-caret-up")){
        $(this).siblings("ul").removeClass("show");
        $(this).find("i").removeClass("fa-caret-up").addClass("fa-sort-down");
        return
    }
})

//點擊除了navbar的下拉式選單之外的位置都會收起下拉式選單
$("body").on("click",function(){
    let mobileNavbar=$(this).find(".mobileNavbar");

    $(".navbarList").find("ul").removeClass("show");
    $(".navbarList").find("i").removeClass("fa-caret-up").addClass("fa-sort-down");

    $(".modal").removeClass("show");
    mobileNavbar.removeClass("show");
    if($(".navbarToggle").find("i").hasClass("fa-bars")&&$(".modal").hasClass("show")){
        console.log(123)
        $(".navbarToggle").find("i").removeClass("fa-bars").addClass("fa-xmark");
        return
    }

    if($(".navbarToggle").find("i").hasClass("fa-xmark")){
        console.log(456)
        $(".navbarToggle").find("i").removeClass("fa-xmark").addClass("fa-bars");
    }
})

$(".navbarList>ul").on("click",function(e){
    e.stopPropagation();
})

//mobile版本的右拉式選單
$(".navbarToggle>a").on("click",function(e){
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