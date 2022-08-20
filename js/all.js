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

$("body").on("click",function(){
    $(".navbarList").find("ul").removeClass("show");
    $(".navbarList").find("i").removeClass("fa-caret-up").addClass("fa-sort-down");
})

$(".navbarList>ul").on("click",function(e){
    e.stopPropagation();
})