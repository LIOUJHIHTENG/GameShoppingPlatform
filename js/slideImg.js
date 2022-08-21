$(".prev").on("click",function(){
    slide(-1);
})

$(".next").on("click",function(){
    slide(1);
})

$(".dot").on("click",function(){
    let page=$(this).data("page");
    currentSlide(page);
})

let firstPage=1;
activeSlide(firstPage)
function slide(page){
    activeSlide(firstPage+=page);
}

function currentSlide(page){
    activeSlide(firstPage=page);
}

function activeSlide(page){

}