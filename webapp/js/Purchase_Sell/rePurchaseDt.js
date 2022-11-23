// 定位到“搜索”按钮
var searchInp = document.getElementById("send_button")

// 点击事件
searchInp.onclick=function(){
  var mes = search_keyword();
  addLi("../../webapp(2)/webapp/img/微信图片_20210313134536.jpg","ggggg",mes)
}
// 添加键盘事件，按回车键开始搜索
document.onkeydown = function () {
  if (window.event.keyCode == 13) {
    search_keyword();
  }
}
// 获取框中的搜索关键词
function search_keyword() {
  cancelBubble =true;
  var inputDom = document.getElementById("send_input");
  var key_word = inputDom.value;
  return key_word
}


//创建li标签，包含显示姓名，邮箱，电话号码及删除按钮
function addLi(photo,name,mes){ 
    var li_1=document.createElement("li");
    li_1.setAttribute("class","inf_list")
    var A_1 = createA()
    addImg(A_1,photo)
    var span_1 = createSpan()
    span_1.setAttribute("class","user_name")
    span_1.innerHTML=name;
    var  A_2 = createA()
    A_2.appendChild(span_1)
    var span_2 =createSpan()
    span_2.setAttribute("class","user_date")
    span_2.innerHTML=formatDate();
    var p_1=document.createElement("p");
    var span_3 = createSpan();
    span_3.setAttribute("class","user_message");
    span_3.innerHTML=mes;
    p_1.appendChild(span_3);
    li_1.appendChild(A_1);
    li_1.appendChild(A_2);
    li_1.appendChild(span_2);
    li_1.appendChild(p_1);
    var ul_1 = document.getElementsByClassName("m_list_inf1")[0];
    ul_1.appendChild(li_1);

}

function createA(){
  var A=document.createElement("a");
  A.setAttribute("class","user");
  A.setAttribute("href","#");
  return A;
}

function createSpan(){
  var span=document.createElement("span");
  return span;
}



function addImg(obj,srcs){
  var Img=document.createElement("Img")
  Img.setAttribute("style" ,"width:20px;height:20px; border-radius: 50%");
  Img.setAttribute("src",srcs)
  obj.appendChild(Img);
}

function formatDate(){
    //获取系统当前时间
    var  date = new  Date();
    //获取年月日时分秒
    var str = date.getFullYear()+"-"+(parseInt(date.getMonth())+1)+"-"+
                date.getDate()+" "+ date.getHours()+":"+ date.getMinutes()+":"+date.getSeconds();
    return  str;
}