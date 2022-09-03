let currentPage=1;
let pageSize=5;
let totalPages=0;

function getAnnouncementData(currentPage){
    $.ajax({
        url:"../json/announcement.json",
        method:"get",
        dataType:"json",
        success:function(data){
            createAnnouncementDom([...data],currentPage,pageSize);
        },
        error:function(){
            console.log("失敗!")
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
                    <div>【${arr[firstIndex].label}】${arr[firstIndex].title}</div>
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
    let currentPageNum=Number($(".currentPageTxt input[type=number]").val());
    if(currentPageNum===1){
        alert("目前是第一頁!")
        return;
    }
    currentPageNum--;
    currentPageTxt.val(currentPageNum);
    getAnnouncementData(currentPageNum);
})

$(".downPage").on("click",function(){
    let currentPageNum=Number($(".currentPageTxt input[type=number]").val());
    if(currentPageNum===totalPages){
        alert("已經到最後一頁了!")
        return;
    }
    currentPageNum++;
    currentPageTxt.val(currentPageNum);
    getAnnouncementData(currentPageNum);
})

currentPageTxt.on("keyup",function(e){
    console.log(totalPages)
    if(e.key==="Enter"){
        let currentPageNum=Number($(".currentPageTxt input[type=number]").val());
        console.log(currentPageNum)
        if(currentPageNum<=0||currentPageNum>totalPages){
            currentPageTxt.val(1);
            getAnnouncementData(1);
            alert("此頁不存在!");
            return;
        }
        getAnnouncementData(currentPageNum);
    }
})