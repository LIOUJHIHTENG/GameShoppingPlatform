function changeTitle(){
    const url = new URL(window.location.href);
    console.log(url.searchParams("host"))
    console.log(url.searchParams("type"))
    document.title="";
}
changeTitle()