let currentPage=1;
let pageSize=5;
let totalPages=0;
let id=0;

function getAnnouncementData(currentPage){
    $.ajax({
        url:"https://lioujhihteng.github.io/GameShoppingPlatform-jquery/json/announcement.json",
        method:"get",
        dataType:"json",
        success:function(data){
            createAnnouncementDom(data,currentPage,pageSize);
            if(id!==0){
                createAnnouncementDialogDom(data);
            }
        }
    })

    function createAnnouncementDom(data,page,size){
        $(".announcementContent .data").html("");
        totalPages=Math.ceil(data.length/pageSize);
        let firstIndex=size*(page-1);
        let lastIndex=(size*page)-1;
        const domElements=data.map(function(item,index,arr){
            if(firstIndex<=lastIndex ){
                if(arr[firstIndex]===undefined)
                    return;
                let domStr=`
                <li>
                    <div>【${arr[firstIndex].label}】</div>
                    <div>${arr[firstIndex].title}</div>
                    <div>${arr[firstIndex].date}</div>
                    <div>
                        <button class="detailBtn" data-id=${arr[firstIndex].id}>查看詳情</button>
                    </div>
                </li>
            `;
                firstIndex++;
                return domStr;
            }
        }).join("");
        $(".announcementContent .data").append(domElements);
    }
}

getAnnouncementData(1);

let currentPageTxt=$(".currentPageTxt input[type=number]");
$(".upPage").on("click",function(){
    currentPage=Number($(".currentPageTxt input[type=number]").val());
    if(currentPage===1){
        alert("目前是第一頁!")
        return;
    }
    currentPage--;
    currentPageTxt.val(currentPage);
    getAnnouncementData(currentPage);
})

$(".downPage").on("click",function(){
    currentPage=Number($(".currentPageTxt input[type=number]").val());
    if(currentPage===totalPages){
        alert("已經到最後一頁了!")
        return;
    }
    currentPage++;
    currentPageTxt.val(currentPage);
    getAnnouncementData(currentPage);
})

currentPageTxt.on("keyup",function(e){
    if(e.key==="Enter"){
        let currentPageNum=Number($(".currentPageTxt input[type=number]").val());
        if(currentPageNum<=0||currentPageNum>totalPages){
            currentPageTxt.val(1);
            getAnnouncementData(1);
            alert("此頁不存在!");
            return;
        }
        getAnnouncementData(currentPageNum);
    }
})

const announcementDialog = document.querySelector(".announcementDialog");
$(document).on("click",".detailBtn",function(){
    id=$(this).data("id");
    getAnnouncementData(currentPage);
    announcementDialog.showModal();
    $("body").addClass("modal-hidden-scroll");
})

$("body").on("click",".closeAnnouncementDialog",function(){
    announcementDialog.close();
    $("body").removeClass("modal-hidden-scroll");
})

$("body").on("click",".announcementDialog",function(e){
    announcementDialog.close();
    $("body").removeClass("modal-hidden-scroll");
})

$("body").on("click",".announcementDialogContent",function(e){
    e.stopPropagation();
})

function createAnnouncementDialogDom(data){
    $(".announcementDialogContent").remove();
    let domStr="";
    let filterData=data.filter(function(item){
        return item.id===id;
    })
    let domsElement=filterData.map(function(item){
        domStr=`
            <div class="announcementDialogContent">
            <div class="header">
                <span>
                    ${item.title}
                </span>
                <button class="closeAnnouncementDialog">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>
            <div class="content">
                <div>
                    撰寫時間:${item.date}
                </div>
                <div>
                    內容:${item.content}
                </div>
            </div>
        </div>
        `;
        return domStr;
    }).join("")
    $(".announcementDialog").append(domsElement);
}