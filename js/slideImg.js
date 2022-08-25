let slideId=["pcSlide","mobileSlide"];
let currentIndex=[0,0];

slideId.forEach(function(item,index){
    console.log(index)
    $(`.${slideId[index]} .dot`).on("click",function(){
        let num=$(this).data("num");
        activeSlide(currentIndex[index]=num,index);
        stopThenStartSlidingImg();
    })

    $(`.${slideId[index]} .prev`).on("click",function(e){
        e.preventDefault();
        slide(-1,index);
    })
    
    $(`.${slideId[index]} .next`).on("click",function(e){
        e.preventDefault();
        slide(1,index);
    })
})

function slide(slideIndex,id){
    activeSlide(currentIndex[id]+=slideIndex,id);
    stopThenStartSlidingImg();
}

function activeSlide(slideIndex,id){
    let slideImgs=$(`.${slideId[id]} .slideImg`);
    let dots=$(`.${slideId[id]} .dot`);
    if(slideIndex>slideImgs.length-1){
        currentIndex[id]=0;
    }
    if(slideIndex<0){
        currentIndex[id]=slideImgs.length-1;
    }
    slideImgs.each(function(){
        $(this).css("display","none");
    });
    dots.each(function(){
        $(this).removeClass("active");
    });
    slideImgs.eq(currentIndex[id]).css("display","block")
    slideImgs.eq(currentIndex[id]).addClass("fade")
    dots.eq(currentIndex[id]).addClass("active");
}

var slidingImg;
function startSlideImg(){
    slidingImg=setInterval(function(){
        slideId.forEach(function(item,index){
            slide(1,index)
        })
    },5000);
}

function stopSlideImg(){
    clearInterval(slidingImg);
}

function stopThenStartSlidingImg(){
    stopSlideImg();
    startSlideImg();
}

activeSlide(1,0);
activeSlide(1,1);
startSlideImg();