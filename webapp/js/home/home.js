function change_page(){
  // JS实现选项卡切换
  var myTab1 = document.getElementById("m_head_collapse");    //整个div
  var myTab2 = document.getElementById("commodity_list");
  var myA = myTab1.getElementsByTagName("a");    //数组
  var myUl = myTab2.getElementsByTagName("ul");//数组
  for(var i = 0; i<myA.length-2;i++){
    myA[i].index = i;
    myA[i].onclick = function(){
        cancelBubble =true;
        for(var j = 0; j < myA.length-2; j++){
            myUl[j].className="hide"
            myA[j].className="m_head_l"
        }
        myUl[this.index].className = "show";
        myA[this.index].className="m_head_l on"
    }
  }
}

change_page()

// 定位到“搜索”按钮
var searchInp = document.getElementsByName("search__button")[0];
// 点击事件
searchInp.onclick=function(){
  setTimeout( search_keyword(),20);
}
// 添加键盘事件，按回车键开始搜索
document.onkeydown = function () {
  if (window.event.keyCode == 13) {
    setTimeout( search_keyword(),20);
  }
}
// 获取框中的搜索关键词并隐藏无关的商品
function search_keyword() {
  cancelBubble =true;
  var inputDom = document.getElementsByName("search__input")[0];
  var key_word = inputDom.value;
  var myUl = document.getElementsByClassName("show")[0];
  var li_array = myUl.getElementsByTagName("li");
  for(i=0;i<li_array.length;i++)
  {
    //从简介中查找关键词
    var desc = li_array[i].getElementsByClassName("desc")[0].innerHTML;
    //要先判断字符串是否为空才能使用search函数寻找字符串中是否含有制定字符串
    //search函数，成功匹配返回0，找不到指定字符串返回-1
    if(desc){
      if( desc.search(key_word)!=-1 || desc.toUpperCase().search(key_word.toUpperCase())!=-1 )
      {
        li_array[i].style.display="";//显示
        
      }else{
        li_array[i].style.display="none"; //隐藏不含关键词的商品块儿
      }
    }
  }
}

//实现选校区的功能：select绑定change事件
$('#area_select').on('change',function(){
	$(this).blur();
  var selected = $('#area_select option:selected').text();
  var myUl = document.getElementsByClassName("show")[0];
  var li_array = myUl.getElementsByTagName("li");
  for(i=0;i<li_array.length;i++)
  {
    //获取商品所属的校区
    var area = li_array[i].getElementsByClassName("area")[0].innerHTML;
    //要先判断字符串是否为空才能使用search函数寻找字符串中是否含有制定字符串
    //search函数，成功匹配返回0，找不到指定字符串返回-1
    if(area){
      if(area.search(selected)!=-1 ||area.toUpperCase().search(selected.toUpperCase())!=-1 || selected.search("全部")==0)
      {
        li_array[i].style.display="";//显示
        
      }else{
        li_array[i].style.display="none"; //隐藏不含关键词的商品块儿
      }
    }else{
      if(selected.search("全部")==0){
        li_array[i].style.display="";
      }else{
        li_array[i].style.display="none";
      }
       
    }
  }
	$(this).find('option[value=4]').text(selected)
	$(this).val(4);
})

// 点击主页键就从数据库获取所有的商品信息并加载
window.onload = function(){
  $.ajax({
    'url':"http://127.0.0.1:5500/WEB-INF/templates/qiu.json",
    'type':'GET',
    // 'dataType':'json',
    'success':function (res) {
      for(i=0;i<res.length;i++){
        src = res[i].itemPicture
        if(src != null){
          addLi("commodity_list_qiu",res[i].ritemid,src.itempicture,"","",res[i].ritemname)
        }else{
          src = "../../image/增加图片例图.png"
          addLi("commodity_list_qiu",res[i].itemid,src,"","",res[i].ritemname)
        }  
      } 
    }
    })
    $.ajax({
      'url':"http://127.0.0.1:5500/WEB-INF/templates/test2.json",
      'type':'GET',
      // 'dataType':'json',
      'success':function (res) {
        for(i=0;i<res.length;i++){
          src = res[i].itempicture
          if(src != null){
            addLi("commodity_list_chu",res[i].itemid,src.itempicture,res[i].price,res[i].schoolzone,res[i].itemname)
          }else{
            src = "../../image/增加图片例图.png"
            addLi("commodity_list_chu",res[i].itemid,src,res[i].price,res[i].schoolzone,res[i].itemname)
          }  
        }  
      }
    })
}

$("#add_cart").onclick = function(){
  var itemid = $.parentNode;
  console.log(itemid)
  // $.ajax({
  //   'url':"http://127.0.0.1:5500/WEB-INF/templates/itemid.json",
  //   'type':'POST',
  //   "data":{
  //     "itemid":itemid,
  //   },
  //   // 'dataType':'json',
  //   'success':"success",
  // })
}

//用createElement创建li元素，再通过setAttribute设置元素属性，最后通过appendChild()方法添加在父元素的最后一个子节点上。
 //创建li标签，包含显示姓名，邮箱，电话号码及删除按钮
function addLi(ul_id,itemid,src,price,area,desc){ 
  var li_1 = document.createElement("li");
  li_1.setAttribute("id",itemid)
  var As = createA();
  var Divs = createDiv();
  var spans = createSpan();
  addImg(Divs.Div1,src)
  spans.span1.innerHTML=price;
  spans.span2.innerHTML=area;
  spans.span3.innerHTML=desc;
  Divs.Div2.appendChild(spans.span1)
  Divs.Div2.appendChild(spans.span2)
  As.A1.appendChild(Divs.Div1)
  As.A1.appendChild(Divs.Div2)
  As.A1.appendChild(spans.span3)
  if(ul_id=="commodity_list_qiu"){
    li_1.appendChild(As.A1)
    document.getElementById(ul_id).appendChild(li_1);
  }else{
    var p_1 = document.createElement("p");
    p_1.setAttribute("class","buy")
    spans.span4.setAttribute("class","add_cart")
    As.A2.appendChild(spans.span4)
    p_1.appendChild(As.A2)
    As.A1.appendChild(As.A2)
    li_1.appendChild(As.A1)
    document.getElementById(ul_id).appendChild(li_1);
  } 
}

function createA(){
  var A1=document.createElement("a");
  var A2=document.createElement("a");
  A1.setAttribute("class","commodity-item");
  A2.setAttribute("href","#")
  return {A1:A1,A2:A2};
}

function createDiv(){
  var Div1=document.createElement("div");
  var Div2=document.createElement("div");
  Div1.setAttribute("class","figure");
  return {Div1:Div1,Div2:Div2};
}

function createSpan(text){
  var span1=document.createElement("span");
  var span2=document.createElement("span");
  var span3=document.createElement("span");
  var span4=document.createElement("span");
  var span5=document.createElement("span");
  span1.setAttribute("class","price");
  span2.setAttribute("class","area");
  span3.setAttribute("class","desc");
  span4.innerHTML='加入购物车';
  return {span1:span1,span2:span2,span3:span3,span4:span4};
}

function addImg(obj,src){
  var Img=document.createElement("Img")
  Img.setAttribute("style" ,"width:150px;height:150px;");
  Img.setAttribute("src","../../pictures/"+src)
  obj.appendChild(Img);
}
