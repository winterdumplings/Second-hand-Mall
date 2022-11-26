window.onload = function(){
    var Tab = document.getElementById("m_content");//整个div
    var Ul = Tab.getElementsByTagName("ul")[0];//第一个节点
    var Li = Ul.getElementsByTagName("li");    //数组
    var Div = Tab.getElementsByTagName("div"); //数组
    var ul1 = document.querySelector(".m_list_inf1");
    var ul2 = document.querySelector(".m_list_inf2");//往系统消息里添加内容

    $.ajax({
      'url':"http://127.0.0.1:5500/WEB-INF/templates/information.json",
      'type':'GET',
      'dataType':'json',
      'success':function (res) {
        console.log(res)
        for(i=0;i<res.length;i++){
            src = res[i].userid;
            if(src != '00001'){
                var itemid = res[i].itemid;
                var str1 = "您的商品编号"+itemid+"底下有新的留言，请查看！";
                var str2 = res[i].itemname;
                var str3 = res[i].datetime;
                var str4 = "#";
                addElement(str1,str2,str3,str4,ul1);
                } 
            else{
                var str1 = res[i].itemname;
                var str2 = res[i].datetime;
                addSysteminfo(str1,str2,ul2);
                }
            }
        }
    })
    // 测试往商品留言添加信息的语句
    // var tradeName = "xxx";
    // var str1 = "您的商品"+tradeName+"底下有新的留言，请查看！";
    // var str2 = "商品详细内容";
    // var str3 = "2022.11.23";
    // var str4 = " \"#\" ";//此处存放商品详细链接
    
    // addElement(str1,str2,str3,str4,ul1);

    //测试往系统消息里添加消息的语句
    // var str1 = "系统详细留言";
    // var str2 = "2022.11.23";
    
    // addSysteminfo(str1,str2,ul2);
    
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
    // 1.创建元素
    var li = document.createElement("li");
    li.innerHTML = '<a href=' + str4 + '>'+'<span class="inf_list1">'+str1+'</span>'+'</a>';
    li.innerHTML = li.innerHTML + '<span>'+ str2 + '</span>'+'<span>' + str3 +'</span>';
    li.className = "inf_list";
    // 2.添加元素
    ul.insertBefore(li,ul.children[0]);
}
function addSysteminfo(str1,str2,ul){
    // 1.创建元素
    var li = document.createElement("li");
    li.innerHTML = '<a href="#"><span class="inf_list1">系统给你发来了一条新的信息，请查看！</span></a>';
    li.innerHTML = li.innerHTML + '<span>'+ str1 + '</span>'+'<span>' + str2 +'</span>';
    li.className = "inf_list";
    // 2.添加元素
    ul.insertBefore(li,ul.children[0]);
}

