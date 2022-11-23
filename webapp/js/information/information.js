window.onload = function(){
    var Tab = document.getElementById("m_content");//整个div
    var Ul = Tab.getElementsByTagName("ul")[0];//第一个节点
    var Li = Ul.getElementsByTagName("li");    //数组
    var Div = Tab.getElementsByTagName("div"); //数组
    
    var ul1 = document.getElementsByClassName(".m_list_inf1");//往商品留言里添加内容
    var ul2 = document.getElementsByClassName(".m_list_inf2");//往系统消息里添加内容

    var tradeName = "xxx";
    var str1 = "您的商品"+tradeName+"底下有新的留言，请查看！";
    var str2 = "商品详细内容";
    var str3 = formatDate();
    var str4 = " \"#\" ";//此处存放商品详细链接
    var ul1 = document.querySelector(".m_list_inf1");

    // addElement(str1,str2,str3,str4,ul1);
    
    for(var i = 0; i<Li.length;i++){
        Li[i].index = i;
        Li[i].onclick = function(){
            for(var j = 0; j < Li.length; j++){
                Li[j].className = "off";
                Div[j].className = "hide";
            }
            this.className = "on";
            Div[this.index].className = "show";
        }
      }
}
function addElement(str1,str2,str3,str4,ul){
    // var tradeName = "xxx";
    // var str1 = "您的商品"+tradeName+"底下有新的留言，请查看！";
    // var str2 = "商品详细内容";
    // var str3 = formatDate();
    // var str4 = " \"#\" ";//此处存放商品详细链接
    // var ul1 = document.querySelector(".m_list_inf1");
    // 1.创建元素
    var li = document.createElement("li");
    // li.innerHTML = '<a href=' + str4 + '></a>';
    // var a = li.querySelector("a");
    // a.innerHTML = '<span>' + str1 + '</span>';
    li.innerHTML = '<span>'+ str2 + '</span>'+'<span>' + str3 +'</span>';
    li.className = "inf_list";
    // 2.添加元素
    ul.insertBefore(li,ul.children[0]);
}
function formatDate(){
    //获取系统当前时间
    var  date = new  Date();
    //获取年月日时分秒
    var str = date.getFullYear()+"-"+(parseInt(date.getMonth())+1)+"-"+
                date.getDate()+" "+ date.getHours()+":"+ date.getMinutes()+":"+date.getSeconds();
    return  str;
}