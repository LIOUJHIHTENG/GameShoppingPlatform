$.ajax({
    url:"../json/announcement.json",
    method:"get",
    dataType:"json",
    success:function(res){
        createAnnouncementDom([...res]);
    },
    error:function(){
        console.log("失敗!")
    }
})

function createAnnouncementDom(data){
    const domElements=data.map(function(item){
        return `<li>
        <div>【${item.label}】${item.title}</div>
        <div>${item.date}</div>
        <div>
            <button data-id=${item.id}>查看詳情</button>
        </div>
    </li>`;
    }).join("")
    $(".announcementTable .data").append(domElements);
}