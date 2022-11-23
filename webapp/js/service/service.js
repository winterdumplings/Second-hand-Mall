var text = document.querySelector("textarea");
var btn = document.querySelector(".m_list_btn");
var ul = document.querySelector(".m_list_content");
btn.onclick = function(){
    if(text.value == ""){
        alert("请输入内容！");
        return false;
    }else{
        //1.创建元素
        var li = document.createElement("li");
        str = '<div class="m_list_time"> '+ formatDate() + '</div>';
        li.innerHTML = str + text.value + '<a href="javascript:;">撤回</a>';
        li.className = "m_list_specific_content";
        // 2.添加元素
        ul.insertBefore(li,ul.children[0]);
    }
        // 3.删除元素  删除的是当前链接的li 即它的父亲
    for (var i = 0;i<ul.children.length;i++){
        var a = ul.children[i].children[1];
        a.onclick = function(){
            ul.removeChild(this.parentNode);
        }
    }
}
function formatDate(){
    //获取系统当前时间
    var  date = new  Date();
    //获取年月日时分秒
    var str = date.getFullYear()+"-"+(parseInt(date.getMonth())+1)+"-"+
                date.getDate()+" "+ date.getHours()+":"+ date.getMinutes()+":"+date.getSeconds();
    return  str;
}